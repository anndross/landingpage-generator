export type Constructor<T = {}> = new (...args: any[]) => T;

export type Mixin<T extends Constructor> = (Base: T) => T;

export type UnionToIntersection<U> = (
  U extends any ? (arg: U) => void : never
) extends (arg: infer I) => void
  ? I
  : never;

export type InstanceType<T> = T extends new (...args: any[]) => infer R
  ? R
  : never;

export type CombineMixins<
  Base extends Constructor,
  Mixins extends Mixin<any>[],
> = {
  new (
    ...args: ConstructorParameters<Base>
  ): InstanceType<Base> &
    UnionToIntersection<InstanceType<ReturnType<Mixins[number]>>>;
};
