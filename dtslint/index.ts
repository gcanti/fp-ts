import * as _ from '../src/HKT'
import * as T from '../src/Task'

// issue #536
export function testIssue536<F extends _.URIS, G extends _.URIS, A>(x: _.Kind<F, A>): _.Kind<G, A> {
  // @ts-expect-error
  return x
}

export const testURI = <F extends _.URIS>(ma: T.Task<number>): _.Kind<F, number> => {
  // @ts-expect-error
  return ma
}

// @ts-expect-error
export type HKT1 = _.Kind<'a', string>

export type Tuple<E, A> = readonly [A, E]
