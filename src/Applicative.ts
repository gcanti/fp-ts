import { PointedFunctor } from './PointedFunctor'
import { Apply } from './Apply'

export interface Applicative<F> extends PointedFunctor<F>, Apply<F> {}
