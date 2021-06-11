import { GraphQLClient } from 'graphql-request';
import { ClientConfig } from './config/ClientConfig';
import { getSdk, Sdk } from './graphql';
import {
  CreateChallengeInput,
  UpdateEcoverseInput,
  UpdateChallengeInput,
  UpdateOrganisationInput,
  CreateUserInput,
  UpdateContextInput,
  UpdateReferenceInput,
  CreateEcoverseInput,
  CreateOpportunityInput,
  UpdateOpportunityInput,
} from './types/cherrytwist-schema';
import { ErrorHandler, handleErrors } from './util/handleErrors';
import semver from 'semver';
import { AuthInfo } from 'src';
import { KratosPublicApiClient } from './util/kratos.public.api.client';

export class CherrytwistClient {
  public apiToken: string;
  public config!: ClientConfig;
  private client!: Sdk;
  private errorHandler: ErrorHandler;

  constructor(config: ClientConfig) {
    this.apiToken = '';
    this.config = config;
    const client = new GraphQLClient(this.config.graphqlEndpoint);
    this.client = getSdk(client);
    this.errorHandler = handleErrors();
  }

  public async enableAuthentication() {
    if (this.config.authInfo && (await this.isAuthenticationEnabled())) {
      const kratosPublicEndpoint = await this.getKratosPublicApiEndpoint();
      this.config.authInfo.apiEndpointFactory = () => {
        return kratosPublicEndpoint;
      };
      const apiToken = await this.getApiToken(this.config.authInfo);

      const client = new GraphQLClient(this.config.graphqlEndpoint, {
        headers: {
          authorization: `Bearer ${apiToken}`,
        },
      });
      this.client = getSdk(client);
    }
  }

  private async getApiToken(authInfo: AuthInfo): Promise<string> {
    const authClient = new KratosPublicApiClient(authInfo.apiEndpointFactory);
    this.apiToken = await authClient.authenticate(authInfo.credentials);
    return this.apiToken;
  }

  public async getKratosPublicApiEndpoint(): Promise<string> {
    const configuration = await this.client.configuration();
    const endpoint =
      configuration.data?.configuration.authentication.providers[0].config
        .kratosPublicBaseURL;

    return endpoint ?? 'http://localhost:4433/';
  }

  public async isAuthenticationEnabled(): Promise<boolean> {
    const configuration = await this.client.configuration();

    const authenticationEnabled =
      configuration.data?.configuration.authentication.enabled;

    return authenticationEnabled ? true : false;
  }

  public async validateConnection() {
    const serverVersion = await this.serverVersion();

    this.validateServerVersion(serverVersion);
    return serverVersion;
  }

  public validateServerVersion(serverVersion: string): boolean {
    const MIN_SERVER_VERSION = '0.11.3';
    const validVersion = semver.gte(serverVersion, MIN_SERVER_VERSION);
    if (!validVersion)
      throw new Error(
        `Detected server version (${serverVersion} not compatible with required server version: ${MIN_SERVER_VERSION})`
      );
    return true;
  }

  public async serverVersion(): Promise<string> {
    const { data, errors } = await this.client.metadata();
    if (errors) {
      throw new Error(
        `Unable to query meta data from: ${this.config.graphqlEndpoint}`
      );
    }
    const serverMetaData = data?.metadata.services.find(
      service => service.name === 'ct-server'
    );
    if (!serverMetaData) throw new Error('Unable to locate server meta data');
    const serverVersion = serverMetaData.version;
    if (!serverVersion)
      throw new Error(`Unable to retrive CT server version: ${serverVersion}`);
    return serverVersion;
  }

  public async ecoverseExists(ecoverseID: string): Promise<boolean> {
    try {
      const result = await this.client.ecoverse({
        id: ecoverseID,
      });
      if (!result.errors) return true;
    } catch (error) {
      return false;
    }
    return true;
  }

  async ecoverseInfo(ecoverseID: string) {
    const response = await this.client.ecoverse({
      id: ecoverseID,
    });
    return response.data?.ecoverse;
  }

  public async createEcoverse(ecoverseData: CreateEcoverseInput) {
    const result = await this.client.createEcoverse({
      ecoverseData: ecoverseData,
    });
    return result.data?.createEcoverse;
  }

  public async createChildChallenge(challengeData: CreateChallengeInput) {
    const result = await this.client.createChildChallenge({
      childChallengeData: challengeData,
    });

    this.errorHandler(result.errors);

    return result.data?.createChildChallenge;
  }

  public async createOpportunity(opportunityData: CreateOpportunityInput) {
    const result = await this.client.createOpportunity({
      opportunityData: opportunityData,
    });

    this.errorHandler(result.errors);

    return result.data?.createOpportunity;
  }

  public async addReference(
    profileID: string,
    referenceName: string,
    referenceURI: string,
    referenceDesc: string
  ) {
    const { data, errors } = await this.client.createReferenceOnProfile({
      referenceInput: {
        profileID: profileID,
        uri: referenceURI,
        name: referenceName,
        description: referenceDesc,
      },
    });

    this.errorHandler(errors);

    return data?.createReferenceOnProfile;
  }

  public async updateUserProfile(
    userEmail: string,
    description?: string,
    avatarURI?: string
  ): Promise<boolean> {
    const { data, errors } = await this.client.user({
      userID: userEmail,
    });

    const profileID = data?.user.profile?.id;

    this.errorHandler(errors);

    if (profileID) {
      return !!(await this.updateProfile(profileID, avatarURI, description));
    }

    return false;
  }

  async updateProfile(
    profileID: string,
    avatarURI?: string,
    description?: string
  ) {
    const { data, errors } = await this.client.updateProfile({
      profileData: {
        ID: profileID,
        avatar: avatarURI,
        description: description,
      },
    });
    this.errorHandler(errors);
    return data?.updateProfile;
  }

  async createTagsetOnProfile(
    profileID: string,
    tagsetName: string,
    tags: string[]
  ): Promise<boolean> {
    if (tags) {
      const { errors } = await this.client.createTagsetOnProfile({
        tagsetData: {
          profileID: profileID,
          name: tagsetName,
        },
      });

      this.errorHandler(errors);
    }
    return true;
  }

  async addUserToGroup(userID: string, groupID: string): Promise<boolean> {
    const uID = userID;
    const gID = groupID;

    const { data, errors } = await this.client.addUserToGroup({
      input: {
        userID: uID,
        groupID: gID,
      },
    });

    this.errorHandler(errors);

    return !!data?.assignUserToGroup;
  }

  async addUserToChallenge(
    ecoverseID: string,
    challengeName: string,
    userID: string
  ) {
    const response = await this.client.challenge({
      ecoverseID: ecoverseID,
      challengeID: challengeName,
    });
    const communityID = response.data?.ecoverse.challenge?.community?.id;

    if (!response) return;

    return await this.client.addUserToCommunity({
      input: {
        userID: userID,
        communityID: communityID,
      },
    });
  }

  public async opportunityByNameID(
    ecoverseID: string,
    opportunityNameID: string
  ) {
    try {
      const result = await this.client.opportunity({
        ecoverseID: ecoverseID,
        opportunityID: opportunityNameID,
      });
      if (!result.errors) return result.data?.ecoverse.opportunity;
    } catch (error) {
      return;
    }
  }

  async challengeByNameID(ecoverseNameID: string, challengeNameID: string) {
    try {
      const response = await this.client.challenge({
        ecoverseID: ecoverseNameID,
        challengeID: challengeNameID,
      });

      if (!response) return;
      return response.data?.ecoverse.challenge;
    } catch (error) {
      return;
    }
  }

  async user(userID: string) {
    try {
      const response = await this.client.user({
        userID: userID,
      });

      if (!response) return;
      return response.data?.user;
    } catch (error) {
      return;
    }
  }

  async addUserToOpportunity(
    ecoverseName: string,
    opportunityName: string,
    userID: string
  ) {
    const opportunityInfo = await this.opportunityByNameID(
      ecoverseName,
      opportunityName
    );
    const communityID = opportunityInfo?.community?.id;

    return await this.client.addUserToCommunity({
      input: {
        userID: userID,
        communityID,
      },
    });
  }

  async addUserToEcoverse(ecoverseID: string, userID: string) {
    const ecoverseInfo = await this.ecoverseInfo(ecoverseID);
    const communityID = ecoverseInfo?.community?.id;

    if (!ecoverseInfo) return;

    return await this.client.addUserToCommunity({
      input: {
        userID: userID,
        communityID,
      },
    });
  }

  async addChallengeLead(challengeID: string, organisationID: string) {
    const { data, errors } = await this.client.addChallengeLead({
      input: {
        challengeID: challengeID,
        organisationID: organisationID,
      },
    });

    this.errorHandler(errors);

    return !!data?.assignChallengeLead;
  }

  async updateEcoverseContext(ecoverseID: string, context: UpdateContextInput) {
    const { data, errors } = await this.client.updateEcoverse({
      ecoverseData: {
        ID: ecoverseID,
        context: context,
      },
    });

    this.errorHandler(errors);

    return data?.updateEcoverse;
  }

  async updateEcoverse(ecoverse: UpdateEcoverseInput) {
    const { data, errors } = await this.client.updateEcoverse({
      ecoverseData: ecoverse,
    });

    this.errorHandler(errors);

    return data?.updateEcoverse;
  }

  async createRelation(
    opportunityID: string,
    type: string,
    description: string,
    actorName: string,
    actorRole: string,
    actorType: string
  ) {
    const { data, errors } = await this.client.createRelation({
      relationData: {
        parentID: opportunityID,
        type,
        description,
        actorName,
        actorType,
        actorRole,
      },
    });

    this.errorHandler(errors);

    return data?.createRelation;
  }

  async createActorGroup(
    ecosystemModelID: string,
    actorGroupName: string,
    description: string
  ) {
    const { data, errors } = await this.client.createActorGroup({
      actorGroupData: {
        ecosystemModelID: ecosystemModelID,
        name: actorGroupName,
        description,
      },
    });

    this.errorHandler(errors);

    return data?.createActorGroup;
  }

  async createActor(
    actorGroupID: string,
    actorName: string,
    value?: string,
    impact?: string,
    description = ''
  ) {
    const { data, errors } = await this.client.createActor({
      actorData: {
        actorGroupID: actorGroupID,
        name: actorName,
        value,
        impact,
        description,
      },
    });

    this.errorHandler(errors);

    return data?.createActor;
  }

  async updateActor(
    actorID: string,
    actorName: string,
    value: string,
    impact = '',
    description = ''
  ) {
    const { data, errors } = await this.client.updateActor({
      actorData: {
        ID: actorID,
        name: actorName,
        value,
        impact,
        description,
      },
    });

    this.errorHandler(errors);

    return data?.updateActor;
  }

  // Create a aspect for the given context
  async createAspect(
    contextID: string,
    title: string,
    framing: string,
    explanation: string
  ) {
    const { data, errors } = await this.client.createAspect({
      aspectData: {
        parentID: contextID,
        title,
        framing,
        explanation,
      },
    });

    this.errorHandler(errors);

    return data?.createAspect;
  }

  // Create a gouup at the ecoverse level with the given name
  async createEcoverseGroup(
    ecoverseID: string,
    groupName: string,
    groupDesc: string
  ) {
    const ecoverseInfo = await this.ecoverseInfo(ecoverseID);
    const communityID = ecoverseInfo?.community?.id;
    const { data, errors } = await this.client.createGroupOnCommunity({
      groupData: {
        name: groupName,
        parentID: communityID,
        profileData: {
          description: groupDesc,
        },
      },
    });

    this.errorHandler(errors);

    return data?.createGroupOnCommunity;
  }

  public async createOrganisation(displayName: string, nameID: string) {
    const { data, errors } = await this.client.createOrganisation({
      organisationData: {
        nameID: nameID,
        displayName: displayName,
      },
    });

    this.errorHandler(errors);

    return data?.createOrganisation;
  }

  public async organisations() {
    const { data, errors } = await this.client.organisations();

    this.errorHandler(errors);

    return data?.organisations;
  }

  public async organisation(orgID: string) {
    const { data, errors } = await this.client.organisation({
      id: orgID,
    });

    this.errorHandler(errors);

    return data?.organisation;
  }

  public async createChallenge(challenge: CreateChallengeInput) {
    const { data, errors } = await this.client.createChallenge({
      challengeData: challenge,
    });

    this.errorHandler(errors);

    return data?.createChallenge;
  }

  public async challenges(ecoverseID: string) {
    const { data, errors } = await this.client.challenges({
      ecoverseID: ecoverseID,
    });

    this.errorHandler(errors);

    return data?.ecoverse.challenges;
  }

  public async updateChallenge(challenge: UpdateChallengeInput) {
    const { data, errors } = await this.client.updateChallenge({
      challengeData: challenge,
    });

    this.errorHandler(errors);

    return data?.updateChallenge;
  }

  public async updateOpportunity(opportunity: UpdateOpportunityInput) {
    const { data, errors } = await this.client.updateOpportunity({
      opportunityData: opportunity,
    });

    this.errorHandler(errors);

    return data?.updateOpportunity;
  }

  public async updateOrganisation(organisation: UpdateOrganisationInput) {
    const { data, errors } = await this.client.updateOrganisation({
      organisationData: organisation,
    });

    this.errorHandler(errors);

    return data?.updateOrganisation;
  }

  public async createUser(user: CreateUserInput) {
    const { data, errors } = await this.client.createUser({
      userData: user,
    });

    this.errorHandler(errors);

    return data?.createUser;
  }

  public async groups(ecoverseID: string) {
    const { data, errors } = await this.client.groups({
      ecoverseID: ecoverseID,
    });

    this.errorHandler(errors);

    return data?.ecoverse.community?.groups;
  }

  public async groupByName(ecoverseID: string, name: string) {
    const groups = await this.groups(ecoverseID);
    return groups?.find(x => x.name === name);
  }

  public async users() {
    const { data, errors } = await this.client.users();

    this.errorHandler(errors);

    return data?.users;
  }

  public async opportunities(ecoverseID: string) {
    const { data, errors } = await this.client.opportunities({
      ecoverseID: ecoverseID,
    });

    this.errorHandler(errors);

    return data?.ecoverse.opportunities;
  }

  async addUserToCommunity(userID: string, communityID?: string) {
    const uID = userID;
    if (!communityID)
      throw new Error(`Unable to locate community: ${communityID}`);
    const cID = communityID;

    const { data, errors } = await this.client.addUserToCommunity({
      input: {
        userID: uID,
        communityID: cID,
      },
    });

    this.errorHandler(errors);

    return data?.assignUserToCommunity;
  }

  async updateReferencesOnEcoverse(
    ecoverseID: string,
    references: Omit<UpdateReferenceInput, 'ID'>[]
  ) {
    const ecoverseInfo = await this.ecoverseInfo(ecoverseID);
    const contextId = ecoverseInfo?.context?.id;
    if (!contextId) {
      throw new Error('Ecoverse context id does not exist.');
    }
    const existingReferences = ecoverseInfo?.context?.references || [];
    const newReferences = references.filter(r =>
      existingReferences.every(x => x.name !== r.name)
    );
    const oldReferences = existingReferences.filter(r =>
      references.some(x => x.name === r.name)
    );

    const updateRefsInput: UpdateReferenceInput[] = [];
    for (const oldRef of oldReferences) {
      const newRefInput: UpdateReferenceInput = {
        ID: oldRef.id,
        name: oldRef.name,
        description: oldRef.description,
        uri: oldRef.uri,
      };
      updateRefsInput.push(newRefInput);
    }
    if (updateRefsInput.length > 0) {
      await this.updateEcoverse({
        ID: ecoverseID,
        context: {
          references: updateRefsInput,
        },
      });
    }

    for (const newRef of newReferences) {
      this.client.createReferenceOnContext({
        input: {
          contextID: contextId,
          name: newRef.name || '',
          description: newRef.description,
          uri: newRef.uri,
        },
      });
    }
  }
}
