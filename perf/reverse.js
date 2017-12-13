var Benchmark = require('benchmark')

const suite = new Benchmark.Suite()

var { replicateUntil } = require('./helper.js')
const arr = replicateUntil([1, 2, 3, 4, 5], 10000000)

const reverse = arr => {
  return arr.reverse()
}

const reverse2 = arr => {
  const l = arr.length
  const l1 = l - 1
  const r = Array(l)
  let index = 0
  for (let i = 0; i < l; i++) {
    r[l1 - i] = arr[i]
  }
  return r
}

suite
  .add('reverse1', function() {
    reverse(arr)
  })
  .add('reverse2', function() {
    reverse2(arr)
  })
  .on('cycle', function(event) {
    console.log(String(event.target))
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
