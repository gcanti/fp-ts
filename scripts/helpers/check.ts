// This operation runs a kind of smoke test to check that everything is fine in `dist` folder

import { Program } from '../libs/program'
import { ChildProcess } from '../libs/child_process'
import { Logger } from '../libs/logger'
import { pipe } from '../../src/function'
import { chain } from '../../src/TaskEither'
import { SMOKE_TESTS_DIR } from './constants'

interface Capabilities extends ChildProcess, Logger {}

interface AppEff<A> extends Program<Capabilities, A> {}

const SMOKE_CJS = `npx ts-node ${SMOKE_TESTS_DIR}/cjs.ts`

const BUILD_ES6 = `npx parcel build ${SMOKE_TESTS_DIR}/es6.ts -d ${SMOKE_TESTS_DIR} --no-source-maps --no-minify --target node --no-cache`

const SMOKE_ES6 = `node ${SMOKE_TESTS_DIR}/es6.js`

export const check: AppEff<void> = (C) =>
  pipe(
    C.log('Running smoke tests...'),
    // Run smoke test for commonjs format
    chain(() => C.exec(SMOKE_CJS)),
    // Build es6 script in commonjs format
    chain(() => C.exec(BUILD_ES6)),
    // and run the smoke test
    chain(() => C.exec(SMOKE_ES6))
  )
