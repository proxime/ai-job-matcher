# Job Coast – AI Job Matcher

A web app that compares a job offer with your professional profile, shows where
you are strong and where the gaps are, and keeps every offer in a tracker.

The project is built step by step. This page describes what exists today.

## Status

- **Done:** the full web interface and its hosting on AWS.
- **Not yet:** the API, sign-in and the AI analysis. The interface runs on
  sample data kept in the browser, so nothing is saved after a refresh.

## What you can do in the app

- **Contracts** – browse offers, search and filter them, preview the selected
  one and change its status.
- **Contract details** – read the full analysis, tick off preparation
  objectives, set the application date and keep notes.
- **Analyze** – paste a link or the text of an offer and walk through the
  loading, result and error screens.
- **Profile** – edit the skills, experience and minimum rate that every offer is
  compared with.

## AWS services in use

| Service | What it does here |
| --- | --- |
| Amazon S3 | Stores the built web app in a private bucket |
| Amazon CloudFront | Serves the app over HTTPS; the only reader of the bucket (Origin Access Control) |
| AWS Lambda | Runs the deployment helpers that copy files to the bucket and clear the CDN cache |
| AWS CloudFormation / CDK | Defines and deploys all of the above from TypeScript |

Everything is deployed to `eu-north-1` as one stack, `JobMatcherStack`. Nothing
is created by hand in the console.

## Tech stack

- **Web:** React, Vite, TypeScript, React Router, TanStack Query, Tailwind CSS,
  react-hook-form with Zod
- **Infrastructure:** AWS CDK (TypeScript)
- **Monorepo:** pnpm workspaces and Turborepo

## Repository layout

```
apps/web         React web app
packages/shared  Zod schemas shared by the web app and, later, the API
packages/tokens  Design tokens (CSS variables) and the Tailwind theme
infra            AWS CDK app with the JobMatcherStack
```

## Running it locally

The repository uses pnpm only.

```sh
pnpm install
pnpm dev      # start the web app
pnpm lint
pnpm build    # build every package and synthesize the stack
```

Infrastructure tests:

```sh
pnpm --filter @jm/infra test
```

## Deploying

Build first, because the deployment uploads the contents of `apps/web/dist`.

```sh
pnpm build
cd infra
pnpm cdk diff
pnpm cdk deploy
```

The address of the deployed app is printed as the `WebUrl` output.

## Planned next

1. API and storage – API Gateway, Lambda and DynamoDB
2. Sign-in – Amazon Cognito
3. AI analysis – Amazon Bedrock with structured, validated responses
4. Analysis from a link
5. Chrome extension that analyzes the offer open in the browser
6. CI/CD with GitHub Actions and monitoring in CloudWatch
