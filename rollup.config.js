import babel from "rollup-plugin-babel";
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import postcss from 'rollup-plugin-postcss';

// PostCss plugins
import simplevars from 'postcss-simple-vars';
import nested from 'postcss-nested';
import cssnext from 'postcss-cssnext';
import cssnano from 'cssnano';

export default {
  entry: 'src/scripts/main.js',
  targets: [
    {
      dest: 'build/js/main.min.js',
    },
    {
      dest: 'docs/js/main.min.js',
    },
  ],
  format: 'iife',
  sourceMap: 'inline',
  plugins:[
    postcss({
      plugins:[
        simplevars(),
        nested(),
        cssnext({warnForDuplicates:false,}),
        cssnano(),
      ],
      extensions:['.css']
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    babel({
      exclude:'node_modules/**'
    }),
    eslint({
      exclude:[
        'src/styles/**'
      ]
    }),
    replace({
      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    (process.env.NODE_ENV === 'production' && uglify()),
  ]
};
