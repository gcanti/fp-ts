import { reader, ask } from '../src/reader'

// So, what's the Reader monad?

// Here's a shape of some data which will be useful later
interface Config {
  name: string
  age: number
}

// Here's an arbitrary value we are going to start using in our functions
const x = 1

// Our Reader monad, note it has not been given the context at this point
const read = reader.of(x)

// Let's start doing calculations with it!
const read2 = read
  .map(x => x * 2) // multiply by 2!
  .map(y => y + 10) // add 10! (why? why not!)
  .chain(j => {
    // Let's use something from the context!
    // first we 'ask' for it
    const conf = ask<Config>()
    // It returns a new Reader monad with the context inside it
    // we can't just grab the value, but we can map over it and
    // thus return a new Reader monad
    // because we are returning a new Monad note this function is chain
    // instead of map
    return conf.map(c => j + c.age)
  })
  .chain(age => {
    // let's grab it again and use the name
    const conf = ask<Config>()
    // and combine the name with the age
    return conf.map(c => `Hello ${c.name} you are now ${age} years old isn't that just lovely?`)
  })

// what is read2 then?
console.log(read2)

// -> Reader { run: [Function] }
// a Reader monad!
// but what can we do with it?

// but what about if we have some context to put in it?
const config: Config = {
  name: 'horse',
  age: 100
}

// let's run our Reader with the stuff in it...
const output = read2.run(config)

console.log(output)
// -> "Hello horse you are now 112 years old isn't that just lovely?"

// So what is the Reader monad? Dependency injection!
