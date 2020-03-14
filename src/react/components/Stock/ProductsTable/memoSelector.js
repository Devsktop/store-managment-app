/* eslint-disable no-void */
import { createSelectorCreator } from 'reselect';
//  Code copied from github to create a selector that does not
//  make unnecesary when returned array or object its equal even
//  When the array reference is diferent.
function defaultEqualityCheck(currentVal, previousVal) {
  return currentVal === previousVal;
}

function shallowEqual(objA, objB, compare, compareContext) {
  let ret = compare ? compare.call(compareContext, objA, objB) : void 0;

  if (ret !== void 0) {
    return !!ret;
  }

  if (objA === objB) {
    return true;
  }

  if (typeof objA !== 'object' || !objA || typeof objB !== 'object' || !objB) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  const bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

  // Test for A's keys different from B.
  for (let idx = 0; idx < keysA.length; idx += 1) {
    const key = keysA[idx];

    if (!bHasOwnProperty(key)) {
      return false;
    }

    const valueA = objA[key];
    const valueB = objB[key];

    ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;

    if (ret === false || (ret === void 0 && valueA !== valueB)) {
      return false;
    }
  }

  return true;
}

function resultCheckMemoize(
  func,
  resultCheck = defaultEqualityCheck,
  argsCheck = defaultEqualityCheck
) {
  let lastArgs = null;
  let lastResult = null;
  return (...args) => {
    if (
      lastArgs !== null &&
      lastArgs.length === args.length &&
      args.every((value, index) => argsCheck(value, lastArgs[index]))
    ) {
      return lastResult;
    }
    lastArgs = args;
    const result = func(...args);
    // eslint-disable-next-line no-return-assign
    return resultCheck(lastResult, result) ? lastResult : (lastResult = result);
  };
}

const memoSelector = createSelectorCreator(
  resultCheckMemoize,
  shallowEqual,
  defaultEqualityCheck
);

export default memoSelector;
