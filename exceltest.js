// 引用模块
let xlsx = require('node-xlsx');
let fs = require('fs');

//输入数据格式：数组：数组里一个对象对应excel的一页：对象里name是页名、data是数据：data数组里一个数组代表一行
let excelArr = [
  {
    //data里面是数据，一个数组一行
    //column这一行是因为例子里需要一个头
    name: 'sheet',
    data: [
      ['column', 'column2', 'column3', 'column4'],
      ['值1', 2, 3, 4],
      [3, 2, 3, 4],
    ],
  },
];

let xlsxBuildArr = [
  {
    name: '一班',
    data: [
      ['姓名', '年龄'],
      ['张三', 18],
      ['李四', 19],
    ],
  },
  {
    name: '二班',
    data: [
      ['姓名', '年龄'],
      ['王五', 18],
      ['刘六', 18],
    ],
  },
];

let excelData = [
  // 第一个sheet内容
  {
    name: '我是sheet1', // 给第一个sheet指名字
    data: [
      // 注意，这里是一个二维数组
      ['姓名', '年龄', '家乡', '备注'], // 第一行
      ['孙悟空', '500', '花果山', '人送外号斗战胜佛'], // 第二行
      ['猪八戒', '88', '高老庄', '天蓬元帅'], // 第三行
    ],
  },
  // 第二个sheet内容
  {
    name: '我是sheet2', // 给第二个sheet指名字
    data: [
      ['城市', '国家', '人口', '经济水平'], // 同上
      ['上海', '中国', '14亿', '越来越好'],
      ['伦敦', '英国', '7000万', '还行'],
      ['华盛顿', '美国', '3.4亿', '凑活'],
    ],
  },
];

const data = [
  [1, 2, 3],
  [true, false, null, 'sheetjs'],
  ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'],
  ['baz', null, 'qux'],
];
const sheetOptions = {'!cols': [{wch: 6}, {wch: 7}, {wch: 10}, {wch: 2000}]};
// xlsx转化成二进制
let buffer = xlsx.build([{name: 'mySheetName', data: data}], sheetOptions);
//fs模块写入文件
fs.writeFile(`./文件名.xlsx`, buffer, function (err) {
  if (err) throw err;
  console.log('写入到文件结束.');
});
//xlsx.parse方法获取excel文件内容
// var sheets = xlsx.parse('./11111111111.xlsx'); //获取到所有sheets
// console.log('22222222222222:', sheets); // [ { name: 'sheet1', data: [ [Array], [Array] ] } ]
