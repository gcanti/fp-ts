import * as O from '../../dist/es6/Option'
import * as E from '../../dist/lib/Either'

console.log(E.fromOption(() => new Error('error'))(O.some('value'))) // tslint:disable-line no-console
