import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import analyze from 'rollup-plugin-analyzer'

function createOptions({ directory, target }) {
  return [
    {
      input: 'src/index.ts'
    , output: createOutput('index')
    , plugins: [
        typescript({ target })
      , json()
      , resolve({ browser: true })
      , commonjs()
      , analyze({ summaryOnly: true })
      ]
    }
  , {
      input: 'src/index.ts'
    , output: createMinification('index')
    , plugins: [
        typescript({ target })
      , json()
      , resolve({ browser: true })
      , commonjs()
      , terser()
      ]
    }
  ]

  function createOutput(name) {
    return [
      {
        file: `dist/${directory}/${name}.mjs`
      , format: 'es'
      , sourcemap: true
      }
    ,
    , {
        file: `dist/${directory}/${name}.umd.js`
      , format: 'umd'
      , name: 'WaitFor'
      , sourcemap: true
      }
    ]
  }

  function createMinification(name) {
    return [
      {
        file: `dist/${directory}/${name}.min.mjs`
      , format: 'es'
      , sourcemap: true
      }
    ,
    , {
        file: `dist/${directory}/${name}.umd.min.js`
      , format: 'umd'
      , name: 'WaitFor'
      , sourcemap: true
      }
    ]
  }
}

export default [
  ...createOptions({
    directory: 'es2015'
  , target: 'ES2015'
  })
, ...createOptions({
    directory: 'es2018'
  , target: 'ES2018'
  })
]
