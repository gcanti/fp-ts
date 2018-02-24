import { getApplicativeComposition, Applicative2C } from '../src/Applicative'
import * as validation from '../src/Validation'
import * as task from '../src/Task'
import { Semigroup } from '../src/Semigroup'
import { Functor2, getFunctorComposition } from '../src/Functor'
import { phantom } from '../src/function'

declare module '../src/HKT' {
  interface URI2HKT2<L, A> {
    TaskValidation: TaskValidation<L, A>
  }
}

const taskValidationFunctor = getFunctorComposition(task.task, validation.validation)

export const URI = 'TaskValidation'

export type URI = typeof URI

export class TaskValidation<L, A> {
  // prettier-ignore
  readonly '_A': A
  // prettier-ignore
  readonly '_L': L
  // prettier-ignore
  readonly '_URI': URI
  constructor(readonly value: task.Task<validation.Validation<L, A>>) {}
  map<B>(f: (a: A) => B): TaskValidation<L, B> {
    return new TaskValidation(taskValidationFunctor.map(this.value, f))
  }
  fold<R>(failure: (l: L) => R, success: (a: A) => R): task.Task<R> {
    return this.value.map(v => v.fold(failure, success))
  }
}

const map = <L, A, B>(fa: TaskValidation<L, A>, f: (a: A) => B): TaskValidation<L, B> => {
  return fa.map(f)
}

export const getApplicative = <L>(S: Semigroup<L>): Applicative2C<URI, L> => {
  const taskValidationApplicative = getApplicativeComposition(task.task, validation.getApplicative(S))

  const of = <A>(a: A): TaskValidation<L, A> => new TaskValidation(taskValidationApplicative.of(a))

  const ap = <A, B>(fab: TaskValidation<L, (a: A) => B>, fa: TaskValidation<L, A>): TaskValidation<L, B> => {
    return new TaskValidation(taskValidationApplicative.ap(fab.value, fa.value))
  }
  return {
    URI,
    _L: phantom,
    map,
    of,
    ap
  }
}

export const taskValidation: Functor2<URI> = {
  URI,
  map
}
