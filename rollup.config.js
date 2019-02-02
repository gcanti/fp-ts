import del from 'rollup-plugin-delete';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
  plugins: [
    del({ targets: 'lib/*' }),
    typescript({
      typescript: require('typescript')
    }),
    terser()
  ]
}
