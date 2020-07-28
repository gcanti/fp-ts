import { Program } from '../libs/program'
import { FileSystem } from '../libs/fs'
import { Logger } from '../libs/logger'
import { stringifyJSON, parseJSON, toError } from '../../src/Either'
import { chain, map, fromEither } from '../../src/TaskEither'
import * as path from 'path'
import { pipe } from '../../src/pipeable'
import { DIST } from './constants'

interface Capabilities extends Logger, FileSystem {}

interface AppEff<A> extends Program<Capabilities, A> {}

const PKG = 'package.json'

export const preparePkgJson: AppEff<void> = (C) =>
  pipe(
    C.log(`Copying project\'s "${PKG}" in "${DIST}" folder...`),
    chain(() => C.readFile(PKG)),
    chain((s) => fromEither(parseJSON(s, toError))),
    map((v) => {
      // This is the only way to completly remove fields in object
      const clone = Object.assign({}, v as any)

      delete clone.scripts
      delete clone.files

      return clone
    }),
    chain((data) => fromEither(stringifyJSON(data, toError))),
    chain((data) => C.writeFile(path.join(DIST, PKG), data)),
    chain(() => C.log(`"${PKG}" copied`))
  )
