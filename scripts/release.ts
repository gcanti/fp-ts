// Release process (after build)
// - copy package.json and remove "scripts" and "files"
// - foreach file in "/lib" create a directory
// - in each directory put a package.json file with "name", "module" and "typings"
// - finally run npm publish in dist folder

import { preparePkgJson } from './helpers/prepare-pkg-json'
import { prepareDist } from './helpers/prepare-dist'
import { publish } from './helpers/publish-dist'
import { Program, run } from './libs/program'
import { ChildProcess, childProcessNode } from './libs/child_process'
import { Logger, loggerConsole } from './libs/logger'
import { FileSystem, fsNode } from './libs/fs'
import { chain } from '../src/ReaderTaskEither'
import { pipe } from '../src/function'

interface Capabilities extends ChildProcess, Logger, FileSystem {}

interface AppEff<A> extends Program<Capabilities, A> {}

const main: AppEff<void> = pipe(
  preparePkgJson,
  chain(() => prepareDist),
  // add check here?
  chain(() => publish)
)

run(
  main({
    ...loggerConsole,
    ...fsNode,
    ...childProcessNode
  })
)
