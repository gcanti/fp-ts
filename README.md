### Starter Monorepo Setup [![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-ready--to--code-908a85?logo=gitpod)](https://gitpod.io/#https://github.com/ts-plus/starter-lib)

Install the dependencies with: `yarn`

Run prod build with: `yarn build`

Run dev build with `yarn build-watch`

Run test with: `yarn test` (note thet first you need to build)

Run example files with `node packages/starter-lib/build/examples/EXAMPLE_FILE.js`

## VSCode

Tasks setup, running the `test-watch` task will run build in watch mode and tests in watch mode.

Be sure you select the right typescript version, you should be prompted a notice when opening the ide, if that is not the case:

Open a TS file like `packages/starter-lib/src/index.ts` and then click in the `{}` near `TypeScript` in the bottom right corner of your editor and select the version from the workspace.
