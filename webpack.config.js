const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "jw-project",
    projectName: "api",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    externals: [
      "moment",
      "firebase/app",
      "firebase/auth",
      "firebase/firestore",
      "rxjs",
    ],
  });
};
