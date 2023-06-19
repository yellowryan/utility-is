const primitiveTypeNames = [
	'null',
	'undefined',
	'string',
	'number',
	'bigint',
	'boolean',
	'symbol',
] as const;

const objectToStringMap = [
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
  'Function'
] as const

export type PrimitiveTypeName = typeof primitiveTypeNames[number];
export type ObjectToStringMap = typeof objectToStringMap[number]

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
