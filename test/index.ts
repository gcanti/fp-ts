import * as assert from 'assert'
import { getModuleNames } from '../docs-generator/fs'

const getExportName = (name: string): string => {
  if (name === 'HKT' || name === 'IO') {
    return name.toLowerCase()
  }
  if (name === 'IOEither') {
    return 'ioEither'
  }
  if (name === 'TaskEither') {
    return 'taskEither'
  }
  if (name === 'StrMap') {
    return 'strmap'
  }
  return name.substring(0, 1).toLowerCase() + name.substring(1)
}

describe('index', () => {
  it('check exported modules', () => {
    const moduleNames = getModuleNames()
    const fp = require('../src')
    moduleNames.forEach(name => {
      if (name !== 'index') {
        const exportName = getExportName(name)
        assert.strictEqual(
          fp[exportName] !== undefined,
          true,
          `The "${name}" module is not exported in src/index.ts as ${exportName}`
        )
      }
    })
  })
})
