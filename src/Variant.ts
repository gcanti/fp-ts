/**
 * ```ts
 * type Tagged<Tag, A> = {_tag: Tag, value: A}
 * ```
 *
 * is a type for a tagged value which when used together in a union can represent a Variant type
 * (aka sum type / discriminated union).
 *
 * Variant types are dual to Record types. Unlike Record types which have multiple keys all of which have to be provided,
 * a value of a Variant type represents one of a number of cases.
 *
 * The most common thing we want to do with Variant Types is pattern match on the case;
 * Given a record of functions, one for each case, we can use the function `caseOf` to pattern match
 * a value of a Variant and apply the function for the correct case.
 *
 * @example
 *
 * import * as variant from "fp-ts/Variant"
 * import { pipe } from "fp-ts/function"
 *
 * type Media =
 *   | variant.Tagged<"book", number>
 *   | variant.Tagged<"film", string>
 *   | variant.Tagged<"song", string>
 *
 * const Media = variant.module<Media>({
 *   book: (value: number) => variant.tagged(_book, value),
 *   film: (value: string) => variant.tagged(_film, value),
 *   song: (value: string) => variant.tagged(_song, value),
 * })
 *
 * const _book = "book"
 * const _film = "film"
 * const _song = "song"
 *
 * const exampleBook = Media.book(123)
 * const exampleFilm = Media.film("Harry Potter")
 *
 * const isBook: (media: Media) => boolean = (media) =>
 *   pipe(
 *     media,
 *     variant.caseOfWithDefault(false)({
 *       [_book]: () => true,
 *     })
 *   )
 *
 * assert.deepStrictEqual(isBook(exampleBook), true)
 * assert.deepStrictEqual(isBook(exampleFilm), false)
 *
 * @since 2.12.4
 */

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

const tagFieldName = '_tag'
const valueFieldName = 'value'

/**
 * A type which represents a case in a variant
 * @category model
 * @since 2.12.4
 */
export type Tagged<Tag extends number | symbol | string, A> = {
  [tagFieldName]: Tag
  [valueFieldName]: A
}

/**
 * Type constructor of a variant type from the dual record type
 * @category model
 * @since 2.12.4
 */
export type Variant<Map extends { [key: string]: any }> = {
  [Key in keyof Map]: Tagged<Key, Map[Key]>
}[keyof Map]

/**
 * Type constructor of a record type from the dual variant type
 * @category model
 * @since 2.12.4
 */
export type Map<Variant extends Tagged<string, any>> = {
  [Key in Variant[typeof tagFieldName]]: (Variant & {
    [tagFieldName]: Key
  })[typeof valueFieldName]
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * Constructs a value of a Variant with the given tag
 * @category constructors
 * @since 2.12.4
 */
export function tagged<Tag extends string, A>(tag: Tag, value: A): Tagged<Tag, A> {
  return { [tagFieldName]: tag, [valueFieldName]: value }
}

/**
 * Groups together all the variant constructors in a "module"
 * @category constructors
 * @since 2.12.4
 */
export function module<Variant extends Tagged<string, any>>(constructors: Module<Variant>): Module<Variant> {
  return constructors
}

/**
 * The type of the "Module" constructed in the above function
 * @category constructors
 * @since 2.12.4
 */
export type Module<Variant extends Tagged<string, any>> = {
  [Key in keyof Map<Variant>]: (value: Map<Variant>[Key]) => Variant
}

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * Pattern matching on a variant where all cases are provided
 * @category destructors
 * @since 2.12.4
 */
export function caseOf<Variant extends Tagged<string, any>, A>(cases: Cases<Variant, A>): (variant: Variant) => A {
  return (variant) => match(variant)(cases)
}

/**
 * Pattern matching on a variant where all cases are provided, with arguments swapped
 * @category destructors
 * @since 2.12.4
 */
export function match<Variant extends Tagged<string, any>>(variant: Variant): <A>(cases: Cases<Variant, A>) => A {
  return (cases) => (cases as Record<string, any>)[variant[tagFieldName]](variant[valueFieldName])
}

/**
 * Pattern matching on a variant with a default case
 * @category destructors
 * @since 2.12.4
 */
export function caseOfWithDefault<A>(
  defaultValue: A
): <Variant extends Tagged<string, any>>(partialCases: Partial<Cases<Variant, A>>) => (variant: Variant) => A {
  return (partialCases) => (variant) => matchWithDefault(variant)(defaultValue)(partialCases)
}

/**
 * Pattern matching on a variant with a default case, with arguments swapped
 * @category destructors
 * @since 2.12.4
 */
export function matchWithDefault<Variant extends Tagged<string, any>>(
  variant: Variant
): <A>(defaultValue: A) => (partialCases: Partial<Cases<Variant, A>>) => A {
  return (defaultValue) => (partialCases) => {
    const caseFunction = (partialCases as Record<string, any>)[variant[tagFieldName]]
    return caseFunction ? caseFunction(variant[valueFieldName]) : defaultValue
  }
}

// -------------------------------------------------------------------------------------
// Type helpers
// -------------------------------------------------------------------------------------

/**
 * Type of the record supplied for pattern matching
 * @category model
 * @since 2.12.4
 */
export type Cases<Variant extends Tagged<string, any>, A> = {
  [Key in keyof Map<Variant>]: (value: Map<Variant>[Key]) => A
}

/**
 * Type of the pattern matching function, isomorphic to the variant type
 * @category model
 * @since 2.12.4
 */
export type Match<Variant extends Tagged<string, any>, A> = (cases: Cases<Variant, A>) => A

/**
 * Type of the tags of a variant
 * @category model
 * @since 2.12.4
 */
export type TagsOf<Variant extends Tagged<string, any>> = keyof Map<Variant>

/**
 * Type of the variant at a particular tag.
 * @category model
 * @since 2.12.4
 */
export type TypeForTag<Variant extends Tagged<string, any>, Key extends keyof Map<Variant>> = Map<Variant>[Key]
