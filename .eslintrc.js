module.exports = {
  parser: "@javascript-eslint/parser",
  plugins: ["@javascript-eslint", "import"],
  extends: [
    "airbnb-base",
    "plugin:@javascript-eslint/recommended",
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
    "prettier",
  ],
  settings: {
    "import/resolver": {
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    project: "./jsconfig.json",
    tsconfigRootDir: "./",
  },
  env: {
    es6: true,
    node: true,
  },
  rules: {
    "import/prefer-default-export": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "no-var": "error",
    semi: "error",
    camelcase: "error",
    eqeqeq: "error",
    indent: ["error", 2, { SwitchCase: 1 }],
    "no-multi-spaces": "error",
    "space-in-parens": "error",
    "no-multiple-empty-lines": "error",
    "no-duplicate-imports": "error",
    "no-use-before-define": [
      "error",
      {
        functions: true,
        classes: true,
        variables: true,
        allowNamedExports: false,
      },
    ],
  },
};
