module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "quotes": [1, "single"], // 校验是否使用单引号
    "space-before-function-paren": 0, // function 前不校验空格
    "comma-dangle": ['error', 'always-multiline'], // 允许尾随逗号 and '] }' 同行时不出现尾随逗号
  }
}
