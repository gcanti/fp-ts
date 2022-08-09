import * as ast from 'ts-morph'
import * as L from '../scripts/_linter'
import * as assert from 'assert'

let counter = 0

const compilerOptions: ast.ProjectOptions['compilerOptions'] = {
  strict: true
}

const project = new ast.Project({
  compilerOptions,
  useInMemoryFileSystem: true
})

const setup = (content: string) => {
  project.createSourceFile(`test${counter++}`, content, { overwrite: false })
  return L.parseFile(project.getSourceFiles()[0])
}

describe('Linter', () => {
  it('', () => {
    assert.deepStrictEqual(
      setup(`
function f(as: ReadonlyArray<number>): ReadonlyArray<number> {
  return as
}
    `),
      {}
    )
  })
})
