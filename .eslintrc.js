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
    parser: "vue-eslint-parser",
    parserOptions: {
        // parser: "babel-eslint",
        allowImportExportEverywhere: true,
        ecmaVersion: 6,
        requireConfigFile: false,
        ecmaFeatures: {
            impliedStrict: true
        }
    },
    plugins: [
        'vue',
        '@babel'
    ],
    rules: {
        'vue/multi-word-component-names': 0,
    }
}
