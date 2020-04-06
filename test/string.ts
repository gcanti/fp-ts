import * as assert from 'assert'
import * as S from '../src/string'

describe('string', () => {
  it('split', () => {
    assert.deepStrictEqual(S.split('.')(''), [''])
    assert.deepStrictEqual(S.split('.')('foo'), ['foo'])
    assert.deepStrictEqual(S.split('.')('foo.bar'), ['foo', 'bar'])
    assert.deepStrictEqual(S.split('.')('foo..bar'), ['foo', '', 'bar'])
    assert.deepStrictEqual(S.split('..')('foo..bar'), ['foo', 'bar'])
  })
  it('join', () => {
    assert.deepStrictEqual(S.join('.')(['']), '')
    assert.deepStrictEqual(S.join('.')(['foo']), 'foo')
    assert.deepStrictEqual(S.join('.')(['foo', 'bar']), 'foo.bar')
    assert.deepStrictEqual(S.join('.')(['foo', '', 'bar']), 'foo..bar')
    assert.deepStrictEqual(S.join('..')(['foo', 'bar']), 'foo..bar')
  })
})
