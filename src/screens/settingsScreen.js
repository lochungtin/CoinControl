import moment from 'moment';
import React from 'react';
import { ScrollView, View, } from 'react-native';
import { connect } from 'react-redux';

import Bubble from '../components/Bubble';
import ColorPicker from '../components/ColorPicker';
import ConfirmationModal from '../components/Modals/ConfirmationModal';
import ScreenHeader from '../components/ScreenHeader';
import SettingsHeader from '../components/SettingsHeader';
import SettingsItem from '../components/SettingsItem';
import TimePicker from '../components/TimePicker';
import NotifService from '../notifications/notifService';
import { defaultExpenseCategory, defaultGoal, defaultIncomeCategory, defaultSettings, deleteHistory, updateSettings, } from '../redux/action';
import { store } from '../redux/store';

import { settingStyles, styles, } from '../styles';
import { settingsPromptText } from '../data/text';

class Screen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            confirmType: 0,
            cpOpen: false,
            cupOpen: false,
            tpOpen: false,
        }

        this.notif = new NotifService(
            this.onRegister.bind(this),
            this.onNotif.bind(this),
        );

        this.currencies = ['usd', 'gbp', 'jpy', 'eur', 'twd', 'krw', 'rub'];
    }

    addZero = num => num < 10 ? '0' + num : num;

    cancelNotifs = () => {
        this.notif.cancelAll();
        if (!this.props.settings.notification) {
            var set = moment().set({
                'hour': parseInt(this.props.settings.notifSchedule.substring(0, 2)),
                'minute': parseInt(this.props.settings.notifSchedule.substring(3, 5)),
                'second': 0,
            });
            if (set.isBefore(moment()))
                set.add(1, 'day');
            this.notif.scheduleNotif(set, this.props.settings.accent);
        }
        store.dispatch(updateSettings({ key: 'notification', update: !this.props.settings.notification }));
    }

    clear = type => {
        if (type === 3) {
            store.dispatch(deleteHistory());
            store.dispatch(defaultGoal());
        }
        if (type > 1) {
            store.dispatch(defaultExpenseCategory());
            store.dispatch(defaultIncomeCategory());
        }
        if (type === 1 || type === 3)
            store.dispatch(defaultSettings());
        this.setState({ confirmType: 0 });
    }

    onNotif = notif => { }

    onRegister = token => this.setState({ registerToken: token.token, fcmRegistered: true });

    openConfirmation = id => {
        if (!this.props.settings.prompt[settingsPromptText[id.toString()].key])
            this.setState({ confirmType: id });
        else
            this.clear(id);
    }

    handlePerm = perms => Alert.alert('Permissions', JSON.stringify(perms));

    nav = (screen, params) => this.props.navigation.navigate(screen, params);

    render() {
        return (
            <View style={this.props.settings.darkMode ? styles.screenD : styles.screenL}>
                <ScreenHeader back={() => this.nav('Home')} name={'Settings'} />
                <ScrollView style={settingStyles.scrollView}>
                    <SettingsHeader title={'ACCOUNTS'} />
                    <SettingsItem action={() => this.nav('Account')} iconL={'login'} text={'Login'} />
                    <SettingsItem action={() => this.nav('Account')} iconL={'account'} text={'Account Settings'} />

                    <SettingsHeader title={'GENERAL'} />
                    <SettingsItem action={() => this.setState({ cupOpen: !this.state.cupOpen })} iconL={'currency-usd'} iconR={'currency-' + this.props.settings.currency} text={'Currency'} open={this.state.cupOpen}>
                        {this.currencies.map(item => {
                            return (
                                <Bubble
                                    color={this.props.settings.accent}
                                    key={item}
                                    iconName={'currency-' + item}
                                    iconSize={20}
                                    onPress={() => {
                                        store.dispatch(updateSettings({ key: 'currency', update: item }));
                                        this.setState({ cupOpen: false });
                                    }}
                                    selected={this.props.settings.currency !== item}
                                />
                            );
                        })}
                    </SettingsItem>

                    <SettingsHeader title={'THEMES'} />
                    <SettingsItem action={() => this.setState({ cpOpen: true })} iconL={'palette'} iconR={'circle'} iconRColor={this.props.settings.accent} text={'Accent Color'} />
                    <SettingsItem action={() => store.dispatch(updateSettings({ key: 'darkMode', update: !this.props.settings.darkMode }))} iconL={'moon-waning-crescent'} state={this.props.settings.darkMode} switch={true} text={'Dark Mode'} />

                    <SettingsHeader title={'CATEGORIES'} />
                    <SettingsItem action={() => this.nav('Icons', 'Expense')} iconL={'shopping'} text={'Expense Categories'} />
                    <SettingsItem action={() => this.nav('Icons', 'Income')} iconL={'cash'} text={'Income Categories'} />

                    <SettingsHeader title={'ADVANCED'} />
                    <SettingsItem action={() => store.dispatch(updateSettings({ key: 'compactView', update: !this.props.settings.compactView }))} iconL={'card-text'} state={this.props.settings.compactView} switch={true} text={'Compact View'} />
                    <SettingsItem action={this.cancelNotifs} iconL={'bell'} state={this.props.settings.notification} switch={true} text={'Notifications'} />
                    <SettingsItem action={() => this.setState({ tpOpen: true })} disabled={!this.props.settings.notification} iconL={'subdirectory-arrow-right'} text={this.props.settings.notifSchedule} />

                    <SettingsHeader title={'DANGER ZONE'} />
                    <SettingsItem action={() => this.openConfirmation(2)} iconL={'backup-restore'} text={'Reset Default Categories'} />
                    <SettingsItem action={() => this.openConfirmation(1)} iconL={'backup-restore'} text={'Reset Default Settings'} />
                    <SettingsItem action={() => this.openConfirmation(3)} iconL={'trash-can'} text={'Clear All Data'} />
                </ScrollView>

                <ColorPicker
                    color={this.props.settings.accent}
                    close={() => this.setState({ cpOpen: false })}
                    open={this.state.cpOpen}
                    onPress={item => {
                        store.dispatch(updateSettings({ key: 'accent', update: item }));
                        this.setState({ cpOpen: false });
                    }}
                />
                <TimePicker
                    close={() => this.setState({ tpOpen: false })}
                    open={this.state.tpOpen}
                    time={this.props.settings.notifSchedule}
                    onPress={item => {
                        store.dispatch(updateSettings({ key: 'notifSchedule', update: item }));
                        this.setState({ tpOpen: false });
                    }}
                />
                <ConfirmationModal
                    close={() => this.setState({ confirmType: 0 })}
                    onConfirm={() => this.clear(this.state.confirmType)}
                    open={this.state.confirmType !== 0}
                    text={settingsPromptText[this.state.confirmType.toString()]}
                />
            </View >
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings
})

export default connect(mapStateToProps)(Screen);