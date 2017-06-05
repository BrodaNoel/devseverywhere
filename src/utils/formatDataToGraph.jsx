export default (data, x, y) => data.map((value, index) => ({[x]: index, [y]: value}));;
