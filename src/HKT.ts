export abstract class HKT<F, A> {
  readonly __hkt: F;
  readonly __hkta: A;
}

export type HKT2<F, A, B> = HKT<HKT<F, A>, B>;

export function to<F, G, A>(fga: HKT<F, HKT<G, A>>): HKT<HKT<F, G>, A> {
  return fga as any
}

export function from<F, G, A>(fga: HKT<HKT<F, G>, A>): HKT<F, HKT<G, A>> {
  return fga as any
}


