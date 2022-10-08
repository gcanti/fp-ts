import * as _ from '@fp-ts/core'
import * as assert from 'assert'
import * as glob from 'glob'
import * as path from 'path'

const getExportName = (name: string): string => {
  if (name === 'HKT') {
    return name.toLowerCase()
  }
  return name.substring(0, 1).toLowerCase() + name.substring(1)
}

function getModuleNames(): ReadonlyArray<string> {
  return glob
    .sync('./_src/**/*.ts')
    .map((file) => path.parse(file).name)
    .filter((name) => name !== 'internal')
}

describe('index', () => {
  it('check exported modules', () => {
    const moduleNames = getModuleNames()
    moduleNames.forEach((name) => {
      if (name !== 'index') {
        const exportName = getExportName(name)
        assert.deepStrictEqual(
          // tslint:disable-next-line: strict-type-predicates
          (_ as Record<string, unknown>)[exportName] !== undefined,
          true,
          `The "${name}" module is not exported in src/index.ts as ${exportName}`
        )
      }
    })
  })
})
