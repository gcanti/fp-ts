import { HKTS } from './HKT'
import { StaticApplicative, FantasyApplicative } from './Applicative'
import { StaticChain, FantasyChain } from './Chain'

export interface StaticMonad<F extends HKTS> extends StaticApplicative<F>, StaticChain<F> {}

export interface FantasyMonad<F extends HKTS, A> extends FantasyApplicative<F, A>, FantasyChain<F, A> {}
