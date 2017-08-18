import { IO } from './IO'

// Adapted from https://github.com/purescript/purescript-console

export const log = (s: any): IO<void> => new IO(() => console.log(s))

export const warn = (s: any): IO<void> => new IO(() => console.warn(s))

export const error = (s: any): IO<void> => new IO(() => console.error(s))

export const info = (s: any): IO<void> => new IO(() => console.info(s))
