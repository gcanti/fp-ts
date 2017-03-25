import { HKTS } from './HKT'
import { StaticPointed, FantasyPointed } from './Pointed'
import { StaticApply, FantasyApply } from './Apply'

export interface StaticApplicative<F extends HKTS> extends StaticPointed<F>, StaticApply<F> {}

export interface FantasyApplicative<F extends HKTS, A> extends FantasyPointed<F, A>, FantasyApply<F, A> {}
