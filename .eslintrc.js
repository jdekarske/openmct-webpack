module.exports = {
    env: {
        browser: true,
        es6: true,
        node:true,
    },
    extends: [
        'plugin:vue/essential',
        'eslint:recommended'
    ],
    // need vue in here somewhere
    parser: "@babel/eslint-parser",
    parserOptions: {
        allowImportExportEverywhere: true,
        ecmaVersion: 6,
        requireConfigFile: false,
        ecmaFeatures: {
            impliedStrict: true
        }
    },
    plugins: [
        'vue'
    ],
    rules: {
    }
}
