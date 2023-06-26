import { FalsyType, PrimitiveType, PrimitiveTypeName, ObjectTypeNames, ArrayLike } from '../.internal/types';
import { isObjectTypeName } from '../.internal/utils';

const { toString } = Object.prototype;

function getTypeOf<T extends PrimitiveType | Function>(type: PrimitiveTypeName | 'function') {
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

function validArrayLength(length: number) {
  // length must be an positive integer
  return length > -1 && length < Number.MAX_SAFE_INTEGER && length % 1 === 0
}

export default function u(inputValue: unknown) {

}




u.isString = getTypeOf<string>('string');

const isNumberType = getTypeOf<number>('number');
u.isNumber = (value: unknown): value is number => isNumberType(value) && !u.isNaN(value);

u.isBoolean = (value: unknown): value is boolean => value === true || value === false

u.isFunction = getTypeOf<Function>('function');

u.isNullable = (value: unknown): value is undefined | null => value === undefined || value === null;

u.isArray = (value: unknown) => Array.isArray(value);
u.isEmptyArray = (value: unknown): value is unknown[] => u.isArray(value) && (value as unknown[]).length === 0;
u.isNotEmptyArray = (value: unknown): value is unknown[] => u.isArray(value) && (value as unknown[]).length > 0;

u.isArrayLike = <T>(value: unknown): value is ArrayLike<T> => {
  return u.isNonNullable(value) && validArrayLength((value as ArrayLike<T>).length)
}

u.isObject = (value: unknown): value is object => !u.isNull(value) && (typeof value === 'object' || typeof value === 'function')

u.isFalsy = <T>(value: T | FalsyType): value is FalsyType => !value;
u.isTruthy = <T>(value: T | FalsyType): value is T => Boolean(value);

u.isNull = (value: unknown): value is null => value === null;
u.isNonNullable = <T>(value: T) => value !== undefined && value !== null;

u.isNaN = (value: unknown): value is unknown => Number.isNaN(value);

const nativePromise = <T extends unknown>(value: unknown): value is Promise<T> => isObjectType<Promise<T>>('Promise')(value);

const thenablePromise = <T extends unknown>(value: unknown): value is Promise<T> => u.isObject((value as Promise<T>)?.then)
u.isPromise = <T>(value: unknown): value is Promise<T> => nativePromise(value) || thenablePromise(value)

