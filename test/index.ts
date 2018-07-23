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

const shouldExport = (name: string): boolean => {
  return !(name in { index: null, LocalStorage: null })
}

describe('index', () => {
  it('check exported modules', () => {
    const moduleNames = getModuleNames()
    const fp = require('../src')
    moduleNames.forEach(name => {
      if (shouldExport(name)) {
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
