import { Task } from 'fp-ts/lib/Task'
import { Option, fromEither } from 'fp-ts/lib/Option'
import { Monad } from 'fp-ts/lib/Monad'
import * as optionT from 'fp-ts/lib/OptionT'
import * as task from 'fp-ts/lib/Task'
import { Lazy } from 'fp-ts/lib/function'

declare module 'fp-ts/lib/HKT' {
  interface URI2HKT<A> {
    TaskOption: TaskOption<A>
  }
}

const optionTTask = optionT.getOptionT(task.task)

export const URI = 'TaskOption'

export type URI = typeof URI

export class TaskOption<A> {
  readonly '-A': A
  readonly '-URI': URI
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
    return optionT.fold(task.task)(r, some, this.value)
  }
  orElse(f: () => TaskOption<A>): TaskOption<A> {
    return new TaskOption(this.value.chain(e => e.fold(f().value, a => optionTTask.of(a))))
  }
}

export const map = <A, B>(fa: TaskOption<A>, f: (a: A) => B): TaskOption<B> => fa.map(f)

export const of = <A>(a: A): TaskOption<A> => new TaskOption(optionT.some(task.task)(a))

export const ap = <A, B>(fab: TaskOption<(a: A) => B>, fa: TaskOption<A>): TaskOption<B> => fa.ap(fab)

export const chain = <A, B>(fa: TaskOption<A>, f: (a: A) => TaskOption<B>): TaskOption<B> => fa.chain(f)

export const some = of

export const none = new TaskOption(optionT.none(task.task)())

export const fromOption = <A>(oa: Option<A>): TaskOption<A> => new TaskOption(optionT.fromOption(task.task)(oa))

export const liftF = <A>(ma: Task<A>): TaskOption<A> => new TaskOption(optionT.liftF(task.task)(ma))

export const orElse = <A>(f: () => TaskOption<A>) => (fa: TaskOption<A>): TaskOption<A> => {
  return fa.orElse(f)
}

export const tryCatch = <A>(f: Lazy<Promise<A>>): TaskOption<A> => {
  return new TaskOption(task.tryCatch(f, () => undefined).map(e => fromEither(e)))
}

export const taskOption: Monad<URI> = {
  URI,
  map,
  of,
  ap,
  chain
}
