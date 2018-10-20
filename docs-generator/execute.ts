import { exec } from 'child_process'
import { Readable } from 'stream'
import { left, right } from '../src/Either'
import { Task } from '../src/Task'
import { TaskEither } from '../src/TaskEither'

export const execute = (source: string, f: (error: Error) => string): TaskEither<string, string> => {
  return new TaskEither(
    new Task(
      () =>
        new Promise(resolve => {
          const input = new Readable()
          input.push(source)
          input.push(null)
          input.pipe(
            exec(`ts-node`, (err, stdout) => {
              if (err) {
                resolve(left(f(err)))
              } else {
                resolve(right(stdout))
              }
            }).stdin
          )
        })
    )
  )
}

// const taskEitherSeq: typeof taskEither = {
//   ...taskEither,
//   ap: (fab, fa) => fab.chain(f => fa.map(f))
// }

// const markdownSourcePath = (name: string): string => {
//   return path.join(__dirname, `/../docs/${name}.md`)
// }

// const main = () => {
//   const sources: Array<Source> = array.chain(getModuleNames(), name =>
//     getTypescript(fs.readFileSync(markdownSourcePath(name)).toString('utf8')).map(source => ({
//       name,
//       source
//     }))
//   )
//   const tasks = array.traverse(taskEitherSeq)(sources, execute)
//   tasks.run().then(console.log)
// }

// main()
