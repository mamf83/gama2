const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'gama.dev.js',
    globalObject: 'this',
    library: {
      name: 'Gama',
      type: 'umd',
    }
  }
};