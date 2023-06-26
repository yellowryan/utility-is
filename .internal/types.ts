const primitiveTypeNames = [
	'null',
	'undefined',
	'string',
	'number',
	'bigint',
	'boolean',
	'symbol',
] as const;

export const objectTypeNames = [
  'String',
  'Number',
  'Boolean',
  'Object',
  'Array',
  'Map',
  'Set',
  'WeakMap',
  'WeakSet',
  'RegExp',
  'Promise',
  'Function',
] as const

export type PrimitiveTypeName = typeof primitiveTypeNames[number];
export type ObjectTypeNames = typeof objectTypeNames[number]

export type PrimitiveType =
  | undefined
  | string
  | number
  | null
  | boolean
  | bigint
  | symbol

export type TypedArray =
  | Int8Array
	| Uint8Array
	| Uint8ClampedArray
	| Int16Array
	| Uint16Array
	| Int32Array
	| Uint32Array
	| Float32Array
	| Float64Array
	| BigInt64Array
	| BigUint64Array;

export type FalsyType = undefined | null | '' | 0 | false

export type ArrayLike<T> = {
  readonly [index: number]: T,
  readonly length: number
}
