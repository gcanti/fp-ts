import { Applicative, getApplicativeComposition } from '../src/Applicative'
import * as validation from '../src/Validation'
import * as task from '../src/Task'
import { URI as URIArray } from '../src/Array'
import { Option } from '../src/Option'

declare module '../src/HKT' {
  interface URI2HKT2<L, A> {
    TaskValidation: TaskValidation<L, A>
  }
}

const taskValidationApplicative = getApplicativeComposition(task, validation)

export const URI = 'TaskValidation'

export type URI = typeof URI

export class TaskValidation<L, A> {
  static of = of
  readonly _A: A
  readonly _L: L
  readonly _URI: URI
  constructor(public readonly value: task.Task<validation.Validation<L, A>>) {}
  map<B>(f: (a: A) => B): TaskValidation<L, B> {
    return new TaskValidation(taskValidationApplicative.map(f, this.value))
  }
  of<M, B>(b: B): TaskValidation<M, B> {
    return of(b)
  }
  ap<B>(fab: TaskValidation<L, (a: A) => B>): TaskValidation<L, B> {
    return new TaskValidation(taskValidationApplicative.ap(fab.value, this.value))
  }
  ap_<B, C>(this: TaskValidation<L, (a: B) => C>, fb: TaskValidation<L, B>): TaskValidation<L, C> {
    return fb.ap(this)
  }
  fold<R>(left: (l: L) => R, right: (a: A) => R): task.Task<R> {
    return this.value.map(v => v.fold(left, right))
  }
  toOption(): task.Task<Option<A>> {
    return this.value.map(v => v.toOption())
  }
}

export function map<L, A, B>(f: (a: A) => B, fa: TaskValidation<L, A>): TaskValidation<L, B> {
  return fa.map(f)
}

export function of<L, A>(a: A): TaskValidation<L, A> {
  return new TaskValidation(taskValidationApplicative.of(a))
}

export function ap<L, A, B>(fab: TaskValidation<L, (a: A) => B>, fa: TaskValidation<L, A>): TaskValidation<L, B> {
  return fa.ap(fab)
}

export const taskValidation: Applicative<URI> = {
  URI,
  map,
  of,
  ap
}

//
// overloadings
//

declare module '../src/Traversable' {
  interface Ops {
    sequence(
      applicative: Applicative<URI>,
      traversable: Traversable<URIArray>
    ): <L, A>(tfa: Array<TaskValidation<L, A>>) => TaskValidation<L, Array<A>>
  }
}
