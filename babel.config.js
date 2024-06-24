// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      "babel-preset-expo","module:metro-react-native-babel-preset",
      ["@babel/preset-env", { targets: { node: "current" } }],
      "@babel/preset-typescript",
    ],
    plugins: ["nativewind/babel", "react-native-reanimated/plugin","@babel/plugin-transform-runtime"],
    
  };
};
