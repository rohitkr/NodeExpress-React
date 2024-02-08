const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('path');

module.export = {
  webpack: {
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: "publics/index.html",
        nonce: "C7Jo9Ot7OGp36jCfSpoTKw==", // Generate a random nonce value
      }),  
    ],
  },
};
