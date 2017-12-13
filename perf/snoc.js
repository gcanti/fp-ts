var Benchmark = require('benchmark')

const suite = new Benchmark.Suite()

const x = [1, 2, 3]

const snoc1 = as => a => {
  return as.concat([a])
}

const snoc2 = as => a => {
  const len = as.length
  const r = Array(len + 1)
  for (let i = 0; i < len; i++) {
    r[i] = as[i]
  }
  r[len] = a
  return r
}

suite
  .add('snoc1', function() {
    snoc1(x)(4)
  })
  .add('snoc2', function() {
    snoc2(x)(4)
  })
  .on('cycle', function(event) {
    console.log(String(event.target))
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
