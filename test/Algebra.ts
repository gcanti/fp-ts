import * as assert from 'assert'
import * as Alg from '../src/Algebra'
import { Functor1 } from '../src/Functor'

type ConstF = {
  readonly _tag: 'ConstF'
  readonly d: number
}

type VarF = {
  readonly _tag: 'VarF'
  readonly s: string
}

type TimesF<R> = {
  readonly _tag: 'TimesF'
  readonly l: R
  readonly r: R
}

type PlusF<R> = {
  readonly _tag: 'PlusF'
  readonly l: R
  readonly r: R
}

type ExprF<R> = ConstF | VarF | TimesF<R> | PlusF<R>

const URI = 'RS/ExprF'
type URI = typeof URI

declare module '../src/HKT' {
  interface URItoKind<A> {
    readonly [URI]: ExprF<A>
  }
}

type Ex = Alg.Fix1<URI>

const functor: Functor1<URI> = {
  URI,
  map: (fa, f) => {
    switch (fa._tag) {
      case 'ConstF':
        return {
          _tag: fa._tag,
          d: fa.d
        }
      case 'VarF':
        return {
          _tag: fa._tag,
          s: fa.s
        }
      case 'PlusF':
        return {
          _tag: fa._tag,
          l: f(fa.l),
          r: f(fa.r)
        }
      case 'TimesF':
        return {
          _tag: fa._tag,
          l: f(fa.l),
          r: f(fa.r)
        }
    }
  }
}

const v = (s: string): Ex =>
  Alg.fix({
    _tag: 'VarF',
    s
  })

const num = (d: number): Ex =>
  Alg.fix({
    _tag: 'ConstF',
    d
  })

const mul = (l: Ex, r: Ex): Ex =>
  Alg.fix({
    _tag: 'TimesF',
    l,
    r
  })

const add = (l: Ex, r: Ex): Ex =>
  Alg.fix({
    _tag: 'PlusF',
    l,
    r
  })

const pretty: Alg.Algebra1<URI, string> = (_) => {
  switch (_._tag) {
    case 'ConstF':
      return `${_.d}`
    case 'PlusF':
      return `${_.l} + ${_.r}`
    case 'TimesF':
      return `${_.l} * ${_.r}`
    case 'VarF':
      return _.s
  }
}

const pretty2: Alg.Algebra1<URI, string> = (_) => {
  switch (_._tag) {
    case 'ConstF':
      return `${_.d}`
    case 'PlusF':
      return `${_.l} + ${_.r}`
    case 'TimesF':
      return _.l === _.r
        ? `${_.l}^2`
        : _.l.indexOf('^') !== -1
        ? _.l.split('^')[0] === _.r
          ? `${_.r}^${parseInt(_.l.split('^')[1], 10) + 1}`
          : `${_.l} * ${_.r}`
        : `${_.l} * ${_.r}`
    case 'VarF':
      return _.s
  }
}

const ex = add(mul(v('x'), v('x')), add(mul(num(3), v('x')), num(4)))
const ex2 = add(mul(mul(v('x'), v('x')), v('x')), add(mul(num(3), v('x')), num(4)))

describe('Algebra', () => {
  it('cata', () => {
    assert.strictEqual(Alg.cata(functor)(pretty)(ex), 'x * x + 3 * x + 4')
    assert.strictEqual(Alg.cata(functor)(pretty2)(ex), 'x^2 + 3 * x + 4')
    assert.strictEqual(Alg.cata(functor)(pretty2)(ex2), 'x^3 + 3 * x + 4')
  })
})
