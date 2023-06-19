import { FalsyType, PrimitiveType, PrimitiveTypeName, ObjectToStringMap, ArrayLike } from '../.internal/types';
import { toString } from '../.internal/utils';

function getTypeOf<T extends PrimitiveType>(type: PrimitiveTypeName) {
  return (value: unknown): value is T => typeof value === type;
}

function validArrayLength<T>(length: number) {
  // length must be an positive integer
  return length > -1 && length < Number.MAX_SAFE_INTEGER && length % 1 === 0
}

export default function u(inputValue: unknown) {

}




u.isString = getTypeOf<string>('string');

u.isNumber = getTypeOf<number>('number');

u.isNullable = (value: unknown): value is undefined | null => value === undefined || value === null;

u.isArray = <T>(value: unknown) => Array.isArray(value);

u.isArrayLike = <T>(value: unknown): value is ArrayLike<T> => {
  return u.isNonNullable(value) && validArrayLength((value as ArrayLike<T>).length)
}






u.isFalsy = <T>(value: T | FalsyType): value is FalsyType => !value;

u.isNonNullable = <T>(value: T) => value !== undefined && value !== null;

