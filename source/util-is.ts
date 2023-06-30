import type { FalsyType, PrimitiveType, PrimitiveTypeNames, ObjectTypeNames, ArrayLike, TypeNames, Class } from '../.internal/types';
import { primitiveTypeNames } from '../.internal/types';
import { isObjectTypeName } from '../.internal/utils';

const { toString } = Object.prototype;

function getTypeOf<T extends PrimitiveType | Function>(type: PrimitiveTypeNames | 'function') {
  return (value: unknown): value is T => typeof value === type;
}

const getObjectType = (value: unknown): ObjectTypeNames | undefined => {
	const objectTypeName = toString.call(value).slice(8, -1);

	if (isObjectTypeName(objectTypeName)) {
		return objectTypeName;
	}

	return undefined;
};

const isObjectType = <T>(type: ObjectTypeNames) => (value: unknown): value is T => getObjectType(value) === type;

const isPrimiveteTypeName = (name: unknown): name is PrimitiveTypeNames => primitiveTypeNames.includes(name as PrimitiveTypeNames);

function validArrayLength(length: number) {
  // length must be an positive integer
  return length > -1 && length < Number.MAX_SAFE_INTEGER && length % 1 === 0
}

function u(value: unknown): TypeNames {
	if (value === null) {
		return 'null';
	}
	switch (typeof value) {
		case 'undefined': {
			return 'undefined';
		}
		case 'string': {
			return 'string';
		}
		case 'number': {
			return Number.isNaN(value) ? 'NaN' : 'number';
		}
		case 'boolean': {
			return 'boolean';
		}
		case 'function': {
			return 'Function';
		}
		case 'bigint': {
			return 'bigint';
		}
		case 'symbol': {
			return 'symbol';
		}
		default:
	}
	if (u.isArray(value)) {
		return 'Array';
	}
	if (u.isBuffer(value)) {
		return 'Buffer';
	}
	const tagType = getObjectType(value);
	if (tagType) {
		return tagType;
	}
	if (value instanceof String || value instanceof Boolean || value instanceof Number) {
		throw new TypeError('Please don\'t use object wrappers for primitive types');
	}
	return 'Object';
}


u.isString = getTypeOf<string>('string');
u.isEmptyString = (value: unknown): value is string => u.isString(value) && value.length === 0;

const isNumberType = getTypeOf<number>('number');
u.isNumber = (value: unknown): value is number => isNumberType(value) && !u.isNaN(value);

u.isBigInt = getTypeOf<bigint>('bigint');

u.isBoolean = (value: unknown): value is boolean => value === true || value === false

u.isFunction = getTypeOf<Function>('function');
u.isAsyncFunction = <T extends (...args: unknown[]) => unknown>(value: T) => getObjectType(value) === 'AsyncFunction';
u.isGeneratorFunction = <T extends (...args: unknown[]) => unknown>(value: T) => getObjectType(value) === 'GeneratorFunction';

u.isClass = (value: unknown): value is Class => u.isFunction(value) && value.toString().startsWith('class ');

u.isSymbol = getTypeOf<symbol>('symbol');

u.isIterable = (value: any) => {
  if (value?.[Symbol.iterator]) return true;

  let proto = Object.getPrototypeOf(value);

  while (proto) {
    if (proto?.[Symbol.iterator]) return true;

    proto = Object.getPrototypeOf(proto);
  }

  return false;
}

u.isNullable = (value: unknown): value is undefined | null => value === undefined || value === null;

u.isArray = (value: unknown) => Array.isArray(value);
u.isEmptyArray = (value: unknown): value is unknown[] => u.isArray(value) && (value as unknown[]).length === 0;
u.isNonEmptyArray = (value: unknown): value is unknown[] => u.isArray(value) && (value as unknown[]).length > 0;

u.isArrayLike = <T>(value: unknown): value is ArrayLike<T> => {
  return u.isNonNullable(value) && validArrayLength((value as ArrayLike<T>).length)
}

u.isObject = (value: unknown): value is object => !u.isNull(value) && (typeof value === 'object' || typeof value === 'function')

u.isPlainObject = (value: unknown) => {
  if (typeof value !== 'object' || value === null) return false;

  if (Object.getPrototypeOf(value) === null) return true;

  let proto = value;
  while(Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return  Object.getPrototypeOf(value) === proto;
}

u.isFalsy = <T>(value: T | FalsyType): value is FalsyType => !value;
u.isTruthy = <T>(value: T | FalsyType): value is T => Boolean(value);

u.isNull = (value: unknown): value is null => value === null;
u.isUndefined = (value: unknown): value is undefined => value === undefined;
u.isNonNullable = <T>(value: T) => value !== undefined && value !== null;

u.isNaN = (value: unknown): value is unknown => Number.isNaN(value);

const nativePromise = <T extends unknown>(value: unknown): value is Promise<T> => isObjectType<Promise<T>>('Promise')(value);
const thenablePromise = <T extends unknown>(value: unknown): value is Promise<T> => u.isObject((value as Promise<T>)?.then)
u.isPromise = <T>(value: unknown): value is Promise<T> => nativePromise(value) || thenablePromise(value)

u.isRegExp = isObjectType<RegExp>('RegExp');

u.isDate = isObjectType<Date>('Date');

u.isError = isObjectType<Error>('Error');

u.isMap = <Key = unknown, Value = unknown>(value: unknown): value is Map<Key, Value> => isObjectType<Map<Key, Value>>('Map')(value)
u.isEmptyMap = (value: unknown): value is Map<unknown, unknown> => u.isMap(value) && value.size === 0;
u.isNonEmptyMap = (value: unknown): value is Map<unknown, unknown> => u.isMap(value) && value.size > 0;

u.isSet = <Value = unknown>(value: unknown): value is Set<Value> => isObjectType<Set<Value>>('Set')(value);
u.isEmptySet = (value: unknown): value is Set<unknown> => u.isSet(value) && value.size === 0;
u.isNonEmptySet = (value: unknown): value is Set<unknown> => u.isSet(value) && value.size > 0;

u.isWeakMap = <Key extends object, Value>(value: unknown): value is WeakMap<Key, Value> => isObjectType<WeakMap<Key, Value>>('WeakMap')(value);

u.isWeakSet = <Value extends object>(value: unknown): value is WeakSet<Value> => isObjectType<WeakSet<Value>>('WeakSet')(value);

u.isWeakRef = <Value extends object>(value: unknown): value is WeakRef<Value> => isObjectType<WeakRef<Value>>('WeakRef')(value);

// input value could be null rather than 'null'
u.isPrimitive = (value: unknown): value is PrimitiveType => isPrimiveteTypeName(value) || u.isNull(value)

u.isInt8Array = isObjectType<Int8Array>('Int8Array');
u.isUint8Array = isObjectType<Uint8Array>('Uint8Array');
u.isInt16Array = isObjectType<Int16Array>('Int16Array');
u.isUint16Array = isObjectType<Uint16Array>('Uint16Array');
u.isInt32Array = isObjectType<Int32Array>('Int32Array');
u.isUint32Array = isObjectType<Uint32Array>('Uint32Array');
u.isFloat32Array = isObjectType<Float32Array>('Float32Array');
u.isFloat64Array = isObjectType<Float64Array>('Float64Array');
u.isBigInt64Array = isObjectType<BigInt64Array>('BigInt64Array');
u.isBigUint64Array = isObjectType<BigUint64Array>('BigUint64Array');

u.isInteger = (value: unknown): value is number => Number.isInteger(value as number);

u.isSafeInteger = (value: unknown): value is number => Number.isSafeInteger(value as number);

u.isBuffer = (value: unknown): value is Buffer => Buffer.isBuffer(value);

u.isBlob = (value: unknown): value is Blob => isObjectType<Blob>('Blob')(value);

u.isInfinite = (value: unknown): value is Number => Number.POSITIVE_INFINITY === value || Number.NEGATIVE_INFINITY === value;

export default u;
