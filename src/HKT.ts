export abstract class HKT<F, A> {
  __hkt: F;
  __hkta: A;
}

export type HKT2<F, A, B> = HKT<HKT<F, A>, B>;

