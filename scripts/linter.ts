import * as ast from 'ts-morph'
import * as O from '../src/Option'
import { pipe } from '../src/function'
import * as RA from '../src/ReadonlyArray'
import * as RNEA from '../src/ReadonlyNonEmptyArray'
import * as string from '../src/string'
import * as path from 'path'
import * as glob from 'glob'

// -------------------------------------------------------------------------------------
// domain
// -------------------------------------------------------------------------------------

export interface TypeReference {
  readonly _tag: 'TypeReference'
  readonly name: string
}

export interface TypeParameterDeclaration {
  readonly _tag: 'TypeParameterDeclaration'
  readonly name: string
  readonly constraint: O.Option<Type>
}

export interface Constructor {
  readonly _tag: 'Constructor'
  readonly name: string
  readonly typeArguments: RNEA.ReadonlyNonEmptyArray<Type>
}

export interface FunctionType {
  readonly _tag: 'FunctionType'
  readonly typeParameters: ReadonlyArray<string>
  readonly parameters: ReadonlyArray<Type>
  readonly returnType: Type
}

export interface TypeOperator {
  readonly _tag: 'TypeOperator'
  readonly type: Type
}

export interface MappedType {
  readonly _tag: 'MappedType'
  readonly typeParameter: Type
  readonly type: Type
}

export interface UnionType {
  readonly _tag: 'UnionType'
  readonly members: ReadonlyArray<Type>
}

export interface ConditionalType {
  readonly _tag: 'ConditionalType'
  readonly checkType: Type
  readonly extendsType: Type
  readonly trueType: Type
  readonly falseType: Type
}

export interface IndexedAccessType {
  readonly _tag: 'IndexedAccessType'
  readonly objectType: Type
  readonly indexType: Type
}

export interface TupleType {
  readonly _tag: 'TupleType'
  readonly elements: ReadonlyArray<Type>
}

export interface RestType {
  readonly _tag: 'RestType'
  readonly type: Type
}

export interface LiteralType {
  readonly _tag: 'LiteralType'
}

export interface Token {
  readonly _tag: 'Token'
}

export interface Overloads {
  readonly _tag: 'Overloads'
  readonly members: ReadonlyArray<Type>
}

export interface IntersectionType {
  readonly _tag: 'IntersectionType'
  readonly members: ReadonlyArray<Type>
}

export type Type =
  | TypeReference
  | TypeParameterDeclaration
  | Constructor
  | FunctionType
  | TypeOperator
  | MappedType
  | UnionType
  | ConditionalType
  | IndexedAccessType
  | TupleType
  | RestType
  | LiteralType
  | Token
  | Overloads
  | IntersectionType

export interface FunctionDeclaration {
  readonly name: string
  readonly overloads: ReadonlyArray<FunctionType>
}

export interface File {
  readonly path: string
  readonly functions: ReadonlyArray<FunctionDeclaration>
}

export interface Comparison {
  readonly path: string
  readonly typeParameters: ReadonlyArray<string>
  readonly parameters: ReadonlyArray<string>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

export const typeReference = (name: string): Type => ({ _tag: 'TypeReference', name })

export const typeParameterDeclaration = (name: string, constraint: O.Option<Type>): Type => ({
  _tag: 'TypeParameterDeclaration',
  name,
  constraint
})

export const constructor = (name: string, typeArguments: RNEA.ReadonlyNonEmptyArray<Type>): Type => ({
  _tag: 'Constructor',
  name,
  typeArguments
})

export const functionType = (
  typeParameters: ReadonlyArray<string>,
  parameters: ReadonlyArray<Type>,
  returnType: Type
): FunctionType => ({
  _tag: 'FunctionType',
  typeParameters,
  parameters,
  returnType
})

export const typeOperator = (type: Type): Type => ({ _tag: 'TypeOperator', type })

export const mappedType = (typeParameter: Type, type: Type): Type => ({
  _tag: 'MappedType',
  typeParameter,
  type
})

export const unionType = (members: ReadonlyArray<Type>): Type => ({ _tag: 'UnionType', members })

export const conditionalType = (checkType: Type, extendsType: Type, trueType: Type, falseType: Type): Type => ({
  _tag: 'ConditionalType',
  checkType,
  extendsType,
  trueType,
  falseType
})

export const indexedAccessType = (objectType: Type, indexType: Type): Type => ({
  _tag: 'IndexedAccessType',
  objectType,
  indexType
})

export const tupleType = (elements: ReadonlyArray<Type>): Type => ({ _tag: 'TupleType', elements })

export const restType = (type: Type): Type => ({ _tag: 'RestType', type })

export const literalType: Type = { _tag: 'LiteralType' }

export const token: Type = { _tag: 'Token' }

export const overloads = (members: ReadonlyArray<Type>): Type => ({ _tag: 'Overloads', members })

export const intersectionType = (members: ReadonlyArray<Type>): Type => ({ _tag: 'IntersectionType', members })

export const functionDeclaration = (name: string, overloads: ReadonlyArray<FunctionType>): FunctionDeclaration => ({
  name,
  overloads
})

export const comparison = (
  path: string,
  typeParameters: ReadonlyArray<string>,
  parameters: ReadonlyArray<string>
): Comparison => ({
  path,
  typeParameters,
  parameters
})

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

export const match = <R>(on: {
  onReference: (name: string) => R
  onTypeParameterDeclaration: (name: string, constraint: O.Option<Type>) => R
  onConstructor: (name: string, typeArguments: RNEA.ReadonlyNonEmptyArray<Type>) => R
  onFunctionType: (typeParameters: ReadonlyArray<string>, parameters: ReadonlyArray<Type>, returnType: Type) => R
  onTypeOperator: (type: Type) => R
  onMappedType: (typeParameter: Type, type: Type) => R
  onUnionType: (members: ReadonlyArray<Type>) => R
  onConditionalType: (checkType: Type, extendsType: Type, trueType: Type, falseType: Type) => R
  onIndexedAccessType: (objectType: Type, indexType: Type) => R
  onTupleType: (elements: ReadonlyArray<Type>) => R
  onRestType: (type: Type) => R
  onLiteralType: () => R
  onToken: () => R
  onOverloads: (members: ReadonlyArray<Type>) => R
  onIntersectionType: (members: ReadonlyArray<Type>) => R
}) => (type: Type): R => {
  switch (type._tag) {
    case 'TypeReference':
      return on.onReference(type.name)
    case 'TypeParameterDeclaration':
      return on.onTypeParameterDeclaration(type.name, type.constraint)
    case 'Constructor':
      return on.onConstructor(type.name, type.typeArguments)
    case 'FunctionType':
      return on.onFunctionType(type.typeParameters, type.parameters, type.returnType)
    case 'TypeOperator':
      return on.onTypeOperator(type.type)
    case 'MappedType':
      return on.onMappedType(type.typeParameter, type.type)
    case 'UnionType':
      return on.onUnionType(type.members)
    case 'ConditionalType':
      return on.onConditionalType(type.checkType, type.extendsType, type.trueType, type.falseType)
    case 'IndexedAccessType':
      return on.onIndexedAccessType(type.objectType, type.indexType)
    case 'TupleType':
      return on.onTupleType(type.elements)
    case 'RestType':
      return on.onRestType(type.type)
    case 'LiteralType':
      return on.onLiteralType()
    case 'Token':
      return on.onToken()
    case 'Overloads':
      return on.onOverloads(type.members)
    case 'IntersectionType':
      return on.onIntersectionType(type.members)
  }
}

// -------------------------------------------------------------------------------------
// parsers
// -------------------------------------------------------------------------------------

export const parseType = (
  node: ast.ts.TypeNode | ast.ts.TypeParameterDeclaration | ast.ts.CallSignatureDeclaration
): Type => {
  if (ast.ts.isTypeReferenceNode(node)) {
    const name = node.typeName.getText()
    return pipe(
      node.typeArguments,
      O.fromNullable,
      O.map(
        RA.match(
          () => typeReference(name),
          (typeArguments) => constructor(name, pipe(typeArguments, RNEA.map(parseType)))
        )
      ),
      O.getOrElse(() => typeReference(name))
    )
  }
  if (ast.ts.isTypeParameterDeclaration(node)) {
    return typeParameterDeclaration(node.name.getText(), pipe(node.constraint, O.fromNullable, O.map(parseType)))
  }
  if (ast.ts.isFunctionTypeNode(node) || ast.ts.isCallSignatureDeclaration(node)) {
    return parseFunctionTypeNode(node)
  }
  if (ast.ts.isTypeOperatorNode(node)) {
    return typeOperator(parseType(node.type))
  }
  if (ast.ts.isMappedTypeNode(node)) {
    return mappedType(parseType(node.typeParameter), parseType(node.type!))
  }
  if (ast.ts.isUnionTypeNode(node)) {
    return unionType(pipe(node.types, RA.map(parseType)))
  }
  if (ast.ts.isConditionalTypeNode(node)) {
    return conditionalType(
      parseType(node.checkType),
      parseType(node.extendsType),
      parseType(node.trueType),
      parseType(node.falseType)
    )
  }
  if (ast.ts.isIndexedAccessTypeNode(node)) {
    return indexedAccessType(parseType(node.objectType), parseType(node.indexType))
  }
  if (ast.ts.isTupleTypeNode(node)) {
    return tupleType(pipe(node.elements, RA.map(parseType)))
  }
  if (ast.ts.isRestTypeNode(node)) {
    return restType(parseType(node.type))
  }
  if (ast.ts.isLiteralTypeNode(node)) {
    return literalType
  }
  if (ast.ts.isToken(node)) {
    return token
  }
  if (ast.ts.isTypeLiteralNode(node)) {
    const members = node.members.filter(ast.ts.isCallSignatureDeclaration)
    return overloads(pipe(members, RA.map(parseType)))
  }
  if (ast.ts.isNamedTupleMember(node)) {
    return parseType(node.type)
  }
  if (ast.ts.isTypePredicateNode(node)) {
    return parseType(node.type!)
  }
  if (ast.ts.isIntersectionTypeNode(node)) {
    return unionType(pipe(node.types, RA.map(parseType)))
  }
  throw new Error(`not sure what to do with ${node.getText()}`)
}

export const parseParameters: (
  pds: ReadonlyArray<ast.ts.ParameterDeclaration>
) => ReadonlyArray<Type> = RA.filterMap((pd) => pipe(pd.type, O.fromNullable, O.map(parseType)))

const ensureReadonlyArray = <A>(as: ReadonlyArray<A> | undefined): ReadonlyArray<A> => (as ? as : RA.empty)

export const parseFunctionTypeNode = (ftn: ast.ts.FunctionTypeNode | ast.ts.CallSignatureDeclaration): Type =>
  functionType(
    pipe(
      ensureReadonlyArray(ftn.typeParameters),
      RA.map((tpd) => tpd.name.getText())
    ),
    pipe(
      ftn.parameters,
      RA.map((pd) => parseType(pd.type!))
    ),
    parseType(ftn.type!)
  )

export const parseFunctionDeclaration = (fd: ast.ts.FunctionDeclaration): FunctionType =>
  functionType(
    pipe(
      ensureReadonlyArray(fd.typeParameters),
      RA.map((tpd) => tpd.name.getText())
    ),
    pipe(
      fd.parameters,
      RA.map((pd) => parseType(pd.type!))
    ),
    parseType(fd.type!)
  )

export const parseFile = (src: ast.SourceFile): File => {
  const basename = path.basename(src.getFilePath())
  try {
    return {
      path: basename,
      functions: pipe(
        src.getFunctions(),
        RA.map((fd) =>
          functionDeclaration(
            fd.getName()!,
            pipe(
              [...fd.getOverloads(), fd],
              // [fd.getOverloads()[0]], // fixme
              RA.map((o) => parseFunctionDeclaration(o.compilerNode))
            )
          )
        )
      )
    }
  } catch (e: unknown) {
    throw new Error(`in ${basename} ${String(e)}`)
  }
}

// -------------------------------------------------------------------------------------
// linters
// -------------------------------------------------------------------------------------

export const getAllTypeParameters = (types: ReadonlyArray<Type>): ReadonlyArray<string> =>
  pipe(types, RA.chain(getTypeParameters))

export const getConstraintTypeParameters = (o: O.Option<Type>): ReadonlyArray<string> =>
  pipe(
    o,
    O.map(getTypeParameters),
    O.getOrElse<ReadonlyArray<string>>(() => RA.empty)
  )

export const getTypeParameters = (type: Type): ReadonlyArray<string> =>
  pipe(
    type,
    match({
      onReference: (_name) => RA.empty,
      onTypeParameterDeclaration: (name, constraint) =>
        pipe([name], RA.concat(getConstraintTypeParameters(constraint))),
      onConstructor: (_name, typeArguments) => getAllTypeParameters(typeArguments),
      onFunctionType: (typeParameters, parameters, returnType) =>
        pipe(typeParameters, RA.concat(getAllTypeParameters(parameters)), RA.concat(getTypeParameters(returnType))),
      onTypeOperator: (type) => getTypeParameters(type),
      onMappedType: (typeParameter, type) => pipe(getTypeParameters(typeParameter), RA.concat(getTypeParameters(type))),
      onUnionType: (members) => getAllTypeParameters(members),
      onConditionalType: (checkType, extendType, trueType, falseType) =>
        pipe(
          getTypeParameters(checkType),
          RA.concat(getTypeParameters(extendType)),
          RA.concat(getTypeParameters(trueType)),
          RA.concat(getTypeParameters(falseType))
        ),
      onIndexedAccessType: (objectType, indexType) =>
        pipe(getTypeParameters(objectType), RA.concat(getTypeParameters(indexType))),
      onTupleType: (elements) => getAllTypeParameters(elements),
      onRestType: (type) => getTypeParameters(type),
      onLiteralType: () => RA.empty,
      onToken: () => RA.empty,
      onOverloads: (members) => getAllTypeParameters(members),
      onIntersectionType: (members) => getAllTypeParameters(members)
    })
  )

export const getAllTypeArguments = (types: ReadonlyArray<Type>): ReadonlyArray<string> =>
  pipe(types, RA.chain(getTypeArguments))

export const getConstraintTypeArguments = (o: O.Option<Type>): ReadonlyArray<string> =>
  pipe(
    o,
    O.map(getTypeArguments),
    O.getOrElse<ReadonlyArray<string>>(() => RA.empty)
  )

export const getTypeArguments = (type: Type): ReadonlyArray<string> =>
  pipe(
    type,
    match({
      onReference: (name) => [name],
      onTypeParameterDeclaration: (_name, constraint) => getConstraintTypeArguments(constraint),
      onConstructor: (_name, typeArguments) => getAllTypeArguments(typeArguments),
      onFunctionType: (_typeParameters, parameters, returnType) =>
        pipe(getAllTypeArguments(parameters), RA.concat(getTypeArguments(returnType))),
      onTypeOperator: getTypeArguments,
      onMappedType: (_typeParameter, type) => getTypeArguments(type),
      onUnionType: (members) => getAllTypeArguments(members),
      onConditionalType: (checkType, extendsType, trueType, falseType) =>
        pipe(
          getTypeArguments(checkType),
          RA.concat(getTypeArguments(extendsType)),
          RA.concat(getTypeArguments(trueType)),
          RA.concat(getTypeArguments(falseType))
        ),
      onIndexedAccessType: (objectType, indexType) =>
        pipe(getTypeArguments(objectType), RA.concat(getTypeArguments(indexType))),
      onTupleType: (elements) => getAllTypeArguments(elements),
      onRestType: (type) => getTypeArguments(type),
      onLiteralType: () => RA.empty,
      onToken: () => RA.empty,
      onOverloads: (members) => getAllTypeArguments(members),
      onIntersectionType: (members) => getAllTypeArguments(members)
    })
  )

export const getComparison = (path: string, ft: FunctionType): Comparison =>
  comparison(path, getTypeParameters(ft), getTypeArguments(ft))

export const eq = RA.getEq(string.Eq)

export const uniq = RA.uniq(string.Eq)

export const intersection = RA.intersection(string.Eq)

export const lintFunctionType = (path: string, ft: FunctionType): ReadonlyArray<string> => {
  const c = getComparison(path, ft)
  const parameters = pipe(c.parameters, uniq, intersection(c.typeParameters))
  if (!pipe(c.typeParameters, eq.equals(parameters))) {
    return [`Type Parameter Order Error in ${path}: ${c.typeParameters.join(', ')} !== ${parameters.join(', ')}`]
  }
  return RA.empty
}

export const lintFile = (file: File): ReadonlyArray<string> =>
  pipe(
    file.functions,
    RA.chain((fd) =>
      pipe(
        fd.overloads,
        RA.chainWithIndex((i, ft) => lintFunctionType(`${file.path}/${fd.name}/${i}`, ft))
      )
    )
  )

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
paths.forEach((path) => project.addSourceFileAtPath(path))
const files = pipe(project.getSourceFiles(), RA.map(parseFile))
const errors = pipe(files, RA.chain(lintFile))
console.log(JSON.stringify(errors, null, 2))

// project.addSourceFileAtPath('src/Apply.ts')
// export const file = parseFile(project.getSourceFiles()[0])
// // console.log(JSON.stringify(file, null, 2))
// console.log(JSON.stringify(lintFile(file), null, 2))
