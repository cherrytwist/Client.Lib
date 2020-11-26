import { gql } from '@apollo/client';

export const createGroupOnChallenge = gql`
  mutation createGroupOnChallenge($groupName: String!, $challengeID: Float!) {
    createGroupOnChallenge(groupName: $groupName, challengeID: $challengeID) {
      name
      id
      groups {
        name
      }
    }
  }
`;