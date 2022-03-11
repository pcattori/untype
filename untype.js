const babel = require("@babel/core")
const prettier = require("prettier")

function untype(filename, ts) {
  const { code: js } = babel.transformSync(ts, {
    filename,
    presets: [
      ["@babel/preset-typescript", { jsx: "preserve" }]
    ],
    plugins: [
      "@babel/plugin-syntax-jsx"
    ],
    compact: false,
    retainLines: true,
  });

  /*
   Babel's `compact` and `retainLines` options are both bad at formatting code.
   Use Prettier for nicer formatting.
  */
  return prettier.format(js, { parser: 'babel-ts'})
}

module.exports = {
  untype
}