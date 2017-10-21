import { Applicative, FantasyApplicative } from './Applicative'
import { Plus, FantasyPlus } from './Plus'

/** @typeclass */
export interface Alternative<F> extends Applicative<F>, Plus<F> {}

export interface FantasyAlternative<F, A> extends FantasyApplicative<F, A>, FantasyPlus<F, A> {}
