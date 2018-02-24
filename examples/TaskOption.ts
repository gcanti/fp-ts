import { Task, task, tryCatch as tryCatchTask } from 'fp-ts/lib/Task'
import { Option, fromEither } from 'fp-ts/lib/Option'
import { Monad1 } from 'fp-ts/lib/Monad'
import * as optionT from 'fp-ts/lib/OptionT'
import { Lazy } from 'fp-ts/lib/function'

declare module 'fp-ts/lib/HKT' {
  interface URI2HKT<A> {
    TaskOption: TaskOption<A>
  }
}

const optionTTask = optionT.getOptionT(task)

export const URI = 'TaskOption'

export type URI = typeof URI

const optionTfold = optionT.fold(task)

export class TaskOption<A> {
  // prettier-ignore
  readonly '_A': A
  // prettier-ignore
  readonly '_URI': URI
  constructor(readonly value: Task<Option<A>>) {}
  run(): Promise<Option<A>> {
    return this.value.run()
  }
  map<B>(f: (a: A) => B): TaskOption<B> {
    return new TaskOption(optionTTask.map(this.value, f))
  }
  ap<B>(fab: TaskOption<(a: A) => B>): TaskOption<B> {
    return new TaskOption(optionTTask.ap<A, B>(fab.value, this.value))
  }
  ap_<B, C>(this: TaskOption<(b: B) => C>, fb: TaskOption<B>): TaskOption<C> {
    return fb.ap(this)
  }
  chain<B>(f: (a: A) => TaskOption<B>): TaskOption<B> {
    return new TaskOption(optionTTask.chain(a => f(a).value, this.value))
  }
  fold<R>(r: R, some: (a: A) => R): Task<R> {
    return optionTfold(r, some, this.value)
  }
  orElse(f: () => TaskOption<A>): TaskOption<A> {
    return new TaskOption(this.value.chain(e => e.fold(f().value, a => optionTTask.of(a))))
  }
}

const map = <A, B>(fa: TaskOption<A>, f: (a: A) => B): TaskOption<B> => {
  return fa.map(f)
}

const optionTsome = optionT.some(task)
const of = <A>(a: A): TaskOption<A> => new TaskOption(optionTsome(a))

const ap = <A, B>(fab: TaskOption<(a: A) => B>, fa: TaskOption<A>): TaskOption<B> => {
  return fa.ap(fab)
}

const chain = <A, B>(fa: TaskOption<A>, f: (a: A) => TaskOption<B>): TaskOption<B> => {
  return fa.chain(f)
}

export const some = of

export const none = new TaskOption(optionT.none(task)())

const optionTfromOption = optionT.fromOption(task)
export const fromOption = <A>(oa: Option<A>): TaskOption<A> => {
  return new TaskOption(optionTfromOption(oa))
}

const optionTliftF = optionT.liftF(task)
export const fromTask = <A>(ma: Task<A>): TaskOption<A> => {
  return new TaskOption(optionTliftF(ma))
}

export const orElse = <A>(f: () => TaskOption<A>) => (fa: TaskOption<A>): TaskOption<A> => {
  return fa.orElse(f)
}

export const tryCatch = <A>(f: Lazy<Promise<A>>): TaskOption<A> => {
  return new TaskOption(tryCatchTask(f, () => undefined).map(e => fromEither(e)))
}

export const taskOption: Monad1<URI> = {
  URI,
  map,
  of,
  ap,
  chain
}
