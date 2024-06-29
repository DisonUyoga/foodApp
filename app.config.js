// {
//   "expo": {
//     "name": "PizzaPerk",
//     "slug": "PizzaPerk",
//     "version": "1.0.0",
//     "orientation": "portrait",
//     "icon": "./assets/images/admin.png",
//     "scheme": "myapp",
//     "userInterfaceStyle": "automatic",
//     "splash": {
//       "image": "./assets/images/admin.png",
//       "resizeMode": "contain",
//       "backgroundColor": "#ffffff"
//     },
//     "ios": {
//       "supportsTablet": true
//     },
//     "android": {
//       "package": "com.disonobudho.PizzaPerk",
//       "googleServicesFile": "",
//       "adaptiveIcon": {
//         "foregroundImage": "./assets/images/adaptive-icon.png",
//         "backgroundColor": "#ffffff"
//       }
//     },
//     "web": {
//       "proxy": "http://localhost:8000",
//       "bundler": "metro",
//       "output": "static",
//       "favicon": "./assets/images/admin.png"
//     },
//     "plugins": [
//       "expo-router",
//       "@react-native-google-signin/google-signin",
//       "expo-secure-store"
//     ],
//     "experiments": {
//       "typedRoutes": true,
//       "tsconfigPaths": true
//     },
//     "extra": {
//       "router": {
//         "origin": false
//       },
//       "eas": {
//         "projectId": "6cf35def-887d-4e92-bda0-f7bd1f63e38a"
//       }
//     }
//   }
// }

module.exports = {
  expo: {
    name: "PizzaPerk",
    slug: "PizzaPerk",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/admin.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/admin.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      package: "com.disonobudho.PizzaPerk",
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON || "",
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      proxy: "http://localhost:8000",
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/admin.png",
    },
    plugins: [
      "expo-router",
      "@react-native-google-signin/google-signin",
      "expo-secure-store",
    ],
    experiments: {
      typedRoutes: true,
      tsconfigPaths: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: "6cf35def-887d-4e92-bda0-f7bd1f63e38a",
      },
    },
  },
};
