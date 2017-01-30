export function constant<A>(a: A): () => A {
  return () => a
}

export const ffalse = constant(false)
export const ftrue = constant(true)

export function identity<A>(a: A): A {
  return a
}


