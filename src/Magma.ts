/**
 * A `Magma` is a pair `(A, concat)` in which `A` is a non-empty set and `concat` is a binary operation on `A`
 *
 * @since 2.0.0
 */
export interface Magma<A> {
  readonly concat: (x: A, y: A) => A
}
