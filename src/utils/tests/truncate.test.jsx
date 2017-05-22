import { utils } from '../utils';

it('truncate positive numbers with 1 decimal', () => {
  expect(utils.truncate(1.1, 1)).toEqual(1.1);
  expect(utils.truncate(1.01, 1)).toEqual(1.0);
  expect(utils.truncate(0.01, 1)).toEqual(0.0);
});

it('truncate positive numbers with 2 decimal', () => {
  expect(utils.truncate(1.11, 2)).toEqual(1.11);
  expect(utils.truncate(1.011, 2)).toEqual(1.01);
  expect(utils.truncate(0.011, 2)).toEqual(0.01);
});

it('truncate positive numbers with no decimals', () => {
  expect(utils.truncate(1.1)).toEqual(1);
  expect(utils.truncate(1.01)).toEqual(1);
  expect(utils.truncate(0.01)).toEqual(0);
});

it('truncate negative numbers with 1 decimal', () => {
  expect(utils.truncate(-1.1, 1)).toEqual(-1.1);
  expect(utils.truncate(-1.01, 1)).toEqual(-1.0);
  expect(utils.truncate(-0.01, 1)).toEqual(-0.0);
});

it('truncate negative numbers with 2 decimal', () => {
  expect(utils.truncate(-1.11, 2)).toEqual(-1.11);
  expect(utils.truncate(-1.011, 2)).toEqual(-1.01);
  expect(utils.truncate(-0.011, 2)).toEqual(-0.01);
});

it('truncate negative numbers with no decimals', () => {
  expect(utils.truncate(-1.1)).toEqual(-1);
  expect(utils.truncate(-1.01)).toEqual(-1);
  expect(utils.truncate(-0.01)).toEqual(-0);
});
