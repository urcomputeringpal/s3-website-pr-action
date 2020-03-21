import * as github from '@actions/github';

const { GITHUB_TOKEN } = process.env;

export default async (message: string) => {
  const { number } = github.context.payload?.pull_request;
  const { owner, repo } = github.context.repo;

  const oktokit = new github.GitHub(GITHUB_TOKEN);

  await oktokit.issues.createComment({
    owner,
    repo,
    issue_number: number,
    body: message
  });
};
