import * as fs from 'fs'
import * as path from 'path'
import * as io from '../../src/IO'

const read = (path: string): io.IO<string> => {
  return new io.IO(() => fs.readFileSync(path).toString('utf8'))
}

export const write = (path: string, contents: string): io.IO<void> => {
  return new io.IO(() => fs.writeFileSync(path, contents, { encoding: 'utf-8' }))
}
const moduleSourcePath = (name: string): string => {
  return path.join(__dirname, `/../../src/${name}.ts`)
}

const moduleOutputPath = (name: string): string => {
  return path.join(__dirname, `/md/${name}.md`)
}

export const readModule = (name: string): io.IO<string> => {
  return read(moduleSourcePath(name))
}

export const writeModule = (name: string, markdown: string): io.IO<void> => {
  return write(moduleOutputPath(name), markdown)
}

export const indexOutputPath: string = path.join(__dirname, '/md/index.md')
