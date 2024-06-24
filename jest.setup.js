// import mockRNDeviceInfo from "react-native-device-info/jest/react-native-device-info-mock";
// import { NativeModules } from "react-native";

// // Mock Native Modules
// NativeModules.RNCPushNotificationIOS = {
//   addEventListener: jest.fn(),
//   removeEventListener: jest.fn(),
//   requestPermissions: jest.fn(),
//   getInitialNotification: jest.fn().mockResolvedValue(null),
// };

// Mock NativeEventEmitter
// jest.mock("react-native", () => {
//   const RN = jest.requireActual("react-native");
//   RN.NativeEventEmitter = class {
//     constructor() {}
//     addListener = jest.fn();
//     removeListener = jest.fn();
//     removeAllListeners = jest.fn();
//   };
//   return RN;
// });

// Mock react-native-push-notification
// jest.mock("react-native-push-notification", () =>
//   require("./__mocks__/react-native-push-notification")
// );
