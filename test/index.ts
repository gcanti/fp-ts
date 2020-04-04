import * as assert from 'assert'
import * as glob from 'glob'
import * as path from 'path'

const getExportName = (name: string): string => {
  if (name === 'HKT' || name === 'IO') {
    return name.toLowerCase()
  }
  if (name === 'IOEither') {
    return 'ioEither'
  }
  if (name === 'IORef') {
    return 'ioRef'
  }
  if (name === 'TaskEither') {
    return 'taskEither'
  }
  if (name === 'StrMap') {
    return 'strmap'
  }
  return name.substring(0, 1).toLowerCase() + name.substring(1)
}

function getModuleNames(): ReadonlyArray<string> {
  return glob.sync('./src/**/*.ts').map((file) => path.parse(file).name)
}

describe('index', () => {
  it('check exported modules', () => {
    const moduleNames = getModuleNames()
    const fp = require('../src')
    moduleNames.forEach((name) => {
      if (name !== 'index') {
        const exportName = getExportName(name)
        assert.deepStrictEqual(
          fp[exportName] !== undefined,
          true,
          `The "${name}" module is not exported in src/index.ts as ${exportName}`
        )
      }
    })
  })
})
