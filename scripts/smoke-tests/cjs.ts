import * as O from '../../dist/lib/Option'
import * as E from '../../dist/lib/Either'

console.log(E.fromOption(() => new Error('error'))(O.some('value'))) // tslint:disable-line no-console
