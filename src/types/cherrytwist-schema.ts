export type Maybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** A human readable identifier, 3 <= length <= 25. Used for URL paths in clients. Characters allowed: a-z,A-Z,0-9. */
  NameID: any;
  /** A uuid identifier. Length 36 charachters. */
  UUID: any;
  /** A UUID or NameID identifier. */
  UUID_NAMEID: any;
  /** A UUID or Email identifier. */
  UUID_NAMEID_EMAIL: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: File;
};

export type AadAuthProviderConfig = {
  /** Config for accessing the Cherrytwist API. */
  apiConfig: ApiConfig;
  /** Scopes required for the user login. For OpenID Connect login flows, these are openid and profile + optionally offline_access if refresh tokens are utilized. */
  loginRequest: Scope;
  /** Config for MSAL authentication library on Cherrytwist Web Client. */
  msalConfig: MsalConfig;
  /** Scopes for silent token acquisition. Cherrytwist API scope + OpenID mandatory scopes. */
  silentRequest: Scope;
  /** Scopes for requesting a token. This is the Cherrytwist API app registration URI + ./default. */
  tokenRequest: Scope;
};

export type Actor = {
  /** A description of this actor */
  description?: Maybe<Scalars['String']>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The change / effort required of this actor */
  impact?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  /** A value derived by this actor */
  value?: Maybe<Scalars['String']>;
};

export type ActorGroup = {
  /** The set of actors in this actor group */
  actors?: Maybe<Array<Actor>>;
  /** A description of this group of actors */
  description?: Maybe<Scalars['String']>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  name: Scalars['String'];
};

export type Agent = {
  /** The Credentials held by this Agent. */
  credentials?: Maybe<Array<Credential>>;
  /** The Decentralized Identifier (DID) for this Agent. */
  did?: Maybe<Scalars['String']>;
  /** The ID of the entity */
  id: Scalars['UUID'];
};

export type ApiConfig = {
  /** Configuration payload for the Cherrytwist API. */
  resourceScope: Scalars['String'];
};

export type Application = {
  /** The ID of the entity */
  id: Scalars['UUID'];
  lifecycle: Lifecycle;
  questions: Array<Question>;
  user: User;
};

export type ApplicationEventInput = {
  ID: Scalars['UUID'];
  eventName: Scalars['String'];
};

export type ApplicationTemplate = {
  /** Application template name. */
  name: Scalars['String'];
  /** Template questions. */
  questions: Array<QuestionTemplate>;
};

export type Aspect = {
  explanation: Scalars['String'];
  framing: Scalars['String'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  title: Scalars['String'];
};

export type AssignChallengeLeadInput = {
  challengeID: Scalars['UUID'];
  organisationID: Scalars['UUID_NAMEID'];
};

export type AssignCommunityMemberInput = {
  communityID: Scalars['UUID'];
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type AssignUserGroupMemberInput = {
  groupID: Scalars['UUID'];
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type AuthenticationConfig = {
  /** Is authentication enabled? */
  enabled: Scalars['Boolean'];
  /** Cherrytwist Authentication Providers Config. */
  providers: Array<AuthenticationProviderConfig>;
};

export type AuthenticationProviderConfig = {
  /** Configuration of the authenticaiton provider */
  config: AuthenticationProviderConfigUnion;
  /** Is the authentication provider enabled? */
  enabled: Scalars['Boolean'];
  /** CDN location of an icon of the authentication provider login button. */
  icon: Scalars['String'];
  /** Label of the authentication provider. */
  label: Scalars['String'];
  /** Name of the authentication provider. */
  name: Scalars['String'];
};

export type AuthenticationProviderConfigUnion =
  | AadAuthProviderConfig
  | DemoAuthProviderConfig;

export enum AuthorizationCredential {
  CommunityMember = 'CommunityMember',
  GlobalAdmin = 'GlobalAdmin',
  GlobalAdminChallenges = 'GlobalAdminChallenges',
  GlobalAdminCommunity = 'GlobalAdminCommunity',
  GlobalRegistered = 'GlobalRegistered',
  OrganisationMember = 'OrganisationMember',
  UserGroupMember = 'UserGroupMember',
}

export type Challenge = {
  /** The activity within this Challenge. */
  activity?: Maybe<Array<Nvp>>;
  /** The set of child Challenges within this challenge. */
  challenges?: Maybe<Array<Challenge>>;
  /** The community for the challenge. */
  community?: Maybe<Community>;
  /** The context for the challenge. */
  context?: Maybe<Context>;
  /** The display name. */
  displayName: Scalars['String'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The Organisations that are leading this Challenge. */
  leadOrganisations: Array<Organisation>;
  /** The lifeycle for the Challenge. */
  lifecycle?: Maybe<Lifecycle>;
  /** A name identifier of the entity, unique within a given scope. */
  nameID: Scalars['NameID'];
  /** The Opportunities for the challenge. */
  opportunities?: Maybe<Array<Opportunity>>;
  /** The set of tags for the challenge */
  tagset?: Maybe<Tagset>;
};

export type ChallengeEventInput = {
  ID: Scalars['UUID'];
  eventName: Scalars['String'];
};

export type ChallengeTemplate = {
  /** Application templates. */
  applications?: Maybe<Array<ApplicationTemplate>>;
  /** Challenge template name. */
  name: Scalars['String'];
};

export type Community = Groupable & {
  /** Application available for this community. */
  applications: Array<Application>;
  /** The name of the Community */
  displayName: Scalars['String'];
  /** Groups of users related to a Community. */
  groups?: Maybe<Array<UserGroup>>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** All users that are contributing to this Community. */
  members?: Maybe<Array<User>>;
};

export type Config = {
  /** Cherrytwist authentication configuration. */
  authentication: AuthenticationConfig;
  /** Cherrytwist template configuration. */
  template: Template;
};

export type Context = {
  /** The Aspects for this Context. */
  aspects?: Maybe<Array<Aspect>>;
  /** A detailed description of the current situation */
  background?: Maybe<Scalars['String']>;
  /** The EcosystemModel for this Context. */
  ecosystemModel?: Maybe<EcosystemModel>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** What is the potential impact? */
  impact?: Maybe<Scalars['String']>;
  /** A list of URLs to relevant information. */
  references?: Maybe<Array<Reference>>;
  /** A one line description */
  tagline?: Maybe<Scalars['String']>;
  /** The goal that is being pursued */
  vision?: Maybe<Scalars['String']>;
  /** Who should get involved in this challenge */
  who?: Maybe<Scalars['String']>;
};

export type CreateActorGroupInput = {
  description?: Maybe<Scalars['String']>;
  ecosystemModelID: Scalars['UUID'];
  name: Scalars['String'];
};

export type CreateActorInput = {
  actorGroupID: Scalars['UUID'];
  description?: Maybe<Scalars['String']>;
  impact?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  value?: Maybe<Scalars['String']>;
};

export type CreateApplicationInput = {
  parentID: Scalars['UUID'];
  questions: Array<CreateNvpInput>;
  userID: Scalars['UUID'];
};

export type CreateAspectInput = {
  explanation: Scalars['String'];
  framing: Scalars['String'];
  parentID: Scalars['UUID'];
  title: Scalars['String'];
};

export type CreateChallengeInput = {
  context?: Maybe<CreateContextInput>;
  /** The display name for the entity. */
  displayName?: Maybe<Scalars['String']>;
  lifecycleTemplate?: Maybe<Scalars['String']>;
  /** A readable identifier, unique within the containing scope. */
  nameID: Scalars['NameID'];
  parentID: Scalars['UUID_NAMEID'];
  tags?: Maybe<Array<Scalars['String']>>;
};

export type CreateContextInput = {
  background?: Maybe<Scalars['String']>;
  impact?: Maybe<Scalars['String']>;
  /** Set of References for the new Context. */
  references?: Maybe<Array<CreateReferenceInput>>;
  tagline?: Maybe<Scalars['String']>;
  vision?: Maybe<Scalars['String']>;
  who?: Maybe<Scalars['String']>;
};

export type CreateEcoverseInput = {
  context?: Maybe<CreateContextInput>;
  /** The display name for the entity. */
  displayName?: Maybe<Scalars['String']>;
  /** The host Organisation for the ecoverse */
  hostID?: Maybe<Scalars['UUID_NAMEID']>;
  lifecycleTemplate?: Maybe<Scalars['String']>;
  /** A readable identifier, unique within the containing scope. */
  nameID: Scalars['NameID'];
  tags?: Maybe<Array<Scalars['String']>>;
};

export type CreateNvpInput = {
  name: Scalars['String'];
  value: Scalars['String'];
};

export type CreateOpportunityInput = {
  challengeID: Scalars['UUID_NAMEID'];
  context?: Maybe<CreateContextInput>;
  /** The display name for the entity. */
  displayName?: Maybe<Scalars['String']>;
  lifecycleTemplate?: Maybe<Scalars['String']>;
  /** A readable identifier, unique within the containing scope. */
  nameID: Scalars['NameID'];
  tags?: Maybe<Array<Scalars['String']>>;
};

export type CreateOrganisationInput = {
  /** The display name for the entity. */
  displayName?: Maybe<Scalars['String']>;
  /** A readable identifier, unique within the containing scope. */
  nameID: Scalars['NameID'];
  profileData?: Maybe<CreateProfileInput>;
};

export type CreateProfileInput = {
  avatar?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  referencesData?: Maybe<Array<CreateReferenceInput>>;
  tagsetsData?: Maybe<Array<CreateTagsetInput>>;
};

export type CreateProjectInput = {
  description?: Maybe<Scalars['String']>;
  /** The display name for the entity. */
  displayName?: Maybe<Scalars['String']>;
  /** A readable identifier, unique within the containing scope. */
  nameID: Scalars['NameID'];
  opportunityID: Scalars['UUID_NAMEID'];
};

export type CreateReferenceInput = {
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  parentID?: Maybe<Scalars['UUID']>;
  uri?: Maybe<Scalars['String']>;
};

export type CreateRelationInput = {
  actorName: Scalars['String'];
  actorRole?: Maybe<Scalars['String']>;
  actorType?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  parentID: Scalars['String'];
  type: Scalars['String'];
};

export type CreateTagsetInput = {
  name: Scalars['String'];
  parentID?: Maybe<Scalars['UUID']>;
  tags?: Maybe<Array<Scalars['String']>>;
};

export type CreateUserGroupInput = {
  name: Scalars['String'];
  parentID: Scalars['UUID'];
  profileData?: Maybe<CreateProfileInput>;
};

export type CreateUserInput = {
  accountUpn?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  /** The display name for the entity. */
  displayName?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  /** A readable identifier, unique within the containing scope. */
  nameID: Scalars['NameID'];
  phone?: Maybe<Scalars['String']>;
  profileData?: Maybe<CreateProfileInput>;
};

export type Credential = {
  /** The ID of the entity */
  id: Scalars['UUID'];
  resourceID: Scalars['String'];
  type: Scalars['String'];
};

export type DeleteActorGroupInput = {
  ID: Scalars['UUID'];
};

export type DeleteActorInput = {
  ID: Scalars['UUID'];
};

export type DeleteApplicationInput = {
  ID: Scalars['UUID'];
};

export type DeleteAspectInput = {
  ID: Scalars['UUID'];
};

export type DeleteChallengeInput = {
  ID: Scalars['UUID'];
};

export type DeleteEcoverseInput = {
  ID: Scalars['UUID'];
};

export type DeleteOpportunityInput = {
  ID: Scalars['UUID'];
};

export type DeleteOrganisationInput = {
  ID: Scalars['UUID'];
};

export type DeleteProjectInput = {
  ID: Scalars['UUID'];
};

export type DeleteReferenceInput = {
  ID: Scalars['UUID'];
};

export type DeleteRelationInput = {
  ID: Scalars['String'];
};

export type DeleteUserGroupInput = {
  ID: Scalars['UUID'];
};

export type DeleteUserInput = {
  ID: Scalars['UUID'];
};

export type DemoAuthProviderConfig = {
  /** Demo authentication provider issuer endpoint. */
  issuer: Scalars['String'];
  /** Demo authentication provider token endpoint. Use json payload in the form of username + password to login and obtain valid jwt token. */
  tokenEndpoint: Scalars['String'];
};

export type EcosystemModel = {
  /** A list of ActorGroups */
  actorGroups?: Maybe<Array<ActorGroup>>;
  /** Overview of this ecosystem model. */
  description?: Maybe<Scalars['String']>;
  /** The ID of the entity */
  id: Scalars['UUID'];
};

export type Ecoverse = {
  /** The activity within this Ecoverse. */
  activity?: Maybe<Array<Nvp>>;
  /** All applications to join */
  application: Application;
  /** A particular Challenge, either by its ID or nameID */
  challenge: Challenge;
  /** The challenges for the ecoverse. */
  challenges?: Maybe<Array<Challenge>>;
  /** The community for the ecoverse. */
  community?: Maybe<Community>;
  /** The context for the ecoverse. */
  context?: Maybe<Context>;
  /** The display name. */
  displayName: Scalars['String'];
  /** The user group with the specified id anywhere in the ecoverse */
  group: UserGroup;
  /** The User Groups on this Ecoverse */
  groups: Array<UserGroup>;
  /** All groups on this Ecoverse that have the provided tag */
  groupsWithTag: Array<UserGroup>;
  /** The organisation that hosts this Ecoverse instance */
  host?: Maybe<Organisation>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** A name identifier of the entity, unique within a given scope. */
  nameID: Scalars['NameID'];
  /** All opportunities within the ecoverse */
  opportunities: Array<Opportunity>;
  /** A particular Opportunity, either by its ID or nameID */
  opportunity: Opportunity;
  /** A particular Project, identified by the ID */
  project: Project;
  /** All projects within this ecoverse */
  projects: Array<Project>;
  /** The set of tags for the  ecoverse. */
  tagset?: Maybe<Tagset>;
};

export type EcoverseApplicationArgs = {
  ID: Scalars['UUID'];
};

export type EcoverseChallengeArgs = {
  ID: Scalars['UUID_NAMEID'];
};

export type EcoverseGroupArgs = {
  ID: Scalars['UUID'];
};

export type EcoverseGroupsWithTagArgs = {
  tag: Scalars['String'];
};

export type EcoverseOpportunityArgs = {
  ID: Scalars['UUID_NAMEID'];
};

export type EcoverseProjectArgs = {
  ID: Scalars['UUID_NAMEID'];
};

export type EcoverseTemplate = {
  /** Application templates. */
  applications?: Maybe<Array<ApplicationTemplate>>;
  /** Ecoverse template name. */
  name: Scalars['String'];
};

export type GrantAuthorizationCredentialInput = {
  /** The resource to which this credential is tied. */
  resourceID?: Maybe<Scalars['UUID']>;
  type: AuthorizationCredential;
  /** The user to whom the credential is being granted. */
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type Groupable = {
  /** The groups contained by this entity. */
  groups?: Maybe<Array<UserGroup>>;
};

export type Lifecycle = {
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The machine definition, describing the states, transitions etc for this Lifeycle. */
  machineDef: Scalars['JSON'];
  /** The next events of this Lifecycle. */
  nextEvents?: Maybe<Array<Scalars['String']>>;
  /** The current state of this Lifecycle. */
  state?: Maybe<Scalars['String']>;
  /** The Lifecycle template name. */
  templateName?: Maybe<Scalars['String']>;
};

export type Membership = {
  /** Ecoverses the user is a member of, with child memberships */
  ecoverses: Array<MembershipEcoverseResultEntry>;
  /** Names and IDs of  the Organisations the user is a member of */
  organisations: Array<MembershipResultEntry>;
};

export type MembershipEcoverseResultEntry = {
  /** Names and IDs of the Challenges the user is a member of */
  challenges: Array<MembershipResultEntry>;
  /** The ID of the Ecoverse */
  id?: Maybe<Scalars['UUID']>;
  /** The name of the Ecoverse. */
  name?: Maybe<Scalars['String']>;
  /** Names and IDs of  the UserGroups the user is a member of */
  userGroups: Array<MembershipResultEntry>;
};

export type MembershipInput = {
  /** The ID of the user to retrieve the membership of. */
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type MembershipResultEntry = {
  /** The ID of the entry the user is a member of. */
  id: Scalars['UUID'];
  /** Name of the entity */
  name: Scalars['String'];
};

export type Metadata = {
  /** Collection of metadata about Cherrytwist services. */
  services: Array<ServiceMetadata>;
};

export type MsalAuth = {
  /** Azure Active Directory OpenID Connect Authority. */
  authority: Scalars['String'];
  /** Cherrytwist Web Client App Registration Client Id. */
  clientId: Scalars['String'];
  /** Cherrytwist Web Client Login Redirect Uri. */
  redirectUri: Scalars['String'];
};

export type MsalCache = {
  /** Cache location, e.g. localStorage.  */
  cacheLocation?: Maybe<Scalars['String']>;
  /** Is the authentication information stored in a cookie? */
  storeAuthStateInCookie?: Maybe<Scalars['Boolean']>;
};

export type MsalConfig = {
  /** Azure Active Directory OpenID Connect endpoint configuration. */
  auth: MsalAuth;
  /** Token cache configuration.  */
  cache: MsalCache;
};

export type Mutation = {
  /** Assigns an organisation as a lead for the Challenge. */
  assignChallengeLead: Challenge;
  /** Assigns a User as a member of the specified Community. */
  assignUserToCommunity: UserGroup;
  /** Assigns a User as a member of the specified User Group. */
  assignUserToGroup: UserGroup;
  /** Creates a new Actor in the specified ActorGroup. */
  createActor: Actor;
  /** Create a new Actor Group on the EcosystemModel. */
  createActorGroup: ActorGroup;
  /** Creates Application for a User to join this Community. */
  createApplication: Application;
  /** Create a new Aspect on the Opportunity. */
  createAspect: Aspect;
  /** Create a new Aspect on the Project. */
  createAspectOnProject: Aspect;
  /** Creates a new Challenge within the specified Ecoverse. */
  createChallenge: Challenge;
  /** Creates a new child challenge within the parent Challenge. */
  createChildChallenge: Challenge;
  /** Creates a new Ecoverse. */
  createEcoverse: Ecoverse;
  /** Creates a new User Group in the specified Community. */
  createGroupOnCommunity: UserGroup;
  /** Creates a new User Group for the specified Organisation. */
  createGroupOnOrganisation: UserGroup;
  /** Creates a new Opportunity within the parent Challenge. */
  createOpportunity: Opportunity;
  /** Creates a new Organisation on the platform. */
  createOrganisation: Organisation;
  /** Create a new Project on the Opportunity */
  createProject: Project;
  /** Creates a new Reference on the specified Context. */
  createReferenceOnContext: Reference;
  /** Creates a new Reference on the specified Profile. */
  createReferenceOnProfile: Reference;
  /** Create a new Relation on the Opportunity. */
  createRelation: Relation;
  /** Creates a new Tagset on the specified Profile */
  createTagsetOnProfile: Tagset;
  /** Creates a new User on the platform. */
  createUser: User;
  /** Deletes the specified Actor. */
  deleteActor: Actor;
  /** Deletes the specified Actor Group, including contained Actors. */
  deleteActorGroup: ActorGroup;
  /** Deletes the specified Aspect. */
  deleteAspect: Aspect;
  /** Deletes the specified Challenge. */
  deleteChallenge: Challenge;
  /** Deletes the specified Ecoverse. */
  deleteEcoverse: Ecoverse;
  /** Deletes the specified Opportunity. */
  deleteOpportunity: Opportunity;
  /** Deletes the specified Organisation. */
  deleteOrganisation: Organisation;
  /** Deletes the specified Project. */
  deleteProject: Project;
  /** Deletes the specified Reference. */
  deleteReference: Reference;
  /** Deletes the specified Relation. */
  deleteRelation: Relation;
  /** Deletes the specified User. */
  deleteUser: User;
  /** Removes the specified User Application. */
  deleteUserApplication: Application;
  /** Deletes the specified User Group. */
  deleteUserGroup: UserGroup;
  /** Trigger an event on the Application. */
  eventOnApplication: Application;
  /** Trigger an event on the Challenge. */
  eventOnChallenge: Challenge;
  /** Trigger an event on the Opportunity. */
  eventOnOpportunity: Opportunity;
  /** Trigger an event on the Project. */
  eventOnProject: Project;
  /** Grants an authorization credential to a User. */
  grantCredentialToUser: User;
  /** Remove an organisation as a lead for the Challenge. */
  removeChallengeLead: Challenge;
  /** Removes a User as a member of the specified Community. */
  removeUserFromCommunity: UserGroup;
  /** Removes the specified User from specified user group */
  removeUserFromGroup: UserGroup;
  /** Removes an authorization credential from a User. */
  revokeCredentialFromUser: User;
  /** Updates the specified Actor. */
  updateActor: Actor;
  /** Updates the specified Aspect. */
  updateAspect: Aspect;
  /** Updates the specified Challenge. */
  updateChallenge: Challenge;
  /** Updates the Ecoverse. */
  updateEcoverse: Ecoverse;
  /** Updates the specified Opportunity. */
  updateOpportunity: Opportunity;
  /** Updates the specified Organisation. */
  updateOrganisation: Organisation;
  /** Updates the specified Profile. */
  updateProfile: Profile;
  /** Updates the specified Project. */
  updateProject: Project;
  /** Updates the User. */
  updateUser: User;
  /** Updates the specified User Group. */
  updateUserGroup: UserGroup;
  /** Uploads and sets an avatar image for the specified Profile. */
  uploadAvatar: Profile;
};

export type MutationAssignChallengeLeadArgs = {
  assignInput: AssignChallengeLeadInput;
};

export type MutationAssignUserToCommunityArgs = {
  membershipData: AssignCommunityMemberInput;
};

export type MutationAssignUserToGroupArgs = {
  membershipData: AssignUserGroupMemberInput;
};

export type MutationCreateActorArgs = {
  actorData: CreateActorInput;
};

export type MutationCreateActorGroupArgs = {
  actorGroupData: CreateActorGroupInput;
};

export type MutationCreateApplicationArgs = {
  applicationData: CreateApplicationInput;
};

export type MutationCreateAspectArgs = {
  aspectData: CreateAspectInput;
};

export type MutationCreateAspectOnProjectArgs = {
  aspectData: CreateAspectInput;
};

export type MutationCreateChallengeArgs = {
  challengeData: CreateChallengeInput;
};

export type MutationCreateChildChallengeArgs = {
  challengeData: CreateChallengeInput;
};

export type MutationCreateEcoverseArgs = {
  ecoverseData: CreateEcoverseInput;
};

export type MutationCreateGroupOnCommunityArgs = {
  groupData: CreateUserGroupInput;
};

export type MutationCreateGroupOnOrganisationArgs = {
  groupData: CreateUserGroupInput;
};

export type MutationCreateOpportunityArgs = {
  opportunityData: CreateOpportunityInput;
};

export type MutationCreateOrganisationArgs = {
  organisationData: CreateOrganisationInput;
};

export type MutationCreateProjectArgs = {
  projectData: CreateProjectInput;
};

export type MutationCreateReferenceOnContextArgs = {
  referenceInput: CreateReferenceInput;
};

export type MutationCreateReferenceOnProfileArgs = {
  referenceInput: CreateReferenceInput;
};

export type MutationCreateRelationArgs = {
  relationData: CreateRelationInput;
};

export type MutationCreateTagsetOnProfileArgs = {
  tagsetData: CreateTagsetInput;
};

export type MutationCreateUserArgs = {
  userData: CreateUserInput;
};

export type MutationDeleteActorArgs = {
  deleteData: DeleteActorInput;
};

export type MutationDeleteActorGroupArgs = {
  deleteData: DeleteActorGroupInput;
};

export type MutationDeleteAspectArgs = {
  deleteData: DeleteAspectInput;
};

export type MutationDeleteChallengeArgs = {
  deleteData: DeleteChallengeInput;
};

export type MutationDeleteEcoverseArgs = {
  deleteData: DeleteEcoverseInput;
};

export type MutationDeleteOpportunityArgs = {
  deleteData: DeleteOpportunityInput;
};

export type MutationDeleteOrganisationArgs = {
  deleteData: DeleteOrganisationInput;
};

export type MutationDeleteProjectArgs = {
  deleteData: DeleteProjectInput;
};

export type MutationDeleteReferenceArgs = {
  deleteData: DeleteReferenceInput;
};

export type MutationDeleteRelationArgs = {
  deleteData: DeleteRelationInput;
};

export type MutationDeleteUserArgs = {
  deleteData: DeleteUserInput;
};

export type MutationDeleteUserApplicationArgs = {
  deleteData: DeleteApplicationInput;
};

export type MutationDeleteUserGroupArgs = {
  deleteData: DeleteUserGroupInput;
};

export type MutationEventOnApplicationArgs = {
  applicationEventData: ApplicationEventInput;
};

export type MutationEventOnChallengeArgs = {
  challengeEventData: ChallengeEventInput;
};

export type MutationEventOnOpportunityArgs = {
  opportunityEventData: OpportunityEventInput;
};

export type MutationEventOnProjectArgs = {
  projectEventData: ProjectEventInput;
};

export type MutationGrantCredentialToUserArgs = {
  grantCredentialData: GrantAuthorizationCredentialInput;
};

export type MutationRemoveChallengeLeadArgs = {
  removeData: RemoveChallengeLeadInput;
};

export type MutationRemoveUserFromCommunityArgs = {
  membershipData: RemoveCommunityMemberInput;
};

export type MutationRemoveUserFromGroupArgs = {
  membershipData: RemoveUserGroupMemberInput;
};

export type MutationRevokeCredentialFromUserArgs = {
  revokeCredentialData: RevokeAuthorizationCredentialInput;
};

export type MutationUpdateActorArgs = {
  actorData: UpdateActorInput;
};

export type MutationUpdateAspectArgs = {
  aspectData: UpdateAspectInput;
};

export type MutationUpdateChallengeArgs = {
  challengeData: UpdateChallengeInput;
};

export type MutationUpdateEcoverseArgs = {
  ecoverseData: UpdateEcoverseInput;
};

export type MutationUpdateOpportunityArgs = {
  opportunityData: UpdateOpportunityInput;
};

export type MutationUpdateOrganisationArgs = {
  organisationData: UpdateOrganisationInput;
};

export type MutationUpdateProfileArgs = {
  profileData: UpdateProfileInput;
};

export type MutationUpdateProjectArgs = {
  projectData: UpdateProjectInput;
};

export type MutationUpdateUserArgs = {
  userData: UpdateUserInput;
};

export type MutationUpdateUserGroupArgs = {
  userGroupData: UpdateUserGroupInput;
};

export type MutationUploadAvatarArgs = {
  file: Scalars['Upload'];
  uploadData: UploadProfileAvatarInput;
};

export type Nvp = {
  /** The ID of the entity */
  id: Scalars['UUID'];
  name: Scalars['String'];
  value: Scalars['String'];
};

export type Opportunity = {
  /** The community for the Opportunity. */
  community?: Maybe<Community>;
  /** The context for the Opportunity. */
  context?: Maybe<Context>;
  /** The display name. */
  displayName: Scalars['String'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The lifeycle for the Opportunity. */
  lifecycle?: Maybe<Lifecycle>;
  /** A name identifier of the entity, unique within a given scope. */
  nameID: Scalars['NameID'];
  /** The set of projects within the context of this Opportunity */
  projects?: Maybe<Array<Project>>;
  /** The set of Relations within the context of this Opportunity. */
  relations?: Maybe<Array<Relation>>;
  /** The set of tags for the challenge */
  tagset?: Maybe<Tagset>;
};

export type OpportunityEventInput = {
  ID: Scalars['UUID'];
  eventName: Scalars['String'];
};

export type OpportunityTemplate = {
  /** Template actor groups. */
  actorGroups?: Maybe<Array<Scalars['String']>>;
  /** Application templates. */
  applications?: Maybe<Array<ApplicationTemplate>>;
  /** Template aspects. */
  aspects?: Maybe<Array<Scalars['String']>>;
  /** Template opportunity name. */
  name: Scalars['String'];
  /** Template relations. */
  relations?: Maybe<Array<Scalars['String']>>;
};

export type Organisation = Groupable &
  Searchable & {
    /** The display name. */
    displayName: Scalars['String'];
    /** Groups defined on this organisation. */
    groups?: Maybe<Array<UserGroup>>;
    id: Scalars['UUID'];
    /** All users that are members of this Organisation. */
    members?: Maybe<Array<User>>;
    /** A name identifier of the entity, unique within a given scope. */
    nameID: Scalars['NameID'];
    /** The profile for this organisation. */
    profile: Profile;
  };

export type Profile = {
  /** A URI that points to the location of an avatar, either on a shared location or a gravatar */
  avatar?: Maybe<Scalars['String']>;
  /** A short description of the entity associated with this profile. */
  description?: Maybe<Scalars['String']>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** A list of URLs to relevant information. */
  references?: Maybe<Array<Reference>>;
  /** A list of named tagsets, each of which has a list of tags. */
  tagsets?: Maybe<Array<Tagset>>;
};

export type Project = {
  /** The set of aspects for this Project. Note: likley to change. */
  aspects?: Maybe<Array<Aspect>>;
  description?: Maybe<Scalars['String']>;
  /** The display name. */
  displayName: Scalars['String'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The maturity phase of the project i.e. new, being refined, committed, in-progress, closed etc */
  lifecycle?: Maybe<Lifecycle>;
  /** A name identifier of the entity, unique within a given scope. */
  nameID: Scalars['NameID'];
  /** The set of tags for the project */
  tagset?: Maybe<Tagset>;
};

export type ProjectEventInput = {
  /** The ID of the entity to which the event is sent */
  ID: Scalars['String'];
  /** The name of the event. Simple text and matching an event in the Lifecycle definition. */
  eventName: Scalars['String'];
};

export type Query = {
  /** Cherrytwist configuration. Provides configuration to external services in the Cherrytwist ecosystem. */
  configuration: Config;
  /** An ecoverse. If no ID is specified then the first Ecoverse is returned. */
  ecoverse: Ecoverse;
  /** The Ecoverses on this platform */
  ecoverses: Array<Ecoverse>;
  /** The currently logged in user */
  me: User;
  /** Search the ecoverse for terms supplied */
  membership: Membership;
  /** Cherrytwist Services Metadata */
  metadata: Metadata;
  /** A particular Organisation */
  organisation: Organisation;
  /** The Organisations on this platform */
  organisations: Array<Organisation>;
  /** Search the ecoverse for terms supplied */
  search: Array<SearchResultEntry>;
  /** A particular user, identified by the ID or by email */
  user: User;
  /** The users who have profiles on this platform */
  users: Array<User>;
  /** The users filtered by list of IDs. */
  usersById: Array<User>;
  /** All Users that hold credentials matching the supplied criteria. */
  usersWithAuthorizationCredential: Array<User>;
};

export type QueryEcoverseArgs = {
  ID?: Maybe<Scalars['UUID_NAMEID']>;
};

export type QueryMembershipArgs = {
  membershipData: MembershipInput;
};

export type QueryOrganisationArgs = {
  ID: Scalars['UUID_NAMEID'];
};

export type QuerySearchArgs = {
  searchData: SearchInput;
};

export type QueryUserArgs = {
  ID: Scalars['UUID_NAMEID_EMAIL'];
};

export type QueryUsersByIdArgs = {
  IDs: Array<Scalars['UUID_NAMEID_EMAIL']>;
};

export type QueryUsersWithAuthorizationCredentialArgs = {
  credentialsCriteriaData: UsersWithAuthorizationCredentialInput;
};

export type Question = {
  /** The ID of the entity */
  id: Scalars['UUID'];
  name: Scalars['String'];
  value: Scalars['String'];
};

export type QuestionTemplate = {
  /** Question template. */
  question: Scalars['String'];
  /** Is question required? */
  required: Scalars['Boolean'];
};

export type Reference = {
  description: Scalars['String'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  name: Scalars['String'];
  uri: Scalars['String'];
};

export type Relation = {
  actorName: Scalars['String'];
  actorRole: Scalars['String'];
  actorType: Scalars['String'];
  description: Scalars['String'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  type: Scalars['String'];
};

export type RemoveChallengeLeadInput = {
  challengeID: Scalars['UUID'];
  organisationID: Scalars['UUID_NAMEID'];
};

export type RemoveCommunityMemberInput = {
  communityID: Scalars['UUID'];
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type RemoveUserGroupMemberInput = {
  groupID: Scalars['UUID'];
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type RevokeAuthorizationCredentialInput = {
  /** The resource to which access is being removed. */
  resourceID?: Maybe<Scalars['String']>;
  type: AuthorizationCredential;
  /** The user from whom the credential is being removed. */
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type Scope = {
  /** OpenID Scopes. */
  scopes: Array<Scalars['String']>;
};

export type SearchInput = {
  /** Restrict the search to only the specified challenges. Default is all Challenges. */
  challengesFilter?: Maybe<Array<Scalars['Float']>>;
  /** Expand the search to includes Tagsets with the provided names. Max 2. */
  tagsetNames?: Maybe<Array<Scalars['String']>>;
  /** The terms to be searched for within this Ecoverse. Max 5. */
  terms: Array<Scalars['String']>;
  /** Restrict the search to only the specified entity types. Values allowed: user, group, organisation, Default is all. */
  typesFilter?: Maybe<Array<Scalars['String']>>;
};

export type SearchResultEntry = {
  /** Each search result contains either a User, UserGroup or Organisation */
  result?: Maybe<Searchable>;
  /** The score for this search result; more matches means a higher score. */
  score?: Maybe<Scalars['Float']>;
  /** The terms that were matched for this result */
  terms?: Maybe<Array<Scalars['String']>>;
};

export type Searchable = {
  id: Scalars['UUID'];
};

export type ServiceMetadata = {
  /** Service name e.g. CT Server */
  name?: Maybe<Scalars['String']>;
  /** Version in the format {major.minor.patch} - using SemVer. */
  version?: Maybe<Scalars['String']>;
};

export type Tagset = {
  /** The ID of the entity */
  id: Scalars['UUID'];
  name: Scalars['String'];
  tags: Array<Scalars['String']>;
};

export type TagsetTemplate = {
  /** Tagset template name. */
  name: Scalars['String'];
  /** Tagset placeholder */
  placeholder?: Maybe<Scalars['String']>;
};

export type Template = {
  /** Challenge templates. */
  challenges: Array<ChallengeTemplate>;
  /** Template description. */
  description: Scalars['String'];
  /** Ecoverse templates. */
  ecoverses: Array<EcoverseTemplate>;
  /** Template name. */
  name: Scalars['String'];
  /** Opportunity templates. */
  opportunities: Array<OpportunityTemplate>;
  /** User templates. */
  users: Array<UserTemplate>;
};

export type UpdateActorInput = {
  ID: Scalars['UUID'];
  description?: Maybe<Scalars['String']>;
  impact?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type UpdateAspectInput = {
  ID: Scalars['UUID'];
  explanation?: Maybe<Scalars['String']>;
  framing?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type UpdateChallengeInput = {
  /** The ID of the entity to be updated. */
  ID: Scalars['UUID_NAMEID'];
  /** Update the contained Context entity. */
  context?: Maybe<UpdateContextInput>;
  /** The display name for this entity. */
  displayName?: Maybe<Scalars['String']>;
  /** A display identifier, unique within the containing scope. Note: updating the nameID will affect URL on the client. */
  nameID?: Maybe<Scalars['NameID']>;
  /** Update the tags on the Tagset. */
  tags?: Maybe<Array<Scalars['String']>>;
};

export type UpdateContextInput = {
  background?: Maybe<Scalars['String']>;
  impact?: Maybe<Scalars['String']>;
  /** Update the set of References for the Context. */
  references?: Maybe<Array<UpdateReferenceInput>>;
  tagline?: Maybe<Scalars['String']>;
  vision?: Maybe<Scalars['String']>;
  who?: Maybe<Scalars['String']>;
};

export type UpdateEcoverseInput = {
  /** The ID of the entity to be updated. */
  ID: Scalars['UUID_NAMEID'];
  /** Update the contained Context entity. */
  context?: Maybe<UpdateContextInput>;
  /** The display name for this entity. */
  displayName?: Maybe<Scalars['String']>;
  /** Update the host Organisation for the Ecoverse. */
  hostID?: Maybe<Scalars['UUID_NAMEID']>;
  /** A display identifier, unique within the containing scope. Note: updating the nameID will affect URL on the client. */
  nameID?: Maybe<Scalars['NameID']>;
  /** Update the tags on the Tagset. */
  tags?: Maybe<Array<Scalars['String']>>;
};

export type UpdateOpportunityInput = {
  /** The ID of the entity to be updated. */
  ID: Scalars['UUID_NAMEID'];
  /** Update the contained Context entity. */
  context?: Maybe<UpdateContextInput>;
  /** The display name for this entity. */
  displayName?: Maybe<Scalars['String']>;
  /** A display identifier, unique within the containing scope. Note: updating the nameID will affect URL on the client. */
  nameID?: Maybe<Scalars['NameID']>;
  /** Update the tags on the Tagset. */
  tags?: Maybe<Array<Scalars['String']>>;
};

export type UpdateOrganisationInput = {
  /** The ID of the entity to be updated. */
  ID: Scalars['UUID_NAMEID'];
  /** The display name for this entity. */
  displayName?: Maybe<Scalars['String']>;
  /** A display identifier, unique within the containing scope. Note: updating the nameID will affect URL on the client. */
  nameID?: Maybe<Scalars['NameID']>;
  profileData?: Maybe<UpdateProfileInput>;
};

export type UpdateProfileInput = {
  ID: Scalars['UUID'];
  avatar?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  references?: Maybe<Array<UpdateReferenceInput>>;
  tagsets?: Maybe<Array<UpdateTagsetInput>>;
};

export type UpdateProjectInput = {
  /** The ID of the entity to be updated. */
  ID: Scalars['UUID_NAMEID'];
  description?: Maybe<Scalars['String']>;
  /** The display name for this entity. */
  displayName?: Maybe<Scalars['String']>;
  /** A display identifier, unique within the containing scope. Note: updating the nameID will affect URL on the client. */
  nameID?: Maybe<Scalars['NameID']>;
};

export type UpdateReferenceInput = {
  ID: Scalars['UUID'];
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  uri?: Maybe<Scalars['String']>;
};

export type UpdateTagsetInput = {
  ID: Scalars['UUID'];
  name?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
};

export type UpdateUserGroupInput = {
  ID: Scalars['UUID'];
  name?: Maybe<Scalars['String']>;
  profileData?: Maybe<UpdateProfileInput>;
};

export type UpdateUserInput = {
  /** The ID of the entity to be updated. */
  ID: Scalars['UUID_NAMEID'];
  accountUpn?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  /** The display name for this entity. */
  displayName?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  /** A display identifier, unique within the containing scope. Note: updating the nameID will affect URL on the client. */
  nameID?: Maybe<Scalars['NameID']>;
  phone?: Maybe<Scalars['String']>;
  profileData?: Maybe<UpdateProfileInput>;
};

export type UploadProfileAvatarInput = {
  file: Scalars['String'];
  profileID: Scalars['String'];
};

export type User = Searchable & {
  /** The unique personal identifier (upn) for the account associated with this user profile */
  accountUpn: Scalars['String'];
  /** The agent for this User */
  agent?: Maybe<Agent>;
  city: Scalars['String'];
  country: Scalars['String'];
  /** The display name. */
  displayName: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  gender: Scalars['String'];
  id: Scalars['UUID'];
  lastName: Scalars['String'];
  /** A name identifier of the entity, unique within a given scope. */
  nameID: Scalars['NameID'];
  phone: Scalars['String'];
  /** The profile for this User */
  profile?: Maybe<Profile>;
};

export type UserGroup = Searchable & {
  id: Scalars['UUID'];
  /** The Users that are members of this User Group. */
  members?: Maybe<Array<User>>;
  name: Scalars['String'];
  /** Containing entity for this UserGroup. */
  parent?: Maybe<Groupable>;
  /** The profile for the user group */
  profile?: Maybe<Profile>;
};

export type UserTemplate = {
  /** User template name. */
  name: Scalars['String'];
  /** Tagset templates. */
  tagsets?: Maybe<Array<TagsetTemplate>>;
};

export type UsersWithAuthorizationCredentialInput = {
  /** The resource to which a credential needs to be bound. */
  resourceID?: Maybe<Scalars['UUID']>;
  /** The type of credential. */
  type: AuthorizationCredential;
};
