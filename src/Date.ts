import { IO } from './IO'

export const now: IO<Date> = new IO(() => new Date())
