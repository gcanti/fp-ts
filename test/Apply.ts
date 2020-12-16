import * as assert from 'assert'
import { pipe } from '../src/function'
import * as IE from '../src/IOEither'
import * as E from '../src/Either'

it('apFirst_', () => {
  // tslint:disable-next-line: readonly-array
  const log: Array<string> = []
  const a = IE.rightIO<string, string>(() => {
    const out = 'a'
    log.push(out)
    return out
  })
  const b = IE.rightIO<string, string>(() => {
    const out = 'b'
    log.push(out)
    return out
  })
  assert.deepStrictEqual(pipe(a, IE.apFirst(b))(), E.right('a'))
  assert.deepStrictEqual(log, ['a', 'b'])
})
