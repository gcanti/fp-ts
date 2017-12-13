var Benchmark = require('benchmark')
var t = require('../lib/index')

const suite = new Benchmark.Suite()

const x = [1, 2, 3]

const cons1 = a => as => {
  return [a].concat(as)
}

const cons2 = a => as => {
  const len = as.length
  const r = Array(len + 1)
  for (let i = 0; i < len; i++) {
    r[i] = as[i]
  }
  r.unshift(a)
  return r
}

const cons3 = a => as => {
  const len = as.length
  const r = Array(len + 1)
  for (let i = 0; i < len; i++) {
    r[i + 1] = as[i]
  }
  r[0] = a
  return r
}

suite
  .add('cons1', function() {
    cons1(4)(x)
  })
  .add('cons2', function() {
    cons2(4)(x)
  })
  .add('cons3', function() {
    cons3(4)(x)
  })
  .on('cycle', function(event) {
    console.log(String(event.target))
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
