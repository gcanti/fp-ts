var Benchmark = require('benchmark')

const suite = new Benchmark.Suite()

const arr = [[1, 2, 3, 4], [1, 2, 3], [1, 2]]

const flatten1 = arr => {
  return arr.reduce(concatRef, [])
}

const flatten2 = arr => {
  let totalLength = 0
  const len = arr.length
  for (let i = 0; i < len; i++) {
    totalLength += arr[i].length
  }
  const res = Array(totalLength)
  let start = 0
  for (let i = 0; i < len; i++) {
    const currArr = arr[i]
    const currLen = currArr.length
    for (let j = 0; j < currLen; j++) {
      res[j + start] = currArr[j]
    }
    start += currLen
  }
  return res
}

const concatRef = x => y => {
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
  .add('flatten1', function() {
    flatten1(arr)
  })
  .add('flatten2', function() {
    flatten2(arr)
  })
  .on('cycle', function(event) {
    console.log(String(event.target))
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
