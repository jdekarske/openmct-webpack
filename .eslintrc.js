module.exports = {
    env: {
        "browser": true,
        "es6": true,
    },
    extends: [
        'plugin:vue/essential',
        'eslint:recommended'
    ],
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: "babel-eslint",
        allowImportExportEverywhere: true,
        ecmaVersion: 2015,
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
