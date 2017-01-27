export function constant<A>(a: A): () => A {
  return () => a
}

export function identity<A>(a: A): A {
  return a
}

