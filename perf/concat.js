var Benchmark = require('benchmark')

const suite = new Benchmark.Suite()

const x = [1, 2, 3]
const y = [5, 6]

const concat1 = x => y => {
  return x.concat(y)
}

const concat2 = x => y => {
  const lenx = x.length
  const leny = y.length
  const r = Array(lenx + leny)
  for (let i = 0; i < lenx; i++) {
    r[i] = x[i]
  }
  for (let i = 0; i < leny; i++) {
    r[i + lenx] = y[i]
  }
  return r
}

suite
  .add('concat1', function() {
    concat1(x)(y)
  })
  .add('concat2', function() {
    concat2(x)(y)
  })
  .on('cycle', function(event) {
    console.log(String(event.target))
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
