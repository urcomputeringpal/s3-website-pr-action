import * as github from "@actions/github";
import githubClient from '../githubClient';

export default async (
    repo: {
        owner: string;
        repo: string;
    },
) => {
    const environment = `PR-${github.context.payload.pull_request!.number}`;

    const deployments = await githubClient.graphql(`
      query GetDeployments($owner: String!, $repo: String!, $environments: [String!]) {
        repository(owner: $owner, name: $repo) {
          deployments(first: 100, environments: $environments) {
            nodes {
              id
            }
          }
        }
      }`, { ...repo, environments: [environment] })

    const nodes = deployments.repository?.deployments?.nodes;

    console.log(JSON.stringify(deployments))

    if (nodes.length <= 0) {
        console.log(`No exiting deployments found for pull request`);
        return;
    }

    for (const node of nodes) {
        console.log(`Deleting existing deployment - ${node.id}`);

        await githubClient.graphql(`
          mutation DeleteDeployment($id: ID!) {
            deleteDeployment(input: {id: $id} ) {
              clientMutationId
            }
          }
        `, { id: node.id })
    }
}