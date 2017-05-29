import { HKTS } from './HKT'
import { Applicative, FantasyApplicative } from './Applicative'
import { Chain, FantasyChain } from './Chain'

export interface Monad<F extends HKTS> extends Applicative<F>, Chain<F> {}

export interface FantasyMonad<F extends HKTS, A> extends FantasyApplicative<F, A>, FantasyChain<F, A> {}
