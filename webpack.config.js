const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'gama.prod.js',
    globalObject: 'this',
    library: {
      name: 'Gama',
      type: 'umd',
    }
  }
};