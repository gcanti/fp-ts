var Benchmark = require('benchmark')

const suite = new Benchmark.Suite()

const fns = [
  x => 2 * x,
  x => x + 1,
  x => x * x,
  x => Math.log(x),
  x => Math.exp(x)
]

const pipe1 = fns => {
  return function(x) {
    let y = x
    for (const fn of fns) {
      y = fn.call(this, y)
    }
    return y
  }
}

const pipe2 = fns => {
  const len = fns.length - 1
  return function(x) {
    let y = x
    for (let i = 0; i <= len; i++) {
      y = fns[i].call(this, y)
    }
    return y
  }
}

const pipe3 = fns => {
  return x => fns.reduce((acc, fn) => fn.call(this, acc), x)
}

const f1 = pipe1(fns)
const f2 = pipe2(fns)
const f3 = pipe3(fns)

suite
  .add('pipe1', function() {
    pipe1(fns)
  })
  .add('pipe2', function() {
    pipe2(fns)
  })
  .add('pipe3', function() {
    pipe3(fns)
  })
  .add('f1', function() {
    f1(1)
  })
  .add('f2', function() {
    f2(1)
  })
  .add('f3', function() {
    f3(1)
  })
  .on('cycle', function(event) {
    console.log(String(event.target))
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
  