import * as fs from 'fs'
import * as path from 'path'
import { IO } from '../src/IO'

const read = (path: string): IO<string> => {
  return new IO(() => fs.readFileSync(path).toString('utf8'))
}

export const write = (path: string, contents: string): IO<void> => {
  return new IO(() => fs.writeFileSync(path, contents, { encoding: 'utf-8' }))
}

const moduleSourcePath = (name: string): string => {
  return path.join(__dirname, `/../src/${name}.ts`)
}

export const moduleOutputPath = (name: string): string => {
  return path.join(__dirname, `../docs/${name}.md`)
}

export const readModule = (name: string): IO<string> => {
  return read(moduleSourcePath(name))
}

export const writeModule = (name: string, markdown: string): IO<void> => {
  return write(moduleOutputPath(name), markdown)
}

export const indexOutputPath: string = path.join(__dirname, '../docs/index.md')

export const getModuleNames = (): Array<string> => {
  const files: Array<string> = []
  fs.readdirSync(path.join(__dirname, '../src')).forEach(file => {
    if (file !== 'index.ts' && file !== '.DS_Store') {
      files.push(path.parse(file).name)
    }
  })
  return files.sort()
}

export const mkdir = (path: string): IO<void> =>
  new IO(() => {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path)
    }
  })
