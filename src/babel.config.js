module.exports = {
  presets: ["@babel/preset-react"],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    ["import", { libraryName: "antd", style: true }, "ant"],
    [
      "import",
      { libraryName: "antd-mobile", libraryDirectory: "lib" },
      "antd-mobile"
    ]
  ]
};
