var Benchmark = require('benchmark')

const suite = new Benchmark.Suite()

const arr = [1, 2, 3]

const reduce = (arr, f, i) => {
  return arr.reduce(f, i)
}

const reduce2 = (arr, f, i) => {
  const len = arr.length
  let res = i
  for (let i = 0; i < len; i++) {
    res = f(res, arr[i])
  }
  return res
}

suite
  .add('reduce', function() {
    reduce(arr, (acc, e) => acc + e, 0)
  })
  .add('reduce2', function() {
    reduce2(arr, (acc, e) => acc + e, 0)
  })
  .on('cycle', function(event) {
    console.log(String(event.target))
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
