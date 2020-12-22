let mix = require('laravel-mix');

mix.webpackConfig({
  module: {
    rules: [
      {
        test: /\.txt$/i,
        use: 'raw-loader',
      },
    ],
  },
});

mix.js('src/fuerte.js', 'dist');
mix.js('src/fuerte-lib.js', 'dist')
mix.minify(['dist/fuerte.js', 'dist/fuerte-lib.js']);
