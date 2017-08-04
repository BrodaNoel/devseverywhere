// @flow
// Just truncate a number
export default (number: number, digits: number = 0): number => {
  const multiplier = Math.pow(10, digits);
  const adjustedNum = number * multiplier;
  const truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);
  return truncatedNum / multiplier;
};
