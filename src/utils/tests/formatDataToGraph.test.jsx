import utils from '../../utils';

it('usual data', () => {
  const data = [10, 30, 50];

  const expected = [
    { i: 0, points: 10 },
    { i: 1, points: 30 },
    { i: 2, points: 50 }
  ];

  expect(utils.formatDataToGraph(data, 'i', 'points')).toEqual(expected);
});

it('no data', () => {
  const data = [];
  const expected = [];
  expect(utils.formatDataToGraph(data, 'i', 'points')).toEqual(expected);
});

it('one data set', () => {
  const data = [0];
  const expected = [ { i: 0, points: 0 } ];
  expect(utils.formatDataToGraph(data, 'i', 'points')).toEqual(expected);
});

it('mixed data', () => {
  const data = [-10, 'Broda Noel', 1.9];
  const expected = [
    { index: 0, data: -10 },
    { index: 1, data: 'Broda Noel' },
    { index: 2, data: 1.9 },
  ];
  expect(utils.formatDataToGraph(data, 'index', 'data')).toEqual(expected);
});
