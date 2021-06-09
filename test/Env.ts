import * as assert from 'assert'
import * as _ from '../src/Env'
import { flow, pipe } from '../src/function'

const fst = <A, B>(ab: readonly [A, B]) => ab[0]
const snd = <A, B>(ab: readonly [A, B]) => ab[1]

describe('Env', () => {
  describe('pipeables', () => {
    it('map', () => {
      const wa: _.Env<string, number> = () => ['env', 1]
      assert.deepStrictEqual(
        _.extract(
          pipe(
            wa,
            _.map((n) => n + 1)
          )
        ),
        2
      )
    })
    it('extend', () => {
      const wa: _.Env<string, number> = () => ['env', 1]
      assert.deepStrictEqual(
        _.extract(
          pipe(
            wa,
            _.extend((wa) =>
              _.extract(
                pipe(
                  wa,
                  _.map((n) => n + 1)
                )
              )
            )
          )
        ),
        2
      )
    })
    it('duplicate', () => {
      const wa: _.Env<string, number> = () => ['env', 1]
      assert.deepStrictEqual(_.extract(_.extract(pipe(wa, _.duplicate))), 1)
    })
  })

  it('ask', () => {
    const wa: _.Env<number, string> = () => [42, 'hello']
    assert.deepStrictEqual(_.ask(wa), 42)
  })

  it('asks', () => {
    const wa: _.Env<readonly [string, string], number> = () => [['first', 'second'], 1337]
    assert.deepStrictEqual(pipe(wa, _.asks(fst)), 'first')
    assert.deepStrictEqual(pipe(wa, _.asks(snd)), 'second')
  })

  it('local', () => {
    const wa: _.Env<number, number> = () => [42, 1337]
    const wa2 = pipe(wa, _.local(String))
    assert.deepStrictEqual(_.ask(wa2), '42')
  })

  it('example in doc', () => {
    const env: _.Env<number, string> = () => [5, 'horse']

    const repeat = (env: _.Env<number, string>): string => {
      const numRepeat = _.ask(env)
      const str = _.extract(env)
      return str.repeat(numRepeat)
    }

    assert.deepStrictEqual(repeat(env), 'horsehorsehorsehorsehorse')
  })

  describe('queries', () => {
    // examples taken from the excellent https://github.com/ChrisPenner/comonads-by-example

    const settings = { padAmount: 3, maxLength: 5, padChar: '*' }

    type Settings = typeof settings

    const getPadChar = <A>(wa: _.Env<Settings, A>): string =>
      pipe(
        wa,
        _.asks((s) => s.padChar)
      )
    const context: _.Env<Settings, string> = () => [settings, 'Hello World']

    it('gets padChar from the environment', () => {
      assert.deepStrictEqual(getPadChar(context), '*')
    })
    it('gets padAmount from the environment', () => {
      assert.deepStrictEqual(
        pipe(
          context,
          _.asks((s) => s.padAmount)
        ),
        3
      )
    })

    const trunc = (wa: _.Env<Settings, string>): string => {
      const maxLength = pipe(
        wa,
        _.asks((s) => s.maxLength)
      )
      const str = _.extract(wa)
      return str.substring(0, maxLength)
    }

    it('truncates string using settings in environment', () => {
      assert.deepStrictEqual(trunc(context), 'Hello')
    })

    const pad = (wa: _.Env<Settings, string>): string => {
      const padAmount = pipe(
        wa,
        _.asks((s) => s.padAmount)
      )
      const padding = getPadChar(wa).repeat(padAmount)
      return `${padding}${_.extract(wa)}${padding}`
    }

    it('pads the string using chars and padding size from the environment', () => {
      assert.deepStrictEqual(pad(context), '***Hello World***')
    })

    const pipeline = (wa: _.Env<Settings, string>): string => pipe(wa, _.extend(trunc), pad)

    const pipelineK: (wa: _.Env<Settings, string>) => string = pipe(trunc, _.extendK(pad))

    it('uses extend to combine both trunc and pad', () => {
      assert.deepStrictEqual(pipeline(context), '***Hello***')
      assert.deepStrictEqual(pipelineK(context), '***Hello***')
    })

    const pipeline2 = (wa: _.Env<Settings, string>): string => pipe(wa, _.extend(pad), trunc)

    const pipeline2K: (wa: _.Env<Settings, string>) => string = pipe(pad, _.extendK(trunc))

    it('uses extend to combine both pad and trunc', () => {
      assert.deepStrictEqual(pipeline2(context), '***He')
      assert.deepStrictEqual(pipeline2K(context), '***He')
    })

    const setPadChar = (padChar: string) => (settings: Settings): Settings => ({ ...settings, padChar })

    const pipeline3 = (wa: _.Env<Settings, string>): string =>
      pipe(wa, _.extend(trunc), _.extend(flow(_.local(setPadChar('_')), pad)), pad)

    const pipeline3K: (wa: _.Env<Settings, string>) => string = pipe(
      trunc,
      _.extendK(flow(_.local(setPadChar('_')), pad)),
      _.extendK(pad)
    )

    it('uses local to temporaily modify the environment midway through the computation', () => {
      assert.deepStrictEqual(pipeline3(context), '***___Hello___***')
      assert.deepStrictEqual(pipeline3K(context), '***___Hello___***')
    })
  })
})
