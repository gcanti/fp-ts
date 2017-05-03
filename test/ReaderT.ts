import * as option from '../src/Option'
import { Dictionary, lookup } from '../src/Dictionary'
import { ReaderT } from '../src/ReaderT'
import { Kleisli } from '../src/function'
import { eqOptions as eq } from './helpers'

describe('ReaderT', () => {

  it('ReaderOption', () => {

    class ReaderTOption<E, A> extends ReaderT<option.URI, E, A> {
      constructor(value: Kleisli<option.URI, E, A>) {
        super(option, value)
      }
    }

    function configure(key: string): ReaderTOption<Dictionary<string>, string> {
      return new ReaderTOption((e: Dictionary<string>) => lookup(key, e))
    }

    const setupConnection = configure('host').chain(host => {
      return configure('user').chain(user => {
        return configure('password').map(password => [host, user, password] as [string, string, string])
      })
    })

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
