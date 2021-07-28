import fs from 'fs';
import path from 'path';
import { carmichaelFunction } from '../src';

const testData: { input: number; expected: number }[] = [];
const dataString = fs.readFileSync(
  path.join(__dirname, 'carmichaelTestData.txt')
);
const realString = dataString.toString();
console.log(realString);
const lines = realString.split('\n');
lines.forEach((line, lineIdx) => {
  const numbers = line.split(' ');
  numbers.forEach((number, i) => {
    if (!testData[i]) testData[i] = { input: 0, expected: 0 };
    if (lineIdx === 0) {
      testData[i].input = parseInt(number);
    } else {
      testData[i].expected = parseInt(number);
    }
  });
});

testData.forEach((data) => {
  test(`tries ${data.input} in carmichaelFunction`, () => {
    expect(carmichaelFunction(data.input)).toBe(data.expected);
  });
});
