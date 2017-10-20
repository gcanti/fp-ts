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
import { Either, left, right } from '../../src/Either'
import { rights, lefts, flatten } from '../../src/Array'
import { parse, Tag, Annotation } from 'doctrine'

// TODO: avoid comment duplication in overloaded function declarations

const isNotFound = (x: ParseError): x is NotFound => {
  return x._tag === 'NotFound'
}

export class NotFound {
  _tag: 'NotFound' = 'NotFound'
}

export class DataMissingConstructorName {
  _tag: 'MissingConstructorName' = 'MissingConstructorName'
  constructor(readonly module: string, readonly name: string) {}
}

export class DataInvalidConstructorName {
  _tag: 'DataInvalidConstructorName' = 'DataInvalidConstructorName'
  constructor(readonly module: string, readonly name: string) {}
}

export type ParseError = DataMissingConstructorName | DataInvalidConstructorName | NotFound

type ParseResult<A> = Either<Array<ParseError>, A>

const ok = <A>(a: A): ParseResult<A> => {
  return right(a)
}

const ko = (error: ParseError): ParseResult<never> => {
  return left([error])
}

const kos = (errors: Array<ParseError>): ParseResult<never> => {
  return left(errors)
}

const notFound: ParseResult<never> = ko(new NotFound())

const parseJSDoc = (source: string): Annotation => {
  return parse(source, { unwrap: true })
}

const getSourceFile = (name: string, source: string): SourceFile => {
  return new Ast().addSourceFileFromText(`${name}.ts`, source)
}

const notEmpty = (s: string): boolean => {
  return s !== ''
}

const fromJSDocDescription = (description: string | null): Option<string> => {
  return fromNullable(description).filter(notEmpty)
}

const getMethod = (md: MethodDeclaration): Method => {
  const name = md.getName()
  const text = md.getText()
  const start = md.getName().length
  const end = text.indexOf('{')
  const signature = text.substring(start, end)
  const description = fromNullable(md.getDocumentationComment()).filter(s => s.trim() !== '')
  return {
    type: 'method',
    name,
    signature,
    description
  }
}

const getClassMethods = (cd: ClassDeclaration): Array<Method> => {
  return cd.getInstanceMethods().map(md => getMethod(md))
}

const getAnnotation = (jsdocs: Array<JSDoc>): Annotation => {
  return parseJSDoc(jsdocs.map(doc => doc.getText()).join('\n'))
}

const isConstructorTag = (tag: Tag): boolean => {
  return tag.title === 'constructor'
}

const hasTag = (title: string) => (annotation: Annotation): boolean => {
  return annotation.tags.some(tag => tag.title === title)
}

const isData = hasTag('data')

const isFunc = hasTag('function')

const isInstance = hasTag('instance')

const isAlias = hasTag('alias')

const isTypeclass = hasTag('typeclass')

const parseTypeAliasDeclarationData = (
  module: string,
  sf: SourceFile,
  tad: TypeAliasDeclaration
): ParseResult<Data> => {
  const annotation = getAnnotation(tad.getDocumentationCommentNodes())
  if (isData(annotation)) {
    const dataName = tad.getName()
    const signature = tad.getText().substring('export '.length)
    const description = fromJSDocDescription(annotation.description)
    const eitherConstructors = annotation.tags.filter(isConstructorTag).map(tag => {
      const name = tag.name
      if (typeof name === 'undefined') {
        return ko(new DataMissingConstructorName(module, dataName))
      }
      const klass = sf.getClass(name)
      if (typeof klass === 'undefined') {
        return ko(new DataInvalidConstructorName(module, name))
      }
      const methods = getClassMethods(klass)
      return ok(new Constructor(name, methods))
    })
    const errors = flatten(lefts(eitherConstructors))
    if (errors.length > 0) {
      return kos(errors)
    }
    const constructors = rights(eitherConstructors)
    return ok(new Data(dataName, signature, description, constructors))
  }
  return notFound
}

const parseTypeAlias = (module: string, sf: SourceFile, tad: TypeAliasDeclaration): ParseResult<Export> => {
  return parseTypeAliasDeclarationData(module, sf, tad)
}

const parseClassDeclarationData = (sf: SourceFile, c: ClassDeclaration): ParseResult<Export> => {
  const annotation = getAnnotation(c.getDocumentationCommentNodes())
  if (isData(annotation)) {
    const dataName = c.getName()
    const signature = c.getConstructors()[0].getText()
    const description = fromJSDocDescription(annotation.description)
    const methods = getClassMethods(c)
    const constructors = [new Constructor(dataName, methods)]
    return ok(new Data(dataName, signature, description, constructors))
  }
  return notFound
}

const parseClass = (sf: SourceFile, c: ClassDeclaration): ParseResult<Export> => {
  return parseClassDeclarationData(sf, c)
}

const indexOf = (big: string, small: string) => {
  const i = big.indexOf(small)
  return i !== -1 ? some(i) : none
}

const parseInstanceVariableDeclaration = (sf: SourceFile, vd: VariableDeclaration): ParseResult<Export> => {
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
        return ok(new Instance(name, signature, description))
      }
    }
  }
  return notFound
}

const parseFunctionVariableDeclaration = (sf: SourceFile, vd: VariableDeclaration): ParseResult<Export> => {
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
        return ok(new Func(name, signature, description, isAlias(annotation)))
      }
    }
  }
  return notFound
}

const parseVariableDeclaration = (sf: SourceFile, vd: VariableDeclaration): ParseResult<Export> => {
  return parseFunctionVariableDeclaration(sf, vd).alt(parseInstanceVariableDeclaration(sf, vd))
}

const parseTypeclassInterface = (sf: SourceFile, i: InterfaceDeclaration): ParseResult<Typeclass> => {
  const annotation = getAnnotation(i.getDocumentationCommentNodes())
  if (isTypeclass(annotation)) {
    const name = i.getName()
    const signature = i.getText().substring('export '.length)
    const description = fromJSDocDescription(annotation.description)
    return ok(new Typeclass(name, signature, description))
  }
  return notFound
}

const parseFunctionDeclaration = (sf: SourceFile, f: FunctionDeclaration): ParseResult<Export> => {
  const annotation = getAnnotation(f.getDocumentationCommentNodes())
  if (isFunc(annotation)) {
    const name = f.getName()
    const description = fromJSDocDescription(annotation.description)
    const text = f.getText()
    const start = 'export function '.length
    const end = text.indexOf('{')
    const signature = text.substring(start, end === -1 ? text.length : end)
    return ok(new Func(name, signature, description, false))
  }
  return notFound
}

export const parseModule = (name: string, source: string): ParseResult<Module> => {
  const sf = getSourceFile(name, source)
  let errors: Array<ParseError> = []

  const eitherTypeAliasesExports = sf.getTypeAliases().map(tad => parseTypeAlias(name, sf, tad))
  errors = errors.concat(flatten(lefts(eitherTypeAliasesExports)))
  const typeAliasesExports = rights(eitherTypeAliasesExports)

  const eitherClassExports = sf.getClasses().map(c => parseClass(sf, c))
  errors = errors.concat(flatten(lefts(eitherClassExports)))
  const classExports = rights(eitherClassExports)

  const eitherVariableDeclarationExports = sf.getVariableDeclarations().map(vd => parseVariableDeclaration(sf, vd))
  errors = errors.concat(flatten(lefts(eitherVariableDeclarationExports)))
  const variableDeclarationExports = rights(eitherVariableDeclarationExports)

  const eitherFunctionDeclarationExports = sf.getFunctions().map(f => parseFunctionDeclaration(sf, f))
  errors = errors.concat(flatten(lefts(eitherFunctionDeclarationExports)))
  const functionDeclarationExports = rights(eitherFunctionDeclarationExports)

  const eitherTypeClasses = sf.getInterfaces().map(i => parseTypeclassInterface(sf, i))
  errors = errors.concat(flatten(lefts(eitherTypeClasses)))
  const typeClasses = rights(eitherTypeClasses)

  errors = errors.filter(x => !isNotFound(x))
  if (errors.length > 0) {
    return kos(errors)
  }

  const es = typeAliasesExports
    .concat(classExports)
    .concat(variableDeclarationExports)
    .concat(functionDeclarationExports)
  return ok(new Module(name, es, typeClasses))
}
