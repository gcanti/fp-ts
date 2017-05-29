import { HKTS } from './HKT'
import { Applicative, FantasyApplicative } from './Applicative'
import { Plus, FantasyPlus } from './Plus'

export interface Alternative<F extends HKTS> extends Applicative<F>, Plus<F> {}

export interface FantasyAlternative<F extends HKTS, A> extends FantasyApplicative<F, A>, FantasyPlus<F, A> {}
