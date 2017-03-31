import { HKTS } from './HKT'
import { StaticExtend, FantasyExtend } from './Extend'
import { StaticCopointed, FantasyCopointed } from './Copointed'

export interface StaticComonad<F extends HKTS> extends StaticExtend<F>, StaticCopointed<F> {}

export interface FantasyComonad<F extends HKTS, A> extends FantasyExtend<F, A>, FantasyCopointed<F, A> {}
