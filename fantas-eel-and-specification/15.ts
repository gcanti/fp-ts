//
// Code for http://www.tomharding.me/2017/06/05/fantas-eel-and-specification-15/
//

import { Task, task } from '../src/Task'
import { createInterface } from 'readline'

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
})

const prompt = new Task<string>(
  () =>
    new Promise(res => {
      rl.question('> ', res)
    })
)

const speak = (message: string) =>
  new Task<void>(
    () =>
      new Promise(res => {
        res(console.log(message))
      })
  )

// MyApp :: Task<string>
const MyApp =
  // Get the name...
  speak('What is your name?')
    .chain(_ => prompt)
    .chain(name =>
      // Get the age...
      speak('And what is your age?')
        .chain(_ => prompt)
        .chain(
          age =>
            // Do the logic...
            parseInt(age, 10) > 30
              ? speak('Seriously, ' + name + '?!').chain(_ =>
                  speak(`You don't look a day over ` + (parseInt(age, 10) - 10) + '!')
                )
              : speak('Hmm, I can believe that!')
        )
        // Return the name!
        .chain(_ => task.of(name))
    )

MyApp.run().then(name => {
  console.log('FLATTERED ' + name)
  rl.close()
})
