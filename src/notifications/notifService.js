import PushNotification from 'react-native-push-notification';
import NotificationHandler from './notifHandler';

export default class NotifService {
    constructor(onRegister, onNotification) {
        this.lastId = 0;

        NotificationHandler.attachRegister(onRegister);
        NotificationHandler.attachNotification(onNotification);

        // Clear badge number at start
        PushNotification.getApplicationIconBadgeNumber(function (number) {
            if (number > 0) {
                PushNotification.setApplicationIconBadgeNumber(0);
            }
        });

        PushNotification.getChannels(function (channels) {
            console.log(channels);
        });
    }

    scheduleNotif = (time, color) => {
        this.lastId++;
        console.log('scheduled notif @ ' + new Date(time));
        PushNotification.localNotificationSchedule({
            date: new Date(time), // in 30 secs

            /* Android Only Properties */
            id: this.lastId, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
            autoCancel: true, // (optional) default: true
            largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
            smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
            color: color,
            vibrate: true, // (optional) default: true
            vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
            ongoing: false,
            invokeApp: false, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

            /* iOS only properties */
            alertAction: 'view', // (optional) default: view
            category: '', // (optional) default: empty string
            userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)

            /* iOS and Android properties */
            title: 'Daily Reminder', // (optional)
            message: "Don't forget to manage today's expense!", // (required)
            playSound: true,
            number: 10,
            soundName: 'default',
            repeatType: 'minute',
        });
    }

    cancelAll = () => {
        PushNotification.cancelAllLocalNotifications();
    }
}
