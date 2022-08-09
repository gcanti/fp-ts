import * as T from '../src/Tree'
import * as ast from 'ts-morph'
import * as RA from '../src/ReadonlyArray'
import { pipe } from '../src/function'
import * as glob from 'glob'
import * as path from 'path'

// -------------------------------------------------------------------------------------
// domain
// -------------------------------------------------------------------------------------

export interface Info {
  readonly name: string
  readonly typeParameters: ReadonlyArray<string>
  readonly parameters: ReadonlyArray<string>
}

export type Infos = T.Forest<Info>

export interface File {
  readonly name: string
  readonly functions: Infos
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

export const info = (
  name: string,
  typeParameters: ReadonlyArray<string> = RA.empty,
  parameters: ReadonlyArray<string> = RA.empty
): Info => ({
  name,
  typeParameters,
  parameters
})

export const file = (name: string, functions: Infos): File => ({ name, functions })

const ensureReadonlyArray = <A>(as: ReadonlyArray<A> | undefined): ReadonlyArray<A> => (as ? as : RA.empty)

export const parse = (path: string, node: ast.ts.Node): Infos => {
  if (ast.ts.isFunctionDeclaration(node)) {
    return [
      T.tree(
        info(
          `${node.name!.getText()}/${path}`,
          pipe(
            node.typeParameters,
            ensureReadonlyArray,
            RA.map((tpd) => tpd.name.getText())
          ),
          RA.empty
        )
      )
    ]
  }
  if (ast.ts.isTypeReferenceNode(node)) {
    return [T.tree(info(node.typeName.getText(), RA.empty, RA.empty))]
  }
  throw new Error(`not sure what to do with ${node.getText()}`)
}

export const parseFile = (src: ast.SourceFile): File => {
  const name = path.basename(src.getFilePath())
  return file(
    name,
    pipe(
      src.getFunctions(),
      RA.chain((fd) =>
        pipe(
          [...fd.getOverloads(), fd],
          RA.chainWithIndex((i, fd) => parse(String(i), fd.compilerNode))
        )
      )
    )
  )
}

// -------------------------------------------------------------------------------------
// main
// -------------------------------------------------------------------------------------

export const compilerOptions: ast.ProjectOptions['compilerOptions'] = {
  strict: true
}

export const project = new ast.Project({
  compilerOptions
})

export const paths = glob.sync('src/**/*.ts')
// paths.forEach((path) => project.addSourceFileAtPath(path))
// const files = pipe(project.getSourceFiles(), RA.map(parseFile))
// console.log(JSON.stringify(files, null, 2))

project.addSourceFileAtPath('src/Alt.ts')
export const f = parseFile(project.getSourceFiles()[0])
console.log(JSON.stringify(f.functions, null, 2))

const toString = T.map((info: Info) => `${info.name} ${info.typeParameters.join(', ')} | ${info.parameters.join(', ')}`)
console.log(T.drawForest(pipe(f.functions, RA.map(toString))))
