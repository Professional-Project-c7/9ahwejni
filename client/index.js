/**
 * @format
 */
import { PaperProvider } from 'react-native-paper';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from "react-native-push-notification";
import { Platform } from 'react-native';
PushNotification.configure({
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },

  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);

    // notification.finish(PushNotificationIOS.FetchResult.NoData);
  },


  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

 
  popInitialNotification: true,


  requestPermissions: Platform.OS==='ios',
});

export default function Main() {
    return (
      <PaperProvider>
        <App />
      </PaperProvider>
    );
  }
  

  AppRegistry.registerComponent(appName, () => Main);