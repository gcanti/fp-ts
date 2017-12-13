var Benchmark = require('benchmark')

const suite = new Benchmark.Suite()

var { replicateUntil } = require('./helper.js')
const arr = replicateUntil([1, 2, 3, 4, 5], 100)

const filter = (arr, f) => {
  return arr.filter(f)
}

const filter2 = (arr, f) => {
  const l = arr.length
  const r = Array(l)
  let index = 0
  for (let i = 0; i < l; i++) {
    const v = arr[i]
    if (f(v)) {
      r[index] = v
      index++
    }
  }
  const res = Array(index)
  for (let i = 0; i < index; i++) {
    res[i] = r[i]
  }
  return res
}

suite
  .add('filter1', function() {
    filter(arr, x => (x & 1) === 0)
  })
  .add('filter2', function() {
    filter2(arr, x => (x & 1) === 0)
  })
  .on('cycle', function(event) {
    console.log(String(event.target))
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
