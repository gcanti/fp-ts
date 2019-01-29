import { Annotation, parse, Tag } from 'doctrine'
import {
  ClassDeclaration,
  FunctionDeclaration,
  InterfaceDeclaration,
  JSDoc,
  MethodDeclaration,
  SourceFile,
  TypeAliasDeclaration,
  TypeParameterDeclaration,
  VariableDeclaration,
  VariableStatement
} from 'ts-simple-ast'
import { ReaderEither } from '../examples/ReaderEither'
import { flatten, lefts, rights } from '../src/Array'
import { Either, left, right } from '../src/Either'
import { fromNullable, none, Option, some } from '../src/Option'
import {
  constant,
  constructor,
  data,
  Export,
  func,
  instance,
  inter,
  location,
  Method,
  method,
  Module,
  typeClass
} from './domain'

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

export class NameMissing {
  _tag: 'NameMissing' = 'NameMissing'
  constructor(readonly module: string) {}
}

export type ParseError = DataMissingConstructorName | DataInvalidConstructorName | SinceMissing | NotFound | NameMissing

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

const getMethodSignature = (md: MethodDeclaration): string => {
  const text = md.getText()
  const end = text.indexOf('{')
  return `${text.substring(0, end)} { ... }`
}

const getMethod = (currentModuleName: string, md: MethodDeclaration): Method => {
  const overloads = md.getOverloads()
  const annotation = overloads.length === 0 ? getAnnotation(md.getJsDocs()) : getAnnotation(overloads[0].getJsDocs())
  const name = md.getName()
  const signature = getMethodSignature(md)
  const description = fromJSDocDescription(annotation.description)
  const since = getSince(annotation)
  const example = getExample(annotation)
  const deprecated = getDeprecated(annotation)
  const loc = location(getPath(currentModuleName), md.getStartLineNumber(), md.getEndLineNumber())
  return method(name, signature, description, since, example, deprecated, loc)
}

const getClassMethods = (currentModuleName: string, cd: ClassDeclaration): Array<Method> => {
  return cd.getInstanceMethods().map(md => getMethod(currentModuleName, md))
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

const isConstant = hasTag('constant')

const isTypeclass = hasTag('typeclass')

const isInterface = hasTag('interface')

const isSinceTag = (tag: Tag): boolean => {
  return tag.title === 'since'
}

const getSince = (annotation: Annotation): Option<string> => {
  return fromNullable(annotation.tags.filter(isSinceTag)[0]).mapNullable(tag => tag.description)
}

const isExampleTag = (tag: Tag): boolean => {
  return tag.title === 'example'
}

const getExample = (annotation: Annotation): Option<string> => {
  return fromNullable(annotation.tags.filter(isExampleTag)[0]).mapNullable(tag => tag.description)
}

const isDeprecatedTag = (tag: Tag): boolean => {
  return tag.title === 'deprecated'
}

const getDeprecated = (annotation: Annotation): boolean => {
  return fromNullable(annotation.tags.filter(isDeprecatedTag)[0]).isSome()
}

const isAliasTag = (tag: Tag): boolean => {
  return tag.title === 'alias'
}

const getAlias = (annotation: Annotation): Option<string> => {
  return fromNullable(annotation.tags.filter(isAliasTag)[0]).mapNullable(tag => tag.name)
}

const getTypeAliasDeclarationDataConstructors = (sourceFile: SourceFile, tags: Array<Tag>): Array<ClassDeclaration> => {
  const r: Array<ClassDeclaration> = []
  tags.forEach(tag => {
    const name = tag.name
    if (name !== undefined) {
      const c = sourceFile.getClass(name)
      if (c !== undefined) {
        r.push(c)
      }
    }
  })
  return r
}

const getTypeAliasDeclarationDataSignature = (
  tad: TypeAliasDeclaration,
  sourceFile: SourceFile,
  tags: Array<Tag>
): string => {
  const constructors = getTypeAliasDeclarationDataConstructors(sourceFile, tags)
    .map(c => getClassDeclarationDataSignature(c))
    .join('\n\n')
  return tad.getText() + '\n\n' + constructors
}

/** parses data types which are unions */
const parseTypeAliasDeclarationData = (tad: TypeAliasDeclaration): ParseResult<Export> => {
  return new ReaderEither(e => {
    const annotation = getAnnotation(tad.getJsDocs())
    if (isData(annotation)) {
      const dataName = tad.getName()
      const since = getSince(annotation)
      if (since.isNone()) {
        return ko(new SinceMissing(e.currentModuleName, dataName))
      } else {
        const description = fromJSDocDescription(annotation.description)
        const tags = annotation.tags.filter(isConstructorTag)
        const eitherConstructors = tags.map(tag => {
          const name = tag.name
          if (typeof name === 'undefined') {
            return ko(new DataMissingConstructorName(e.currentModuleName, dataName))
          }
          const klass = e.currentSourceFile.getClass(name)
          if (typeof klass === 'undefined') {
            return ko(new DataInvalidConstructorName(e.currentModuleName, name))
          }
          const methods = getClassMethods(e.currentModuleName, klass)
          return ok(constructor(name, methods))
        })
        const errors = flatten(lefts(eitherConstructors))
        if (errors.length > 0) {
          return kos(errors)
        }
        const constructors = rights(eitherConstructors)
        const signature = getTypeAliasDeclarationDataSignature(tad, e.currentSourceFile, tags)
        const example = getExample(annotation)
        const loc = location(getPath(e.currentModuleName), tad.getStartLineNumber(), tad.getEndLineNumber())
        return ok(data(dataName, signature, description, constructors, since.value, example, loc))
      }
    }
    return notFound
  })
}

const getTypeParameters = (typeParameters: Array<TypeParameterDeclaration>): string => {
  if (typeParameters.length === 0) {
    return ''
  }
  return '<' + typeParameters.map(p => p.getName()).join(', ') + '>'
}

const getClassDeclarationDataSignature = (c: ClassDeclaration): string => {
  const dataName = c.getName()
  const typeParameters = getTypeParameters(c.getTypeParameters())
  return `export class ${dataName}${typeParameters} {\n  ${c.getConstructors()[0].getText()}\n  ...\n}`
}

/** parses data types which are a single class */
const parseClassDeclarationData = (c: ClassDeclaration): ParseResult<Export> => {
  return new ReaderEither(e => {
    const annotation = getAnnotation(c.getJsDocs())
    if (isData(annotation)) {
      const dataName = c.getName()
      if (typeof dataName === 'undefined') {
        return ko(new NameMissing(e.currentModuleName))
      }
      const since = getSince(annotation)
      if (since.isNone()) {
        return ko(new SinceMissing(e.currentModuleName, dataName))
      } else {
        const signature = getClassDeclarationDataSignature(c)
        const description = fromJSDocDescription(annotation.description)
        const methods = getClassMethods(e.currentModuleName, c)
        const constructors = [constructor(dataName, methods)]
        const example = getExample(annotation)
        const loc = location(getPath(e.currentModuleName), c.getStartLineNumber(), c.getEndLineNumber())
        return ok(data(dataName, signature, description, constructors, since.value, example, loc))
      }
    }
    return notFound
  })
}

const indexOf = (big: string, small: string) => {
  const i = big.indexOf(small)
  return i !== -1 ? some(i) : none
}

const getInstanceVariableDeclarationSignature = (vd: VariableDeclaration): string => {
  const name = vd.getName()
  const text = vd.getText()
  const start = text.indexOf(': ') + ': '.length
  const end = text.indexOf(' = ')
  const type = text.substring(start, end)
  return `export const ${name}: ${type} = { ... }`
}

const parseInstanceVariableDeclaration = (vd: VariableDeclaration): ParseResult<Export> => {
  return new ReaderEither(e => {
    const p = vd.getParent()
    if (p) {
      const pp = p.getParent()
      if (pp) {
        const vs: VariableStatement = pp
        const annotation = getAnnotation(vs.getJsDocs())
        if (isInstance(annotation)) {
          const name = vd.getName()
          const since = getSince(annotation)
          if (since.isNone()) {
            return ko(new SinceMissing(e.currentModuleName, name))
          } else {
            const description = fromJSDocDescription(annotation.description)
            const signature = getInstanceVariableDeclarationSignature(vd)
            const loc = location(getPath(e.currentModuleName), vd.getStartLineNumber(), vd.getEndLineNumber())
            return ok(instance(name, signature, description, since.value, loc))
          }
        }
      }
    }
    return notFound
  })
}

const getConstantVariableDeclarationSignature = (vd: VariableDeclaration): string => {
  const text = vd.getText()
  const end = text.indexOf(' = ')
  return `export const ${text.substring(0, end)} = ...`
}

const parseConstantVariableDeclaration = (vd: VariableDeclaration): ParseResult<Export> => {
  return new ReaderEither(e => {
    const p = vd.getParent()
    if (p) {
      const pp = p.getParent()
      if (pp) {
        const vs: VariableStatement = pp
        const annotation = getAnnotation(vs.getJsDocs())
        if (isConstant(annotation)) {
          const name = vd.getName()
          const since = getSince(annotation)
          if (since.isNone()) {
            return ko(new SinceMissing(e.currentModuleName, name))
          } else {
            const description = fromJSDocDescription(annotation.description)
            const signature = getConstantVariableDeclarationSignature(vd)
            const loc = location(getPath(e.currentModuleName), vd.getStartLineNumber(), vd.getEndLineNumber())
            return ok(constant(name, signature, description, since.value, loc))
          }
        }
      }
    }
    return notFound
  })
}

const getFunctionVariableDeclarationSignature = (vd: VariableDeclaration): string => {
  const text = vd.getText()
  const end = indexOf(text, ' => {')
  return `export const ${text.substring(0, end.getOrElse(text.length))} => { ... }`
}

const parseFunctionVariableDeclaration = (vd: VariableDeclaration): ParseResult<Export> => {
  return new ReaderEither(e => {
    const p = vd.getParent()
    if (p) {
      const pp = p.getParent()
      if (pp) {
        const vs: VariableStatement = pp
        const annotation = getAnnotation(vs.getJsDocs())
        if (isFunc(annotation)) {
          const name = vd.getName()
          const since = getSince(annotation)
          if (since.isNone()) {
            return ko(new SinceMissing(e.currentModuleName, name))
          } else {
            const description = fromJSDocDescription(annotation.description)
            const signature = getFunctionVariableDeclarationSignature(vd)
            const example = getExample(annotation)
            const deprecated = getDeprecated(annotation)
            const alias = getAlias(annotation)
            const loc = location(getPath(e.currentModuleName), vd.getStartLineNumber(), vd.getEndLineNumber())
            return ok(func(name, signature, description, alias, since.value, example, deprecated, loc))
          }
        }
      }
    }
    return notFound
  })
}

const getTypeclassInterfaceSignature = (id: InterfaceDeclaration): string => {
  return id.getText()
}

const parseTypeclassInterface = (id: InterfaceDeclaration): ParseResult<Export> => {
  return new ReaderEither(e => {
    const annotation = getAnnotation(id.getJsDocs())
    if (isTypeclass(annotation)) {
      const name = id.getName()
      const since = getSince(annotation)
      if (since.isNone()) {
        return ko(new SinceMissing(e.currentModuleName, name))
      } else {
        const signature = getTypeclassInterfaceSignature(id)
        const description = fromJSDocDescription(annotation.description)
        const deprecated = getDeprecated(annotation)
        const loc = location(getPath(e.currentModuleName), id.getStartLineNumber(), id.getEndLineNumber())
        return ok(typeClass(name, signature, description, since.value, deprecated, loc))
      }
    }
    return notFound
  })
}

const getInterfaceSignature = (id: InterfaceDeclaration): string => {
  return id.getText().substring('export '.length)
}

const parseInterface = (id: InterfaceDeclaration): ParseResult<Export> => {
  return new ReaderEither(e => {
    const annotation = getAnnotation(id.getJsDocs())
    if (isInterface(annotation)) {
      const name = id.getName()
      const since = getSince(annotation)
      if (since.isNone()) {
        return ko(new SinceMissing(e.currentModuleName, name))
      } else {
        const signature = getInterfaceSignature(id)
        const description = fromJSDocDescription(annotation.description)
        const loc = location(getPath(e.currentModuleName), id.getStartLineNumber(), id.getEndLineNumber())
        return ok(inter(name, signature, description, since.value, loc))
      }
    }
    return notFound
  })
}

const getFunctionDeclarationSignature = (fd: FunctionDeclaration): string => {
  const text = fd.getText()
  const end = text.indexOf('{')
  return `${text.substring(0, end === -1 ? text.length : end)} { ... }`
}

const parseFunctionDeclaration = (fd: FunctionDeclaration): ParseResult<Export> => {
  return new ReaderEither(e => {
    const overloads = fd.getOverloads()
    const annotation = overloads.length === 0 ? getAnnotation(fd.getJsDocs()) : getAnnotation(overloads[0].getJsDocs())
    if (isFunc(annotation)) {
      const name = fd.getName()
      if (typeof name === 'undefined') {
        return ko(new NameMissing(e.currentModuleName))
      }
      const since = getSince(annotation)
      if (since.isNone()) {
        return ko(new SinceMissing(e.currentModuleName, name))
      } else {
        const signature = getFunctionDeclarationSignature(fd)
        const description = fromJSDocDescription(annotation.description)
        const example = getExample(annotation)
        const deprecated = getDeprecated(annotation)
        const loc = location(getPath(e.currentModuleName), fd.getStartLineNumber(), fd.getEndLineNumber())
        return ok(func(name, signature, description, none, since.value, example, deprecated, loc))
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
  const eitherConstantVariableDeclarationExports = sf
    .getVariableDeclarations()
    .map(vd => parseConstantVariableDeclaration(vd).run(e))
  const eitherFunctionDeclarationExports = sf.getFunctions().map(f => parseFunctionDeclaration(f).run(e))
  const eitherTypeClasses = sf.getInterfaces().map(i => parseTypeclassInterface(i).run(e))
  const eitherInterfaces = sf.getInterfaces().map(i => parseInterface(i).run(e))

  const eitherExports = eitherTypeAliasesExports
    .concat(eitherClassExports)
    .concat(eitherFunctionVariableDeclarationExports)
    .concat(eitherInstanceVariableDeclarationExports)
    .concat(eitherConstantVariableDeclarationExports)
    .concat(eitherFunctionDeclarationExports)
    .concat(eitherTypeClasses)
    .concat(eitherInterfaces)

  const errors = flatten(lefts(eitherExports)).filter(error => !isNotFound(error))

  if (errors.length > 0) {
    return kos(errors)
  }

  const exports = rights(eitherExports)
  return ok(new Module(e.currentModuleName, exports, getPath(e.currentModuleName)))
})

const getPath = (name: string): string => {
  return `https://github.com/gcanti/fp-ts/blob/master/src/${name}.ts`
}
