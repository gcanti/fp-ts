export interface HKT<F, A> {
  readonly _hkt: F
  readonly _hkta: A
}

export type HKT2<F, A, B> = HKT<HKT<F, A>, B>
