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
import { ReaderEither } from '../../examples/ReaderEither'

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

export class SinceMissing {
  _tag: 'SinceMissing' = 'SinceMissing'
  constructor(readonly module: string, readonly name: string) {}
}

export type ParseError = DataMissingConstructorName | DataInvalidConstructorName | SinceMissing | NotFound

export type ParseErrors = Array<ParseError>

export type ParseResult<A> = ReaderEither<Env, ParseErrors, A>

export type Env = {
  currentSourceFile: SourceFile
  currentModuleName: string
}

const ok = <A>(a: A): Either<ParseErrors, A> => {
  return right(a)
}

const kos = (errors: ParseErrors): Either<ParseErrors, never> => {
  return left(errors)
}

const ko = (error: ParseError): Either<ParseErrors, never> => {
  return kos([error])
}

const notFound: Either<ParseErrors, never> = ko(new NotFound())

const parseJSDoc = (source: string): Annotation => {
  return parse(source, { unwrap: true })
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
  const annotation = getAnnotation(md.getDocumentationCommentNodes())
  const since = getSince(annotation)
  return {
    type: 'method',
    name,
    signature,
    description,
    since: since.getOrElse('1.0.0')
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

const isSinceTag = (tag: Tag): boolean => {
  return tag.title === 'since'
}

const getSince = (annotation: Annotation): Option<string> => {
  return fromNullable(annotation.tags.filter(isSinceTag)[0]).mapNullable(tag => tag.description)
}

/** parses data types which are unions */
const parseTypeAliasDeclarationData = (tad: TypeAliasDeclaration): ParseResult<Export> => {
  return new ReaderEither(e => {
    const annotation = getAnnotation(tad.getDocumentationCommentNodes())
    if (isData(annotation)) {
      const dataName = tad.getName()
      const signature = tad.getText().substring('export '.length)
      const description = fromJSDocDescription(annotation.description)
      const eitherConstructors = annotation.tags.filter(isConstructorTag).map(tag => {
        const name = tag.name
        if (typeof name === 'undefined') {
          return ko(new DataMissingConstructorName(e.currentModuleName, dataName))
        }
        const klass = e.currentSourceFile.getClass(name)
        if (typeof klass === 'undefined') {
          return ko(new DataInvalidConstructorName(e.currentModuleName, name))
        }
        const methods = getClassMethods(klass)
        return ok(new Constructor(name, methods))
      })
      const errors = flatten(lefts(eitherConstructors))
      if (errors.length > 0) {
        return kos(errors)
      }
      const constructors = rights(eitherConstructors)
      const since = getSince(annotation)
      if (since.isNone()) {
        return ko(new SinceMissing(e.currentModuleName, dataName))
      } else {
        return ok(new Data(dataName, signature, description, constructors, since.value))
      }
    }
    return notFound
  })
}

/** parses data types which are a single class */
const parseClassDeclarationData = (c: ClassDeclaration): ParseResult<Export> => {
  return new ReaderEither(e => {
    const annotation = getAnnotation(c.getDocumentationCommentNodes())
    if (isData(annotation)) {
      const dataName = c.getName()
      const signature = c.getConstructors()[0].getText()
      const description = fromJSDocDescription(annotation.description)
      const methods = getClassMethods(c)
      const constructors = [new Constructor(dataName, methods)]
      const since = getSince(annotation)
      if (since.isNone()) {
        return ko(new SinceMissing(e.currentModuleName, dataName))
      } else {
        return ok(new Data(dataName, signature, description, constructors, since.value))
      }
    }
    return notFound
  })
}

const indexOf = (big: string, small: string) => {
  const i = big.indexOf(small)
  return i !== -1 ? some(i) : none
}

const parseInstanceVariableDeclaration = (vd: VariableDeclaration): ParseResult<Export> => {
  return new ReaderEither(e => {
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
          const since = getSince(annotation)
          if (since.isNone()) {
            return ko(new SinceMissing(e.currentModuleName, name))
          } else {
            return ok(new Instance(name, signature, description, since.value))
          }
        }
      }
    }
    return notFound
  })
}

const parseFunctionVariableDeclaration = (vd: VariableDeclaration): ParseResult<Export> => {
  return new ReaderEither(e => {
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
          const signature = text.substring(start, end.getOrElse(text.length))
          const since = getSince(annotation)
          if (since.isNone()) {
            return ko(new SinceMissing(e.currentModuleName, name))
          } else {
            return ok(new Func(name, signature, description, isAlias(annotation), since.value))
          }
        }
      }
    }
    return notFound
  })
}

const parseTypeclassInterface = (i: InterfaceDeclaration): ParseResult<Export> => {
  return new ReaderEither(() => {
    const annotation = getAnnotation(i.getDocumentationCommentNodes())
    if (isTypeclass(annotation)) {
      const name = i.getName()
      const signature = i.getText().substring('export '.length)
      const description = fromJSDocDescription(annotation.description)
      return ok(new Typeclass(name, signature, description))
    }
    return notFound
  })
}

const parseFunctionDeclaration = (f: FunctionDeclaration): ParseResult<Export> => {
  return new ReaderEither(e => {
    const annotation = getAnnotation(f.getDocumentationCommentNodes())
    if (isFunc(annotation)) {
      const name = f.getName()
      const description = fromJSDocDescription(annotation.description)
      const text = f.getText()
      const start = 'export function '.length
      const end = text.indexOf('{')
      const signature = text.substring(start, end === -1 ? text.length : end)
      const since = getSince(annotation)
      if (since.isNone()) {
        return ko(new SinceMissing(e.currentModuleName, name))
      } else {
        return ok(new Func(name, signature, description, false, since.value))
      }
    }
    return notFound
  })
}

export const parseModule: ParseResult<Module> = new ReaderEither(e => {
  const sf = e.currentSourceFile

  const eitherTypeAliasesExports = sf.getTypeAliases().map(tad => parseTypeAliasDeclarationData(tad).run(e))
  const eitherClassExports = sf.getClasses().map(c => parseClassDeclarationData(c).run(e))
  const eitherFunctionVariableDeclarationExports = sf
    .getVariableDeclarations()
    .map(vd => parseFunctionVariableDeclaration(vd).run(e))
  const eitherInstanceVariableDeclarationExports = sf
    .getVariableDeclarations()
    .map(vd => parseInstanceVariableDeclaration(vd).run(e))
  const eitherFunctionDeclarationExports = sf.getFunctions().map(f => parseFunctionDeclaration(f).run(e))
  const eitherTypeClasses = sf.getInterfaces().map(i => parseTypeclassInterface(i).run(e))

  const eitherExports = eitherTypeAliasesExports
    .concat(eitherClassExports)
    .concat(eitherFunctionVariableDeclarationExports)
    .concat(eitherInstanceVariableDeclarationExports)
    .concat(eitherFunctionDeclarationExports)
    .concat(eitherTypeClasses)

  const errors = flatten(lefts(eitherExports)).filter(error => !isNotFound(error))

  if (errors.length > 0) {
    return kos(errors)
  }

  const exports = rights(eitherExports)
  return ok(new Module(e.currentModuleName, exports))
})
