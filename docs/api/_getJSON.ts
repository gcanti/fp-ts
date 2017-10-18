import Ast from 'ts-simple-ast'
import {
  SourceFile,
  TypeAliasDeclaration,
  ClassDeclaration,
  JSDoc,
  MethodDeclaration,
  VariableStatement
} from 'ts-simple-ast'
import * as fs from 'fs'
import { Option, fromNullable, some, none } from '../../src/Option'
import { findFirst } from '../../src/Array'
import * as ts from 'typescript'
import { Data, Method, Module, Instance } from './_model'

const DATA_ANNOTATION = '@data'
const INSTANCE_ANNOTATION = '@instance'

const contains = (s: string, a: string): boolean => s.indexOf(a) !== -1

const findAnnotation = (annotation: string) => (docs: Array<JSDoc>): Option<string> =>
  findFirst((doc: string) => contains(doc, annotation))(docs.map(doc => doc.getText()))

const hasAnnotation = (annotation: string) => (docs: Array<JSDoc>) => findAnnotation(annotation)(docs).isSome()

const isData = hasAnnotation(DATA_ANNOTATION)

const isInstance = hasAnnotation(INSTANCE_ANNOTATION)

const isTypeAliasData = (tad: TypeAliasDeclaration): boolean =>
  tad.isNamedExport() && isData(tad.getDocumentationCommentNodes())

const getTypeAliasDescription = (tad: TypeAliasDeclaration): Option<string> =>
  fromNullable(tad.getDocumentationComment()).filter(s => s.trim() !== '')

/** returns the name of the first class in the union */
const getTypeAliasDataClassName = (tad: TypeAliasDeclaration): Option<string> =>
  fromNullable(tad.getChildrenOfKind(ts.SyntaxKind.UnionType)[0]).map(
    (ut: any) => ut.compilerNode.types[0].typeName.text
  )

/** returns the first class in the union */
const getTypeAliasDataClass = (sf: SourceFile, tad: TypeAliasDeclaration): Option<ClassDeclaration> =>
  getTypeAliasDataClassName(tad).chain(name => fromNullable(sf.getClass(name)))

const getTypeAliasSignature = (tad: TypeAliasDeclaration): string => tad.getText().substring('export '.length)

const getTypeAliasData = (sf: SourceFile, tad: TypeAliasDeclaration): Data => ({
  type: 'data',
  name: tad.getName(),
  signature: getTypeAliasSignature(tad),
  description: getTypeAliasDescription(tad),
  methods: getTypeAliasDataClass(sf, tad)
    .map(c => getClassMethods(c))
    .getOrElseValue([]),
  instances: getVariableStatementsInstances(sf).map(vs => getVariableStatementInstance(vs))
})

// const isClassData = (n: ClassDeclaration): boolean => n.isNamedExport() && isData(n.getDocumentationCommentNodes())

// const getClassDatas = (s: SourceFile): Array<ClassDeclaration> => sourceFile.getClasses().filter(isClassData)

const getMethodSignature = (md: MethodDeclaration): string => {
  const text = md.getText()
  const start = md.getName().length
  const end = text.indexOf('{')
  return text.substring(start, end)
}

const getMethodDescription = (md: MethodDeclaration): Option<string> =>
  fromNullable(md.getDocumentationComment()).filter(s => s.trim() !== '')

const getMethod = (md: MethodDeclaration): Method => ({
  type: 'method',
  name: md.getName(),
  signature: getMethodSignature(md),
  description: getMethodDescription(md)
})

const getClassMethods = (cd: ClassDeclaration): Array<Method> => cd.getInstanceMethods().map(md => getMethod(md))

const getTypeAliasDeclarations = (sf: SourceFile): Array<TypeAliasDeclaration> =>
  sf.getTypeAliases().filter(tad => isTypeAliasData(tad))

const getDatas = (sf: SourceFile): Array<Data> => {
  const typeAliasDatas = getTypeAliasDeclarations(sf).map(tad => getTypeAliasData(sf, tad))
  // TODO classDatas
  return typeAliasDatas
}

const getModule = (name: string, sf: SourceFile): Module => ({
  type: 'module',
  module: name,
  datas: getDatas(sf)
})

const readFile = (path: string) => fs.readFileSync(path).toString('utf-8')

const getSourceFile = (name: string): SourceFile =>
  new Ast().addSourceFileFromText(`${name}.ts`, readFile(`${__dirname}/../../src/${name}.ts`))

export const getJSON = (name: string): Module => getModule(name, getSourceFile(name))

const getVariableStatementsInstances = (sf: SourceFile): Array<VariableStatement> =>
  sf.getVariableStatements().filter(vs => vs.isNamedExport() && isInstance(vs.getDocumentationCommentNodes()))

const getVariableStatementSignature = (vs: VariableStatement): string => {
  const text = vs.getText()
  const start = 'export const '.length
  const end = text.indexOf(' =>')
  return text.substring(start, end)
}

const getVariableStatementInstance = (vs: VariableStatement): Instance => {
  return {
    type: 'instance',
    name: 'TODO',
    signature: some(getVariableStatementSignature(vs)),
    description: none // TODO
  }
}

const source = getSourceFile('Option')
console.log(getVariableStatementsInstances(source).map(vs => getVariableStatementInstance(vs)))
