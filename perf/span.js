var Benchmark = require('benchmark')

const suite = new Benchmark.Suite()

var { replicateUntil } = require('./helper.js')
const arr = replicateUntil([1, 2, 3, 4, 5], 10)

const span = (predicate, as) => {
  const init = []
  let i = 0
  for (; i < as.length; i++) {
    if (predicate(as[i])) {
      init.push(as[i])
    } else {
      break
    }
  }
  return { init, rest: as.slice(i) }
}

const span2 = (predicate, as) => {
  const l = as.length
  let i = 0
  for (; i < l; i++) {
    if (predicate(as[i])) {
    } else {
      break
    }
  }

  const init = Array(i)

  for (let j = 0; j < i; j++) {
    init[j] = as[j]
  }
  const rest = Array(l - i)
  for (let j = i; j < l; j++) {
    rest[j - i] = as[j]
  }
  return { init, rest }
}

suite
  .add('span1', function() {
    span(x => x < 3, arr)
  })
  .add('span2', function() {
    span2(x => x < 3, arr)
  })
  .on('cycle', function(event) {
    console.log(String(event.target))
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
