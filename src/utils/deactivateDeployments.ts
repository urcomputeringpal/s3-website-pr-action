import * as github from "@actions/github";
import githubClient from '../githubClient';

export default async (
    repo: {
        owner: string;
        repo: string;
    },
) => {
    const environment = `PR-${github.context.payload.pull_request!.number}`;

    const deployments = await githubClient.repos.listDeployments({
        repo: repo.repo,
        owner: repo.owner,
        environment,
    });

    const existing = deployments.data.length;
    if (existing < 1) {
        console.log(`No exiting deployments found for pull request`);
        return;
    }

    for (const deployment of deployments.data) {
        console.log(`Deactivating existing deployment - ${deployment.id}`);

        await githubClient.repos.createDeploymentStatus({
            ...repo,
            deployment_id: deployment.id,
            state: 'inactive',
        });
    }
}