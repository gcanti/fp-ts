import { Functor, Functor1, Functor2, Functor2C, Functor3C, getFunctorComposition } from './Functor'
import { URIS, URIS2, URIS3 } from './HKT'
import { fromEither, none, some } from './Option'
import {
  CompactableComposition3C1,
  Compactable1,
  Compactable2C,
  CompactableComposition22C,
  Compactable2,
  CompactableComposition22,
  CompactableComposition2C1,
  CompactableComposition21,
  CompactableComposition12,
  CompactableComposition11,
  Compactable,
  CompactableComposition
} from './Compactable_'

/**
 * @since 1.12.0
 */
export function getCompactableComposition<F extends URIS3, G extends URIS, UF, LF>(
  F: Functor3C<F, UF, LF>,
  G: Compactable1<G> & Functor1<G>
): CompactableComposition3C1<F, G, UF, LF>
export function getCompactableComposition<F extends URIS2, G extends URIS2, LG>(
  F: Functor2<F>,
  G: Compactable2C<G, LG> & Functor2C<G, LG>
): CompactableComposition22C<F, G, LG>
export function getCompactableComposition<F extends URIS2, G extends URIS2>(
  F: Functor2<F>,
  G: Compactable2<G> & Functor2<G>
): CompactableComposition22<F, G>
export function getCompactableComposition<F extends URIS2, G extends URIS, LF>(
  F: Functor2C<F, LF>,
  G: Compactable1<G> & Functor1<G>
): CompactableComposition2C1<F, G, LF>
export function getCompactableComposition<F extends URIS2, G extends URIS>(
  F: Functor2<F>,
  G: Compactable1<G> & Functor1<G>
): CompactableComposition21<F, G>
export function getCompactableComposition<F extends URIS, G extends URIS2, LG>(
  F: Functor1<F>,
  G: Compactable2C<G, LG> & Functor2C<G, LG>
): CompactableComposition12<F, G>
export function getCompactableComposition<F extends URIS, G extends URIS2>(
  F: Functor1<F>,
  G: Compactable2<G> & Functor2<G>
): CompactableComposition12<F, G>
export function getCompactableComposition<F extends URIS, G extends URIS>(
  F: Functor1<F>,
  G: Compactable1<G> & Functor1<G>
): CompactableComposition11<F, G>
export function getCompactableComposition<F, G>(
  F: Functor<F>,
  G: Compactable<G> & Functor<G>
): CompactableComposition<F, G>
export function getCompactableComposition<F, G>(
  F: Functor<F>,
  G: Compactable<G> & Functor<G>
): CompactableComposition<F, G> {
  const FC = getFunctorComposition(F, G)
  const CC: CompactableComposition<F, G> = {
    ...FC,
    compact: fga => F.map(fga, G.compact),
    separate: fge => {
      const left = CC.compact(FC.map(fge, e => e.fold(some, () => none)))
      const right = CC.compact(FC.map(fge, fromEither))
      return { left, right }
    }
  }
  return CC
}
