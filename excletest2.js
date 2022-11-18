let xlsx = require('node-xlsx');
let fs = require('fs');
// Or var xlsx = require('node-xlsx').default;

// const dataSheet1 = [
//   [1, 2, 3],
//   [true, false, null, 'sheetjs'],
//   ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'],
//   ['baz', null, 'qux'],
// ];
// const dataSheet2 = [
//   [4, 5, 6],
//   [7, 8, 9, 10],
//   [11, 12, 13, 14],
//   ['baz', null, 'qux'],
// ];
// const range = {s: {c: 0, r: 0}, e: {c: 0, r: 3}}; // A1:A4
// const sheetOptions = {'!merges': [range]};

// var buffer = xlsx.build([
//   {name: 'myFirstSheet', data: dataSheet1},
//   {name: 'mySecondSheet', data: dataSheet2, options: sheetOptions},
// ]); // Retnide

const data = [
  [1, 2, 3],
  [true, false, null, 'sheetjs'],
  ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'],
  ['baz', null, 'qux'],
];
// 设置每一列宽度
const sheetOptions = {'!cols': [{wch: 50}, {wch: 100}, {wch: 150}, {wch: 200}]};

var buffer = xlsx.build([{name: 'mySheetName', data: data}], {sheetOptions}); // Returns a buffer

fs.writeFile(`./aa.xlsx`, buffer, function (err) {
  if (err) throw err;
  console.log('写入到文件结束.');
});
