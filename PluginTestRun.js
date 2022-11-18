const {transformSync} = require('@babel/core');
const code = `
if ('Debug') {
  let a = 10;
  let b = 20;
  console.log(a + b);
}
`;
console.log('transformSync = ', transformSync);

const babelConfig = {
  //   presets: ['module:metro-react-native-babel-preset'],
  plugins: ['./plugin/test1.js'],
  configFile: false,
};
const output = transformSync(code, babelConfig);
console.log('output = ', output);
