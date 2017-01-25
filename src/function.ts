export function constant<A>(a: A): (..._: any[]) => A {
  return () => a
}

export function identity<A>(a: A): A {
  return a
}

