module.exports = {
    // `true` is better because people can configure their tab width to anything
    // they want (2, 4, or 8), but the code base is currently using 4 space tab so
    // that's what I configured here.
    useTabs: false,
    tabWidth: 4,

    semi: false,
    singleQuote: true,
    trailingComma: 'all',
    bracketSpacing: false,
    arrowParens: 'avoid',
    printWidth: 120,

    overrides: [{files: '*.md', options: {tabWidth: 2}}],
}
