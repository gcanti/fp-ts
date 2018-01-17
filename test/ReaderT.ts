import * as assert from 'assert'
import * as option from '../src/Option'
import { StrMap, lookup } from '../src/StrMap'
import { getReaderT } from '../src/ReaderT'

const readerOption = getReaderT(option)

describe('ReaderT', () => {
  it('ReaderOption', () => {
    function configure(key: string) {
      return (e: StrMap<string>) => lookup(key)(e)
    }

    const setupConnection = readerOption.chain(host => {
      return readerOption.chain(user => {
        return readerOption.map(password => [host, user, password] as [string, string, string], configure('password'))
      }, configure('user'))
    }, configure('host'))

    const goodConfig = new StrMap({
      host: 'myhost',
      user: 'giulio',
      password: 'password'
    })

    assert.deepEqual(setupConnection(goodConfig), option.some(['myhost', 'giulio', 'password']))

    const badConfig = new StrMap({
      host: 'myhost',
      user: 'giulio'
    })

    assert.deepEqual(setupConnection(badConfig), option.none)
  })
})
