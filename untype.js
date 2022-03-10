const babel = require("@babel/core")

function untype(ts) {
  const { code: js } = babel.transformSync(ts, {
    plugins: [
      "@babel/plugin-syntax-jsx",
      ["@babel/plugin-transform-typescript", {
        jsx: "preserve",
        "onlyRemoveTypeImports": true,
      }],
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

  return js
}

module.exports = {
  untype
}