// @flow
export default (data: Array<number>, x: number, y: number) => data.map((value, index) => ({[x]: index, [y]: value}));;
