import { ObjectTypeNames, objectTypeNames } from "./types";

export function isObjectTypeName(name: unknown): name is ObjectTypeNames {
	return objectTypeNames.includes(name as ObjectTypeNames);
}
