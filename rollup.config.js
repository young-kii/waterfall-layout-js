import typescript from '@rollup/plugin-typescript';
import babel from 'rollup-plugin-babel';
import { terser } from "rollup-plugin-terser";

const buildTime = new Date().toLocaleString();

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.cjs',
        format: 'cjs',
        sourcemap: false,
        footer: `window.WATERFALL_LAYOUT_BUILD_TIME = "${buildTime}";`
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: false,
        footer: `window.WATERFALL_LAYOUT_BUILD_TIME = "${buildTime}";`
      },
      {
        file: 'dist/index.min.js',
        format: 'umd',
        name: 'WaterfallLayout',
        sourcemap: false,
        footer: `window.WATERFALL_LAYOUT_BUILD_TIME = "${buildTime}";`
      },
    ],
    plugins: [
      typescript({ tsconfig: './tsconfig.json' }),
      babel({
        exclude: "node_modules/**",
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }),
      terser()
    ],
  }
];
