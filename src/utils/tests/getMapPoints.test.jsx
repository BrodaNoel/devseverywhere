import utils from '../utils';

it('positive coors', () => {
  const coors = [
    [10, 10],
    [10, 20],
    [20, 10],
    [20, 20],
  ];

  const expected = {
    lng: 15,
    lat: 15
  }
  expect(utils.getMapPoint(coors)).toEqual(expected);
});

it('negative coors', () => {
  const coors = [
    [-10, -10],
    [-10, -20],
    [-20, -10],
    [-20, -20],
  ];

  const expected = {
    lng: -15,
    lat: -15
  }
  expect(utils.getMapPoint(coors)).toEqual(expected);
});

it('point coors', () => {
  const coors = [
    [10, 10],
    [10, 10],
    [10, 10],
    [10, 10],
  ];

  const expected = {
    lng: 10,
    lat: 10
  }
  expect(utils.getMapPoint(coors)).toEqual(expected);
});

it('cero coors', () => {
  const coors = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ];

  const expected = {
    lng: 0,
    lat: 0
  }
  expect(utils.getMapPoint(coors)).toEqual(expected);
});
