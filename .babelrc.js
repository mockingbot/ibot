module.exports = {
  presets: [
    [ '@babel/preset-env', { forceAllTransforms: true, modules: false } ],
    [ '@babel/preset-react', { runtime: 'automatic' } ]
  ],
  plugins: [
    [ '@babel/plugin-transform-runtime', {
      absoluteRuntime: false,
      corejs: false, // wait global patch
      helpers: true, // transform inline helper to require()
      regenerator: true, // use delegated, instead of global `regenerator-runtime`
      useESModules: true, // enable for webpack/rollup
      version: '^7.12' // to get most helpers, or some newer helper will not be move out like `objectSpread2`
    } ],
    [ '@babel/plugin-proposal-class-properties' ],
    [ '@babel/plugin-proposal-export-default-from' ],
    [ '@babel/plugin-proposal-export-namespace-from' ]
  ]
}
