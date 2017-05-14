export const utils = {
  truncate(number, digits) {
    const multiplier = Math.pow(10, digits);
    const adjustedNum = number * multiplier;
    const truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);
    return truncatedNum / multiplier;
  }
};
