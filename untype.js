const babel = require("@babel/core")

function untype(filename, ts) {
  const { code: js } = babel.transformSync(ts, {
    filename,
    presets: [
      ["@babel/preset-typescript", { jsx: "preserve"}]
    ],
    plugins: [
      "@babel/plugin-syntax-jsx"
    ],
    compact: false,
    retainLines: true,
  });

  /*
   TODO:
   Babel `compact`/`retainLines` are both imperfect at formatting code.
  
   We could lint-fix or format the js at this point,
   but users who care about that sort of stuff should set up their own lint/formatting
   and run `--fix` or `--write` themselves.

   Though might be nice to provide an output that at least _we_ think looks good...
   */

  // For now, just replace multiple blank lines with a single one
  return js.replace(/\n\s*\n\s*\n/g, '\n\n')
}

module.exports = {
  untype
}