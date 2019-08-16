import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';

export default [
	{
		input: './lib/index.js',
		output: {
			name: 'useFeathers',
			file: pkg.browser,
			format: 'umd'
		},
		plugins: [
			resolve(),
			commonjs({
				include: 'node_modules/**'
			})
		],
		external: [
			'react'
		],
	},
	{
		input: './lib/index.js',
		external: ['ms'],
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
		]
	}
];