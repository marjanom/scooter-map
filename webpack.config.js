// Import necessary node modules for configuration
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  // Define the entry point of the application
  entry: './src/ts/main.ts',

  // Output configuration for the compiled files
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  // Resolving file extensions to enable importing without specifying extension
  resolve: {
    extensions: ['.ts', '.js']
  },

  // Module rules for transforming source files before bundling
  module: {
    rules: [
      // Rule for TypeScript files using ts-loader
      {
        test: /\.ts$/, // Matches any .ts files
        use: 'ts-loader',
        exclude: /node_modules/
      },
      // Rule for CSS files using style-loader and css-loader
      {
        test: /\.css$/, // Matches any .css files
        use: ['style-loader', 'css-loader']
      },
      // Rule for image & font files using url-loader
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|eot|ttf|otf)$/i, // Matches image & font files
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // Files smaller than 8 KB will be converted to base64 URIs
              name: 'assets/[name].[hash:7].[ext]', // Output path for files larger than the limit
            },
          },
        ],
      },
    ]
  },

  // Configuration for plugins used in the build process
  plugins: [
    // Plugin to clean the output directory before each build
    new CleanWebpackPlugin(),
    // Plugin to generate an HTML file that includes the webpack bundles
    new HtmlWebpackPlugin({
      template: './src/html/index.html', // Path to the HTML template
      favicon: './src/assets/favicon.ico' // Path to favicon (optional)
    }),
      // instance for about.html
      new HtmlWebpackPlugin({
        template: './src/html/about.html',
        filename: 'about.html'
      }),
      // instance for contact.html
      new HtmlWebpackPlugin({
        template: './src/html/contact.html',
        filename: 'contact.html'
      }),

      new CopyPlugin({
        patterns: [
          { from: 'src/data', to: 'data' },
        ],
      }),
  ],

  performance: {
    hints: false, 
    maxEntrypointSize: 512000,
    maxAssetSize: 512000, 
  }
};