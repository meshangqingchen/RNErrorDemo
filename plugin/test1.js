module.exports = () => {
  return {
    visitor: {
      Identifier(path) {
        console.log('===', path.node.name);
      },
    },
  };
};
