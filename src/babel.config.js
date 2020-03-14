module.exports = {
  presets: ["@babel/preset-react"],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    ["import", { libraryName: "antd", style: true }, "ant"]
  ]
};
