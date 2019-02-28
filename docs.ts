import { main } from 'docs-ts'
import { defaultOptions } from 'docs-ts/lib/check'
const pkg = require('./package.json')

const srcDir = 'src/**/*.ts'
const outDir = 'docs'
const doTypeCheckExamples = true
const options = { ...defaultOptions, noUnusedParameters: false }
main(srcDir, outDir, doTypeCheckExamples, pkg.name, options).run()
