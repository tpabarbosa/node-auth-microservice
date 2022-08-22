export type Either<A, B> = Omit<A, keyof B> | Omit<B, keyof A>;

export type UnionKeys<T> = T extends T ? keyof T : never;

// Improve intellisense
type Expand<T> = T extends T ? { [K in keyof T]: T[K] } : never;

// eslint-disable-next-line @typescript-eslint/ban-types
export type OneOf<T extends {}[]> = {
    [K in keyof T]: Expand<
        T[K] & Partial<Record<Exclude<UnionKeys<T[number]>, keyof T[K]>, never>>
    >;
}[number];
