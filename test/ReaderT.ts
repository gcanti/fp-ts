import * as option from '../src/Option'
import { Dictionary, lookup } from '../src/Dictionary'
import { getReaderT } from '../src/ReaderT'
import { eqOptions as eq } from './helpers'

export type ReaderTOption<E, A> = (e: E) => option.Option<A>

declare module '../src/HKT' {
  interface HKT<A, U> {
    'Kleisli<Option, E, A>': (u: U) => option.Option<A>
  }
}

const readerTOption = getReaderT('Kleisli<Option, E, A>', option)

describe('ReaderT', () => {
  it('ReaderOption', () => {
    function configure(key: string): ReaderTOption<Dictionary<string>, string> {
      return (e: Dictionary<string>) => lookup(key, e)
    }

    const setupConnection = readerTOption.chain(host => {
      return readerTOption.chain(user => {
        return readerTOption.map(password => [host, user, password] as [string, string, string], configure('password'))
      }, configure('user'))
    }, configure('host'))

    const goodConfig = {
      host: 'myhost',
      user: 'giulio',
      password: 'password'
    }

    eq(setupConnection(goodConfig), option.some(['myhost', 'giulio', 'password']))

    const badConfig = {
      host: 'myhost',
      user: 'giulio'
    }

    eq(setupConnection(badConfig), option.none)
  })
})
