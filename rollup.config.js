import typescript from '@rollup/plugin-typescript';
import babel from 'rollup-plugin-babel';
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.cjs',
        format: 'cjs',
        sourcemap: false,
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: false,
      },
      {
        file: 'dist/index.min.js',
        format: 'umd',
        name: 'WaterfallLayout',
        sourcemap: false,
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
