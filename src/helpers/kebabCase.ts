import { kebabCase } from "lodash";

export const transformObjectToKebabCase = (obj: any) =>
  Object.keys(obj).reduce(
    (acc, key) => ({ ...acc, [kebabCase(key)]: obj[key] }),
    {}
  );
