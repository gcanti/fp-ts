// ## type

const tagFieldName = "_tag"
const valueFieldName = "value"

export type Tagged<Tag extends number | symbol | string, A> = {
  [tagFieldName]: Tag
  [valueFieldName]: A
}

export function tagged<Tag extends string, A>(
  tag: Tag,
  value: A
): Tagged<Tag, A> {
  return { [tagFieldName]: tag, [valueFieldName]: value }
}

export type Variant<Map extends { [key: string]: any }> = {
  [Key in keyof Map]: Tagged<Key, Map[Key]>
}[keyof Map]

export type Map<Variant extends Tagged<string, any>> = {
  [Key in Variant[typeof tagFieldName]]: (Variant & {
    [tagFieldName]: Key
  })[typeof valueFieldName]
}

// ## module

// This is the same as type Module<Variant extends Tagged<string, any>> = Cases<Variant, Variant>;
// but writing it inline to give better type descriptions
export type Module<Variant extends Tagged<string, any>> = {
  [Key in keyof Map<Variant>]: (value: Map<Variant>[Key]) => Variant
}

// this is an identity function that just exists to give better type descriptions
export function module<Variant extends Tagged<string, any>>(
  constructors: Module<Variant>
): Module<Variant> {
  return constructors
}

// arguments are split to allow partial type inference
// Note this function is only type safe with a true variant, not the super type Tagged<string, any>

export function caseOf<Variant extends Tagged<string, any>, A>(
  cases: Cases<Variant, A>
): (variant: Variant) => A {
  return (variant) => match(variant)(cases)
}

export function match<Variant extends Tagged<string, any>>(
  variant: Variant
): <A>(cases: Cases<Variant, A>) => A {
  return (cases) =>
    (cases as Record<string, any>)[variant[tagFieldName]](
      variant[valueFieldName]
    )
}

export function caseOfWithDefault<A>(
  defaultValue: A
): <Variant extends Tagged<string, any>>(
  partialCases: Partial<Cases<Variant, A>>
) => (variant: Variant) => A {
  return (partialCases) => (variant) =>
    matchWithDefault(variant)(defaultValue)(partialCases)
}

export function matchWithDefault<Variant extends Tagged<string, any>>(
  variant: Variant
): <A>(defaultValue: A) => (partialCases: Partial<Cases<Variant, A>>) => A {
  return (defaultValue) => (partialCases) => {
    const caseFunction = (partialCases as Record<string, any>)[
      variant[tagFieldName]
    ]
    return caseFunction ? caseFunction(variant[valueFieldName]) : defaultValue
  }
}

export type Cases<Variant extends Tagged<string, any>, A> = {
  [Key in keyof Map<Variant>]: (value: Map<Variant>[Key]) => A
}

// this is isomorphic to the variant type
export type Match<Variant extends Tagged<string, any>, A> = (
  cases: Cases<Variant, A>
) => A

export type TagsOf<Variant extends Tagged<string, any>> = keyof Map<Variant>

export type TypeForTag<
  Variant extends Tagged<string, any>,
  Key extends keyof Map<Variant>
> = Map<Variant>[Key]
