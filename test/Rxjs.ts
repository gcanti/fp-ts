import * as assert from 'assert'
import * as Rx from 'rxjs'

import {
  of,
  map,
  ap,
  chain
} from '../src/Rxjs'

describe('Rxjs', () => {

  it('of', () => {
    const fa = of(1)
    return new Promise((resolve, reject) => {
      fa.bufferTime(10).take(1).subscribe(events => {
        try {
          assert.deepEqual(events, [1])
          resolve()
        } catch (e) {
          reject(e)
        }
      })
    })
  })

  it('map', () => {
    const fa = Rx.Observable.from([1, 2, 3])
    const double = (n: number): number => n * 2
    const fb = map(double, fa)
    return new Promise((resolve, reject) => {
      fb.bufferTime(10).take(1).subscribe(events => {
        try {
          assert.deepEqual(events, [2, 4, 6])
          resolve()
        } catch (e) {
          reject(e)
        }
      })
    })
  })

  it('ap', () => {
    const fa = Rx.Observable.from([1, 2, 3])
    const double = (n: number): number => n * 2
    const triple = (n: number): number => n * 3
    const fab = Rx.Observable.from([double, triple])
    const fb = ap(fab, fa)
    return new Promise((resolve, reject) => {
      fb.bufferTime(10).take(1).subscribe(events => {
        try {
          assert.deepEqual(events, [3, 6, 9])
          resolve()
        } catch (e) {
          reject(e)
        }
      })
    })
  })

  it('chain', () => {
    const fa = Rx.Observable.from([1, 2, 3])
    const fb = chain(a => Rx.Observable.from([a, a + 1]), fa)
    return new Promise((resolve, reject) => {
      fb.bufferTime(10).take(1).subscribe(events => {
        try {
          assert.deepEqual(events, [1, 2, 2, 3, 3, 4])
          resolve()
        } catch (e) {
          reject(e)
        }
      })
    })
  })

})
