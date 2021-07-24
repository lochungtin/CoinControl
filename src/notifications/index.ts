import moment from 'moment';
import { PushNotificationPermissions } from 'react-native';
import PushNotification, { PushNotificationScheduledLocalObject } from 'react-native-push-notification';

import Handler from './Handler';

import { keygen } from '../utils/keygen';

export default class NotifService {

    constructor(onRegister: any, onNotification: any) {
        let channelConfig = {
            channelId: 'PreplyRepeatNotifs',
            channelName: 'PreplyRepeatNotifs',
            channelDescription: "Todo Reminders",
            soundName: "default",
            importance: 4,
            vibrate: true,
        };

        PushNotification.createChannel(channelConfig, (created: boolean) => { console.log('new channel: ' + created) });

        Handler.attachRegister(onRegister);
        Handler.attachNotification(onNotification);

        // Clear badge number at start
        PushNotification.getApplicationIconBadgeNumber((number: number) => {
            if (number > 0)
                PushNotification.setApplicationIconBadgeNumber(0);
        });
    }

    abandonPermissions = () => PushNotification.abandonPermissions();

    cancelAll = () => PushNotification.cancelAllLocalNotifications();

    cancelNotif = (id: string) => PushNotification.cancelLocalNotifications({ id });

    checkPermission = (callback: (perms: PushNotificationPermissions) => void) =>
        PushNotification.checkPermissions(callback);

    getScheduledLocalNotifications = (callback: (notifs: PushNotificationScheduledLocalObject[]) => void) =>
        PushNotification.getScheduledLocalNotifications(callback);

    requestPermissions = () => PushNotification.requestPermissions();

    scheduleNotif = (color: string, timestamp: string): string => {
        let id: number = parseInt(keygen(), 16);
        PushNotification.localNotificationSchedule({
            color,
            id,
            date: new Date(timestamp),
            message: `Don't forget to note your expenses`,
            repeatType: 'day',
            title: `Friendly Daily Reminder`,

            // other properties
            channelId: 'CCNotifChannel',
            ticker: 'CCTicker',
            autoCancel: true,
            largeIcon: 'ic_launcher',
            smallIcon: 'ic_notification',
            vibrate: true,
            vibration: 300,
            group: 'CCGroup',
        });

        return id.toString();
    }
}
