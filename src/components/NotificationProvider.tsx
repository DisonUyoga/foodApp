import { View, Text } from "react-native";
import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "../lib/notification";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token ?? ""))
      .catch((error: any) => setExpoPushToken(`${error}`));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });
    return () => {
      if (notificationListener.current) {
        notificationListener.current &&
          Notifications.removeNotificationSubscription(
            notificationListener.current
          );
      }
      if (responseListener.current) {
        responseListener.current &&
          Notifications.removeNotificationSubscription(
            responseListener.current
          );
      }
    };
  }, []);
  console.log("notif token", expoPushToken);
  console.log("notification", notification);
  return <>{children}</>;
};

export default NotificationProvider;
