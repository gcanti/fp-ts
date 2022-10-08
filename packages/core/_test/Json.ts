import { pipe } from '@fp-ts/core/Function'
import * as _ from '@fp-ts/core/Json'
import * as E from '@fp-ts/core/Result'
import * as U from '@fp-ts/core/test/util'

describe('Json', () => {
  it('parse', () => {
    U.deepStrictEqual(pipe('{"a":1}', _.parse), E.succeed({ a: 1 }))
    U.deepStrictEqual(pipe('{"a":}', _.parse), E.fail(new SyntaxError('Unexpected token } in JSON at position 5')))
  })

  it('stringify', () => {
    U.deepStrictEqual(pipe({ a: 1 }, _.stringify), E.succeed('{"a":1}'))
    const circular: any = { ref: null }
    circular.ref = circular
    U.deepStrictEqual(
      pipe(
        circular,
        _.stringify,
        E.mapError((e) => (e as Error).message.includes('Converting circular structure to JSON'))
      ),
      E.fail(true)
    )
    type Person = {
      readonly name: string
      readonly age: number
    }
    const person: Person = { name: 'Giulio', age: 45 }
    U.deepStrictEqual(pipe(person, _.stringify), E.succeed('{"name":"Giulio","age":45}'))

    U.deepStrictEqual(_.stringify(undefined as any), E.fail(new Error('Converting unsupported structure to JSON')))
  })
})
