export abstract class HKT<F, A> {
  readonly __hkt: F;
  readonly __hkta: A;
}

export type HKT2<F, A, B> = HKT<HKT<F, A>, B>;

