import * as option from '../src/Option'
import { Dictionary, lookup } from '../src/Dictionary'
import { getStaticReaderT } from '../src/ReaderT'
import * as reader from '../src/Reader'
import { eqOptions as eq } from './helpers'

export type ReaderTOption<E, A> = reader.Reader<E, option.Option<A>>

const readerOption = getStaticReaderT(option)

describe('ReaderT', () => {

  it('ReaderOption', () => {

    function configure(key: string): ReaderTOption<Dictionary<string>, string> {
      return new reader.Reader((e: Dictionary<string>) => lookup(key, e))
    }

    const setupConnection = readerOption.chain(host => {
      return readerOption.chain(user => {
        return readerOption.map(password => [host, user, password] as [string, string, string], configure('password'))
      }, configure('user'))
    }, configure('host'))

    const goodConfig = {
      host: 'myhost',
      user: 'giulio',
      password: 'password'
    }

    eq(setupConnection.run(goodConfig), option.some(['myhost', 'giulio', 'password']))

    const badConfig = {
      host: 'myhost',
      user: 'giulio'
    }

    eq(setupConnection.run(badConfig), option.none)

  })

})
