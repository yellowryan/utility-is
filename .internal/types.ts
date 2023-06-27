export const primitiveTypeNames = [
	'null',
	'undefined',
	'string',
	'number',
	'bigint',
	'boolean',
	'symbol',
] as const;

export const typedArrayNames = [
  'Int8Array',
	'Uint8Array',
	'Uint8ClampedArray',
	'Int16Array',
	'Uint16Array',
	'Int32Array',
	'Uint32Array',
	'Float32Array',
	'Float64Array',
	'BigInt64Array',
	'BigUint64Array',
] as const

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
  'AsyncFunction',
  'GeneratorFunction',
  'Error',
  'Date',
  'NaN',
  'Blob',
  'Buffer',
  ...typedArrayNames,
] as const

export type PrimitiveTypeNames = typeof primitiveTypeNames[number];
export type ObjectTypeNames = typeof objectTypeNames[number];
export type TypedArray = typeof typedArrayNames[number];
export type TypeNames = ObjectTypeNames | PrimitiveTypeNames;

export type PrimitiveType =
  | undefined
  | string
  | number
  | null
  | boolean
  | bigint
  | symbol

export type FalsyType = undefined | null | '' | 0 | false

export type ArrayLike<T> = {
  readonly [index: number]: T,
  readonly length: number
}
