var Benchmark = require('benchmark')

const suite = new Benchmark.Suite()

var { replicateUntil } = require('./helper.js')
const arr = replicateUntil([1, 2, 3, 4, 5], 10)

const copy = arr => {
  return arr.slice()
}

const copy2 = arr => {
  const l = arr.length
  const r = Array(l)
  for (let i = 0; i < l; i++) {
    r[i] = arr[i]
  }
  return r
}

suite
  .add('copy1', function() {
    copy(arr)
  })
  .add('copy2', function() {
    copy2(arr)
  })
  .on('cycle', function(event) {
    console.log(String(event.target))
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
