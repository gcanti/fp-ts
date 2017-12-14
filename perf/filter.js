var Benchmark = require('benchmark')

const suite = new Benchmark.Suite()

var { replicateUntil } = require('./helper.js')
const arr = replicateUntil([1, 2, 3, 4, 5], 5)

const filter = (as, predicate) => {
  return as.filter(predicate)
}

const filter2 = (as, predicate) => {
  const l = as.length
  const r = Array(l)
  let index = 0
  for (let i = 0; i < l; i++) {
    const v = as[i]
    if (predicate(v)) {
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

const filter3 = (as, predicate) => {
  const l = as.length
  const r = []
  for (let i = 0; i < l; i++) {
    const v = as[i]
    if (predicate(v)) {
      r.push(v)
    }
  }
  return r
}

suite
  .add('filter1', function() {
    filter(arr, x => (x & 1) === 0)
  })
  .add('filter2', function() {
    filter2(arr, x => (x & 1) === 0)
  })
  .add('filter3', function() {
    filter3(arr, x => (x & 1) === 0)
  })
  .on('cycle', function(event) {
    console.log(String(event.target))
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
