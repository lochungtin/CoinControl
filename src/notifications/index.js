import PushNotification from 'react-native-push-notification';
import NotificationHandler from './NotifHandler';

export default class NotifService {
    constructor(onRegister, onNotification) {
        this.lastId = 0;
        this.lastChannelCounter = 0;

        this.createDefaultChannels();

        NotificationHandler.attachRegister(onRegister);
        NotificationHandler.attachNotification(onNotification);

        // Clear badge number at start
        PushNotification.getApplicationIconBadgeNumber(number => {
            if (number > 0)
                PushNotification.setApplicationIconBadgeNumber(0);
        });

        PushNotification.getChannels(channels => console.log(channels));
    }

    abandonPermissions = () => PushNotification.abandonPermissions();

    cancelAll = () => PushNotification.cancelAllLocalNotifications();

    cancelNotif = () => PushNotification.cancelLocalNotifications({ id: '' + this.lastId });

    checkPermission = cbk => PushNotification.checkPermissions(cbk);

    createDefaultChannels = () => PushNotification.createChannel(
        {
            channelId: 'CCDailyNotif',
            channelName: 'CCDailyNotif',
            channelDescription: "Daily Reminders",
            soundName: "default",
            importance: 4,
            vibrate: true,
        },
        created => console.log(`createChannel 'CCDailyNotif' returned '${created}'`)
    );

    getScheduledLocalNotifications = callback => PushNotification.getScheduledLocalNotifications(callback);

    popInitialNotification = () => PushNotification.popInitialNotification((notification) => console.log('InitialNotication:', notification));

    requestPermissions = () => PushNotification.requestPermissions();

    scheduleNotif = (time, color) => PushNotification.localNotificationSchedule({
        date: new Date(time),
        id: this.lastId++,
        title: 'Daily Reminder',
        message: "Don't forget to manage today's expense!",
        userInfo: { sceen: 'home' },
        playSound: true,
        soundName: 'default',
        repeatType: 'day',
        number: 10,

        // Android Only Properties
        channelId: 'CCDailyNotif',
        ticker: 'CCTicker',
        autoCancel: true,
        largeIcon: 'ic_launcher',
        smallIcon: 'ic_notification',
        color: color,
        vibrate: true,
        vibration: 300,
        group: 'CCGroup',
        groupSummary: false,
        ongoing: false,
        invokeApp: true,
        when: null,
        usesChronometer: false,
        timeoutAfter: null,

        // iOS only properties
        category: '',
    });
}