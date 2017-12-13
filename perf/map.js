var Benchmark = require('benchmark')

const suite = new Benchmark.Suite()

const arr = [1, 2, 3]

const map = (arr, f) => {
  return arr.map(f)
}

const map2 = (arr, f) => {
  const len = arr.length
  const res = new Array(len)
  for (let i = 0; i < len; i++) {
    res[i] = f(arr[i])
  }
  return res
}

suite
  .add('map1', function() {
    map(arr, x => arr)
  })
  .add('map2', function() {
    map2(arr, x => arr)
  })
  .on('cycle', function(event) {
    console.log(String(event.target))
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
