import PushNotification from "react-native-push-notification";

// Create a notification channel (only for Android)
PushNotification.createChannel(
  {
    channelId: "test-channel-id", // Unique ID for the test channel
    channelName: "Test Channel", // Name of the channel
    channelDescription: "A test channel for app notifications", // Optional description
    importance: PushNotification.Importance.HIGH, // Importance level
    // vibrate: true, // Default vibration
  },
  (created) => {
    console.log(`createChannel (test-channel-id) returned '${created}'`);
    if (!created) {
      console.error('Failed to create test notification channel.');
    }
  }
);

// Function to show an immediate notification
const Shownotif = (title, message) => {
  PushNotification.localNotification({
    channelId: "test-channel-id", // Use the test channel ID
    title: title,
    message: message,
  });
};

// Function to schedule a notification
const handlesc = (title, message) => {
  PushNotification.localNotificationSchedule({
    channelId: "test-channel-id", // Use the test channel ID
    title: title,
    message: message,
    date: new Date(Date.now() + 5 * 1000), // Schedule 5 seconds from now
  });
};

// Function to cancel all notifications
const handleCancel = () => {
  PushNotification.cancelAllLocalNotifications();
};

// Export the functions
export { Shownotif, handlesc, handleCancel };
