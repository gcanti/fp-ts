import Ast from 'ts-simple-ast'
import {
  SourceFile,
  TypeAliasDeclaration,
  JSDoc,
  ClassDeclaration,
  MethodDeclaration,
  VariableDeclaration,
  VariableStatement,
  InterfaceDeclaration,
  FunctionDeclaration
} from 'ts-simple-ast'
import { Module, Data, Constructor, Export, Method, Func, Typeclass, Instance } from './domain'
import { Option, none, some, fromNullable } from '../../src/Option'
import { catOptions } from '../../src/Array'
import { parse, Tag, Annotation } from 'doctrine'

// TODO: avoid comment duplication in overloaded function declarations

export const parseJSDoc = (source: string) => parse(source, { unwrap: true })

const getSourceFile = (name: string, source: string): SourceFile =>
  new Ast().addSourceFileFromText(`${name}.ts`, source)

const fromJSDocDescription = (description: string | null): Option<string> => {
  const d = description ? description.trim() : ''
  return d === '' ? none : some(d)
}

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

const getAnnotation = (jsdocs: Array<JSDoc>): Annotation => parseJSDoc(jsdocs.map(doc => doc.getText()).join('\n'))

const hasTag = (title: string) => (annotation: Annotation): boolean => annotation.tags.some(tag => tag.title === title)

const isData = hasTag('data')

const isConstructor = (tag: Tag) => tag.title === 'constructor'

const isFunc = hasTag('function')

const isInstance = hasTag('instance')

const isAlias = hasTag('alias')

const isTypeclass = hasTag('typeclass')

const parseTypeAliasDeclarationData = (sf: SourceFile, tad: TypeAliasDeclaration): Option<Data> => {
  const annotation = getAnnotation(tad.getDocumentationCommentNodes())
  if (isData(annotation)) {
    const dataName = tad.getName()
    const signature = tad.getText().substring('export '.length)
    const description = fromJSDocDescription(annotation.description)
    const constructors: Array<Constructor> = annotation.tags.filter(tag => isConstructor(tag)).map(tag => {
      const name = tag.name
      if (typeof name === 'undefined') {
        throw new Error(`Missing constructor name in ${dataName}`)
      }
      const klass = sf.getClass(name)
      if (typeof klass === 'undefined') {
        throw new Error(`Invalid constructor name ${name}`)
      }
      const methods = getClassMethods(klass)
      return new Constructor(name, methods)
    })
    return some(new Data(dataName, signature, description, constructors))
  }
  return none
}

const parseTypeAlias = (sf: SourceFile, tad: TypeAliasDeclaration): Option<Export> =>
  parseTypeAliasDeclarationData(sf, tad)

const parseClassDeclarationData = (sf: SourceFile, c: ClassDeclaration): Option<Export> => {
  const annotation = getAnnotation(c.getDocumentationCommentNodes())
  if (isData(annotation)) {
    const dataName = c.getName()
    const signature = c.getConstructors()[0].getText()
    const description = fromJSDocDescription(annotation.description)
    const methods = getClassMethods(c)
    const constructors = [new Constructor(dataName, methods)]
    return some(new Data(dataName, signature, description, constructors))
  }
  return none
}

const parseClass = (sf: SourceFile, c: ClassDeclaration): Option<Export> => parseClassDeclarationData(sf, c)

const indexOf = (big: string, small: string) => {
  const i = big.indexOf(small)
  return i !== -1 ? some(i) : none
}

const parseInstanceVariableDeclaration = (sf: SourceFile, vd: VariableDeclaration): Option<Export> => {
  const p = vd.getParent()
  if (p) {
    const pp = p.getParent()
    if (pp) {
      const vs: VariableStatement = pp as any
      const annotation = getAnnotation(vs.getDocumentationCommentNodes())
      if (isInstance(annotation)) {
        const name = vd.getName()
        const description = fromJSDocDescription(annotation.description)
        const text = vd.getText()
        const start = text.indexOf(': ') + ': '.length
        const end = text.indexOf(' = {')
        const signature = text.substring(start, end)
        return some(new Instance(name, signature, description))
      }
    }
  }
  return none
}

const parseFunctionVariableDeclaration = (sf: SourceFile, vd: VariableDeclaration): Option<Export> => {
  const p = vd.getParent()
  if (p) {
    const pp = p.getParent()
    if (pp) {
      const vs: VariableStatement = pp as any
      const annotation = getAnnotation(vs.getDocumentationCommentNodes())
      if (isFunc(annotation)) {
        const name = vd.getName()
        const description = fromJSDocDescription(annotation.description)
        const text = vd.getText()
        const start = text.indexOf(' = ') + ' = '.length
        const end = indexOf(text, ' => {')
        const signature = text.substring(start, end.getOrElseValue(text.length))
        return some(new Func(name, signature, description, isAlias(annotation)))
      }
    }
  }
  return none
}

const parseVariableDeclaration = (sf: SourceFile, vd: VariableDeclaration): Option<Export> =>
  parseFunctionVariableDeclaration(sf, vd).alt(parseInstanceVariableDeclaration(sf, vd))

const parseTypeclassInterface = (sf: SourceFile, i: InterfaceDeclaration): Option<Typeclass> => {
  const annotation = getAnnotation(i.getDocumentationCommentNodes())
  if (isTypeclass(annotation)) {
    const name = i.getName()
    const signature = i.getText().substring('export '.length)
    const description = fromJSDocDescription(annotation.description)
    return some(new Typeclass(name, signature, description))
  }
  return none
}

const parseFunctionDeclaration = (sf: SourceFile, f: FunctionDeclaration): Option<Export> => {
  const annotation = getAnnotation(f.getDocumentationCommentNodes())
  if (isFunc(annotation)) {
    const name = f.getName()
    const description = fromJSDocDescription(annotation.description)
    const text = f.getText()
    const start = 'export function '.length
    const end = text.indexOf('{')
    const signature = text.substring(start, end === -1 ? text.length : end)
    return some(new Func(name, signature, description, false))
  }
  return none
}

export const parseModule = (name: string, source: string): Module => {
  const sf = getSourceFile(name, source)
  const typeAliasesExports = catOptions(sf.getTypeAliases().map(tad => parseTypeAlias(sf, tad)))
  const classExports = catOptions(sf.getClasses().map(c => parseClass(sf, c)))
  const variableDeclarationExports = catOptions(
    sf.getVariableDeclarations().map(vd => parseVariableDeclaration(sf, vd))
  )
  const functionDeclarationExports = catOptions(sf.getFunctions().map(f => parseFunctionDeclaration(sf, f)))
  const es = typeAliasesExports
    .concat(classExports)
    .concat(variableDeclarationExports)
    .concat(functionDeclarationExports)
  const tc = catOptions(sf.getInterfaces().map(i => parseTypeclassInterface(sf, i)))
  return new Module(name, es, tc)
}

// import { readModule } from './fs'

// console.log(parseModule('Option', readModule('Option').run()).exports)
// console.log(parseModule('IO', readModule('IO').run()).exports)
// console.log(parseModule('Functor', readModule('Functor').run()).typeclasses)
// parseModule('Monoid', readModule('Monoid').run())
