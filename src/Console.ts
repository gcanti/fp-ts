import { IO } from './IO'

// Adapted from https://github.com/purescript/purescript-console

export function log(s: any): IO<void> {
  return new IO(() => console.log(s))
}

export function warn(s: any): IO<void> {
  return new IO(() => console.warn(s))
}

export function error(s: any): IO<void> {
  return new IO(() => console.error(s))
}

export function info(s: any): IO<void> {
  return new IO(() => console.info(s))
}
