module.exports = {
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        'ignoreAtRules': [
          'extend',
          'extends',
          'tailwind',
          'define-mixin',
          '@add-mixin'
        ]
      }
    ]
  }
}
