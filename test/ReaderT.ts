import * as assert from 'assert'
import { none, option, some } from '../src/Option'
import { reader } from '../src/Reader'
import { fromReader, getReaderT } from '../src/ReaderT'
import { StrMap, lookup } from '../src/StrMap'

const readerOption = getReaderT(option)

describe('ReaderT', () => {
  it('fromState', () => {
    const f = fromReader(option)(reader.of<void, number>(1))
    assert.deepEqual(f(undefined), some(1))
  })

  it('ReaderOption', () => {
    function configure(key: string) {
      return (e: StrMap<string>) => lookup(key, e)
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

    assert.deepEqual(setupConnection(goodConfig), some(['myhost', 'giulio', 'password']))

    const badConfig = new StrMap({
      host: 'myhost',
      user: 'giulio'
    })

    assert.deepEqual(setupConnection(badConfig), none)
  })
})
