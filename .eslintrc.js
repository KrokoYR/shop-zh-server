module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin', 'import', 'react-hooks'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier',
        'prettier/@typescript-eslint',
    ],
    root: true,
    env: {
        browser: true,
        amd: true,
        node: true,
        es6: true,
        jest: true,
    },
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'internal'],
                'newlines-between': 'always-and-inside-groups',
            },
        ],
        '@typescript-eslint/camelcase': 0,
    },
};
