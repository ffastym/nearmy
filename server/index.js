require('ignore-styles')
require('@babel/polyfill')
require('@babel/register')({
  ignore: [ /(node_modules)/ ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import'
  ],
  presets: ['@babel/preset-env', '@babel/preset-react']
})

require('./app')
