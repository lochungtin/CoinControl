import moment from 'moment';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View, } from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';

import Bubble from '../components/Bubble';
import ColorPicker from '../components/ColorPicker';
import SCPair from '../components/SaveCancelPair';
import ScreenHeader from '../components/ScreenHeader';
import SettingsHeader from '../components/SettingsHeader';
import SettingsItem from '../components/SettingsItem';
import TimePicker from '../components/TimePicker';
import NotifService from '../notifications/notifService';
import { defaultExpenseCategory, defaultExpenseSelection, defaultGoal, defaultIncomeCategory, defaultIncomeSelection, defaultSettings, deleteHistory, updateSettings, } from '../redux/action';
import { store } from '../redux/store';

import { settingStyles, styles, } from '../styles';

class Screen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            CADOpen: false,
            cpOpen: false,
            cupOpen: false,
            RDCOpen: false,
            RDSOpen: false,
            scroll: false,
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

    clear = lvl => {
        if (lvl === 3) {
            store.dispatch(deleteHistory());
            store.dispatch(defaultGoal());
        }
        if (lvl > 1) {
            store.dispatch(defaultExpenseCategory());
            store.dispatch(defaultExpenseSelection());
            store.dispatch(defaultIncomeCategory());
            store.dispatch(defaultIncomeSelection());
        }
        if (lvl === 1)
            store.dispatch(defaultSettings());
        this.setState({ RDCOpen: false, RDSOpen: false, CADOpen: false });
    }

    cpOnClose = () => this.setState({ cpOpen: false });

    onRegister = token => this.setState({ registerToken: token.token, fcmRegistered: true });

    onNotif = notif => { }

    handlePerm = perms => Alert.alert('Permissions', JSON.stringify(perms));

    scroll = () => this.setState({ scroll: true });

    ste = () => {
        if (this.state.scroll)
            this.scrollView.scrollToEnd();
        this.setState({ scroll: false });
    }

    tpOnClose = () => this.setState({ tpOpen: false });

    render() {
        return (
            <View style={this.props.settings.darkMode ? styles.screenD : styles.screenL}>
                <ScreenHeader back={() => this.props.navigation.navigate('Home')} name={'Settings'} />
                <ScrollView onContentSizeChange={this.ste} ref={ref => this.scrollView = ref} style={settingStyles.scrollView}>
                    <SettingsHeader title={'ACCOUNTS'} />
                    <SettingsItem action={() => this.props.navigation.navigate('Account')} iconL={'login'} text={'Login'} />
                    <SettingsItem action={() => this.props.navigation.navigate('Account')} iconL={'account'} text={'Account Settings'} />

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
                            )
                        })}
                    </SettingsItem>

                    <SettingsHeader title={'THEMES'} />
                    <SettingsItem action={() => this.setState({ cpOpen: true })} iconL={'palette'} iconR={'circle'} iconRColor={this.props.settings.accent} text={'Accent Color'} />
                    <SettingsItem action={() => store.dispatch(updateSettings({ key: 'darkMode', update: !this.props.settings.darkMode }))} iconL={'moon-waning-crescent'} state={this.props.settings.darkMode} switch={true} text={'Dark Mode'} />

                    <SettingsHeader title={'CATEGORIES'} />
                    <SettingsItem action={() => this.props.navigation.navigate('Icons', 'Expense')} iconL={'shopping'} text={'Expense Categories'} />
                    <SettingsItem action={() => this.props.navigation.navigate('Icons', 'Income')} iconL={'cash'} text={'Income Categories'} />

                    <SettingsHeader title={'ADVANCED'} />
                    <SettingsItem action={() => store.dispatch(updateSettings({ key: 'compactView', update: !this.props.settings.compactView }))} iconL={'card-text'} state={this.props.settings.compactView} switch={true} text={'Compact View'} />
                    <SettingsItem action={this.cancelNotifs} iconL={'bell'} state={this.props.settings.notification} switch={true} text={'Notifications'} />
                    <SettingsItem action={() => this.setState({ tpOpen: true })} disabled={!this.props.settings.notification} iconL={'subdirectory-arrow-right'} text={this.props.settings.notifSchedule} />

                    <SettingsHeader title={'DANGER ZONE'} />
                    <SettingsItem action={() => this.setState({ RDCOpen: !this.state.RDCOpen })} iconL={'backup-restore'} open={this.state.RDCOpen} ste={this.scroll} text={'Reset Default Categories'}>
                        <SCPair onCancel={() => this.setState({ RDCOpen: false })} onConfirm={() => this.clear(2)} />
                    </SettingsItem>
                    <SettingsItem action={() => this.setState({ RDSOpen: !this.state.RDSOpen })} iconL={'backup-restore'} open={this.state.RDSOpen} ste={this.scroll} text={'Reset Default Settings'}>
                        <SCPair onCancel={() => this.setState({ RDSOpen: false })} onConfirm={() => this.clear(1)} />
                    </SettingsItem>
                    <SettingsItem action={() => this.setState({ CADOpen: !this.state.CADOpen })} iconL={'trash-can'} open={this.state.CADOpen} ste={this.scroll} text={'Clear All Data'}>
                        <SCPair onCancel={() => this.setState({ CADOpen: false })} onConfirm={() => this.clear(3)} />
                    </SettingsItem>
                </ScrollView>

                <ColorPicker
                    color={this.props.settings.accent}
                    close={this.cpOnClose}
                    open={this.state.cpOpen}
                    onPress={item => {
                        store.dispatch(updateSettings({ key: 'accent', update: item }));
                        this.setState({ cpOpen: false });
                    }}
                />
                <TimePicker
                    close={this.tpOnClose}
                    open={this.state.tpOpen}
                    time={this.props.settings.notifSchedule}
                    onPress={item => {
                        store.dispatch(updateSettings({ key: 'notifSchedule', update: item }));
                        this.setState({ tpOpen: false });
                    }}
                />
            </View >
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings
})

export default connect(mapStateToProps)(Screen);