import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from 'react-native-push-notification';

class NotificationHandler {
    onNotification = notification => {
        console.log('NotificationHandler:', notification);

        if (typeof this._onNotification === 'function')
            this._onNotification(notification);

        notification.finish(PushNotificationIOS.FetchResult.NoData);
    }

    onRegister = token => {
        console.log('NotificationHandler:', token);

        if (typeof this._onRegister === 'function')
            this._onRegister(token);
    }

    onAction = notification => {
        console.log('Notification action received:');
        console.log(notification.action);
        console.log(notification);

        if (notification.action === 'Yes')
            PushNotification.invokeApp(notification);
    }

    onRegistrationError = err => console.log(err);

    attachRegister = handler => this._onRegister = handler;

    attachNotification = handler => this._onNotification = handler;
}

const handler = new NotificationHandler();

PushNotification.configure({
    onRegister: handler.onRegister.bind(handler),

    onNotification: handler.onNotification.bind(handler),

    onAction: handler.onAction.bind(handler),

    onRegistrationError: handler.onRegistrationError.bind(handler),

    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },

    popInitialNotification: true,

    requestPermissions: true,
});

export default handler;