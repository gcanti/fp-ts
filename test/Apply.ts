import * as E from '../src/Either'
import { pipe } from '../src/function'
import * as IE from '../src/IOEither'
import { deepStrictEqual } from './util'

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
  deepStrictEqual(pipe(a, IE.apFirst(b))(), E.right('a'))
  deepStrictEqual(log, ['a', 'b'])
})
