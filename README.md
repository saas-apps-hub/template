# Template

This template provides basic starter applications for backend, web, and mobile development. These are minimal implementations that should be enhanced according to your specific project requirements.

The workspace includes a shared `libs/core` library that can be used to share code among all applications.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 22+** - [Install Node.js](https://nodejs.org/)
- **pnpm** - [Install pnpm](https://pnpm.io/installation)

## Getting Started

1. **Rename the project:**

Replace all occurrences of:

- `Template` with `<YourNewProjectName>` (case-sensitive)
- `template` with `<your-project-name>` (case-sensitive)

by excluding `pnpm-lock.yaml` and `README.md` files for both of them.

This includes updating package names, workspace names, and any references throughout the codebase.

2. **Install dependencies:**

```sh
pnpm install
```

3. **Set up environment variables:**

```sh
cp .env.example .env
```

Edit `.env` with your configuration values as needed.

## Utility Commands

The following commands are available from the root `package.json`:

- `pnpm backend` - Start the backend server
- `pnpm marketing` - Start the marketing (Next.js) app
- `pnpm ios` - Start the iOS mobile app
- `pnpm android` - Start the Android mobile app

## Adding workspace specific dependencies

```sh
pnpm add multer --filter "backend"
pnpm add react-native-reanimated --filter "mobile"
pnpm add framer-motion --filter "marketing"
```

## Run tasks

To run the dev server for your app, use:

```sh
pnpm nx serve backend
```

To create a production bundle:

```sh
pnpm nx build backend
```

To see all available targets to run for a project, run:

```sh
pnpm nx show project backend
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
pnpm nx g @nx/node:app demo
```

To generate a new library, use:

```sh
pnpm nx g @nx/node:lib <your-library-name>
```

You can use `pnpm nx list` to get a list of installed plugins. Then, run `pnpm nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/nx-api/node?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:

- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
