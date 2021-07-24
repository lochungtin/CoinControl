import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { Platform } from "react-native";
import PushNotification, { ReceivedNotification } from 'react-native-push-notification';

class NotificationHandler {
    attachRegister = (Handler: any) => this.onRegister = Handler;

    attachNotification = (Handler: any) => this.onNotification = Handler;

    onNotification = (notification: Omit<ReceivedNotification, "userInfo">) => notification.finish(PushNotificationIOS.FetchResult.NoData);

    onRegister = (token: { os: string, token: string }) => { }

    onRegistrationError = (err: any) => console.log(err);
}

const Handler = new NotificationHandler();

PushNotification.configure({
    onRegister: Handler.onRegister.bind(Handler),
    onNotification: Handler.onNotification.bind(Handler),
    onRegistrationError: Handler.onRegistrationError.bind(Handler),
    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },
    popInitialNotification: true,
    requestPermissions: Platform.OS === 'ios',
});

export default Handler;
