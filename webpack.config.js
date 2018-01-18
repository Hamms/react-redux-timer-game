module.exports = {
  entry: "./src/entry.js",
  output: {
    filename: "./build/bundle.js"
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: "babel-loader",
    }]
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  stats: {
    colors: true
  },
  devtool: 'source-map',
  devServer: { inline: true }
};
