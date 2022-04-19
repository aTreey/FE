module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks'],
  rules: {
    'react/self-closing-comp': ['error'],
    'react-hooks/rules-of-hooks': 'error', // 检查 Hook 的规则
    'react-hooks/exhaustive-deps': 'warn' // 检查 effect 的依赖
  }
};

// module.exports = {
//   root: true,
//   parser: '@typescript-eslint/parser',
//   extends: [
//     // 'airbnb-base',
//     'plugin:react/recommended',
//     '@react-native-community',
//     'plugin:prettier/recommended',
//     'plugin:react-hooks/recommended'
//   ],
//   settings: {
//     'import/resolver': {
//       node: {
//         extensions: ['.js', '.jsx', '.ts', '.tsx']
//       },
//       alias: {
//         map: [['src', './src']],
//         extensions: ['.js', '.jsx', '.ts', '.tsx']
//       }
//     }
//   },
//   plugins: [
//     // ...
//     'react-hooks'
//   ],
//   globals: {
//     NodeJS: true
//   },
//   rules: {
//     'no-param-reassign': 0,
//     'class-methods-use-this': 0,
//     'import/prefer-default-export': 0,
//     'react-native/no-inline-styles': 0,
//     'react-hooks/rules-of-hooks': 'error', // 检查 Hook 的规则
//     'react-hooks/exhaustive-deps': 'warn', // 检查 effect 的依赖
//     'prefer-destructuring': [
//       'error',
//       {
//         VariableDeclarator: {
//           array: false,
//           object: true
//         },
//         AssignmentExpression: {
//           array: false,
//           object: false
//         }
//       },
//       {
//         enforceForRenamedProperties: false
//       }
//     ],
//     'import/extensions': ['error', 'never']
//   }
// }
