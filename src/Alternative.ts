import { HKTS } from './HKT'
import { StaticApplicative, FantasyApplicative } from './Applicative'
import { StaticPlus, FantasyPlus } from './Plus'

export interface StaticAlternative<F extends HKTS> extends StaticApplicative<F>, StaticPlus<F> {}

export interface FantasyAlternative<F extends HKTS, A> extends FantasyApplicative<F, A>, FantasyPlus<F, A> {}
