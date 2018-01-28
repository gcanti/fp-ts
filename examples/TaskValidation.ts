import { Applicative, getApplicativeComposition } from '../src/Applicative'
import * as validation from '../src/Validation'
import * as task from '../src/Task'

declare module '../src/HKT' {
  interface URI2HKT2<L, A> {
    TaskValidation: TaskValidation<L, A>
  }
}

const taskValidationApplicative = getApplicativeComposition(task, validation)

export const URI = 'TaskValidation'

export type URI = typeof URI

export class TaskValidation<L, A> {
  readonly '-A': A
  readonly '-L': L
  readonly '-URI': URI
  constructor(readonly value: task.Task<validation.Validation<L, A>>) {}
  map<B>(f: (a: A) => B): TaskValidation<L, B> {
    return new TaskValidation(taskValidationApplicative.map(f, this.value))
  }
  ap<B>(fab: TaskValidation<L, (a: A) => B>): TaskValidation<L, B> {
    return new TaskValidation(taskValidationApplicative.ap(fab.value, this.value))
  }
  ap_<B, C>(this: TaskValidation<L, (b: B) => C>, fb: TaskValidation<L, B>): TaskValidation<L, C> {
    return fb.ap(this)
  }
  fold<R>(left: (l: L) => R, right: (a: A) => R): task.Task<R> {
    return this.value.map(v => v.fold(left, right))
  }
}

export const map = <L, A, B>(f: (a: A) => B, fa: TaskValidation<L, A>): TaskValidation<L, B> => fa.map(f)

export const of = <L, A>(a: A): TaskValidation<L, A> => new TaskValidation(taskValidationApplicative.of(a))

export const ap = <L, A, B>(fab: TaskValidation<L, (a: A) => B>, fa: TaskValidation<L, A>): TaskValidation<L, B> =>
  fa.ap(fab)

export const taskValidation: Applicative<URI> = {
  URI,
  map,
  of,
  ap
}
