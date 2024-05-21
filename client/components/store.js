import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
PushNotification.configure({
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },

  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);

    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);

  },

  onRegistrationError: function(err) {
    console.error(err.message, err);
  },

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },


  popInitialNotification: true,


  requestPermissions: true,
});
testush =()=>{
    PushNotification.localNotification({
        title: "My Notification Title", // (optional)
        message: "My Notification Message", // (required)
      });

}