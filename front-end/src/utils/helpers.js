import { arrayCompare } from "../hooks/useDeepCompare"; 

export const withCache = (fn, cacheKey) => {
  return (...args) => {
    const prevArgs = withCache.cache[cacheKey]?.args || [];
    const prevResult = withCache.cache[cacheKey]?.result;

    const isSame = args.length === prevArgs.length && args.every((arg, i) => arrayCompare(arg, prevArgs[i]));

    if (isSame) {
      return prevResult;
    }

    const result = fn(...args);
    withCache.cache[cacheKey] = { args, result };
    return result;
  };
};

withCache.cache = {}; 
