import moment from 'moment';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View, } from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';

import Bubble from '../components/Bubble';
import ColorPicker from '../components/ColorPicker';
import ScreenHeader from '../components/ScreenHeader';
import SettingsHeader from '../components/SettingsHeader';
import SettingsItem from '../components/SettingsItem';
import TimePicker from '../components/TimePicker';
import NotifService from '../notifications/notifService';
import { defaultExpenseCategory, defaultExpenseSelection, defaultIncomeCategory, defaultIncomeSelection, defaultSettings, deleteHistory, resetAllKeys, updateSettings, } from '../redux/action';
import { store } from '../redux/store';

import { settingStyles, styles, } from '../styles';

class Screen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cpOpen: false,
            tpOpen: false,
        }

        this.notif = new NotifService(
            this.onRegister.bind(this),
            this.onNotif.bind(this),
        );

        this.currencies = ['usd', 'gbp', 'jpy', 'eur', 'twd'];
    }

    addZero = num => {
        return num < 10 ? '0' + num : num;
    }

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

    cpOnClose = () => this.setState({ cpOpen: false });

    onRegister = token => this.setState({ registerToken: token.token, fcmRegistered: true });

    onNotif = notif => { }

    handlePerm = perms => Alert.alert('Permissions', JSON.stringify(perms));

    tpOnClose = () => this.setState({ tpOpen: false });

    render() {
        return (
            <View style={this.props.settings.darkMode ? styles.screenD : styles.screenL}>
                <ScreenHeader action={() => this.props.navigation.navigate('Home')} name={'Settings'} />
                <ScrollView style={settingStyles.scrollView}>
                    <SettingsHeader title={'ACCOUNTS'} />
                    <SettingsItem action={() => this.props.navigation.navigate('Account')} iconL={'login'} text={'Login'} />
                    <SettingsItem action={() => this.props.navigation.navigate('Account')} iconL={'account'} text={'Account Settings'} />

                    <SettingsHeader title={'GENERAL'} />
                    <SettingsItem action={() => this.setState({ currencyPicker: true })} iconL={'currency-usd'} iconR={'currency-' + this.props.settings.currency} text={'Currency'} />

                    <SettingsHeader title={'THEMES'} />
                    <SettingsItem action={() => this.setState({ cpOpen: true })} iconL={'palette'} iconR={'circle'} iconRColor={this.props.settings.accent} text={'Accent Color'} />
                    <SettingsItem action={() => store.dispatch(updateSettings({ key: 'darkMode', update: !this.props.settings.darkMode }))} iconL={'moon-waning-crescent'} state={this.props.settings.darkMode} switch={true} text={'Dark Mode'} />

                    <SettingsHeader title={'CATEGORIES'} />
                    <SettingsItem action={() => this.props.navigation.navigate('Category', { title: 'Expense' })} iconL={'shopping'} text={'Expense Categories'} />
                    <SettingsItem action={() => this.props.navigation.navigate('Category', { title: 'Income' })} iconL={'cash'} text={'Income Categories'} />

                    <SettingsHeader title={'ADVANCED'} />
                    <SettingsItem action={() => store.dispatch(updateSettings({ key: 'compactView', update: !this.props.settings.compactView }))} iconL={'card-text'} state={this.props.settings.compactView} switch={true} text={'Compact View'} />
                    <SettingsItem action={this.cancelNotifs} iconL={'bell'} state={this.props.settings.notification} switch={true} text={'Notifications'} />
                    <SettingsItem action={() => this.setState({ tpOpen: true })} disabled={!this.props.settings.notification} iconL={'subdirectory-arrow-right'} text={this.props.settings.notifSchedule} />

                    <SettingsHeader title={'DANGER ZONE'} />
                    <SettingsItem action={() => this.setState({ resetCategory: true })} iconL={'backup-restore'} text={'Reset Default Categories'} />
                    <SettingsItem action={() => this.setState({ resetSettings: true })} iconL={'backup-restore'} text={'Reset Default Settings'} />
                    <SettingsItem action={() => this.setState({ resetAll: true })} iconL={'trash-can'} text={'Clear All Data'} />
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
                <Modal
                    animationIn={'slideInUp'}
                    backdropOpacity={0}
                    isVisible={false}
                    onBackdropPress={this.close}
                    onBackButtonPress={this.close}
                    onSwipeComplete={this.close}
                    swipeDirection='down'
                    style={{ flexDirection: 'row', alignItems: 'flex-end', padding: 0, margin: 0 }}
                >
                    <View style={styles.columns}>
                        {this.currencies.map(item => {
                            return (
                                <Bubble
                                    color={this.props.settings.accent}
                                    key={item}
                                    iconName={'currency-' + item}
                                    iconSize={20}
                                    onPress={() => {
                                        store.dispatch(updateSettings({ key: 'currency', update: item }));
                                        this.setState({ currencyPicker: false });
                                    }}
                                    selected={this.props.settings.currency === item}
                                />
                            )
                        })}
                    </View>
                </Modal>
                <Modal animationType={'slide'} transparent={true} visible={false}>
                    <View style={settingStyles.modalViewContainer}>
                        <View style={this.props.settings.darkMode ? settingStyles.modalViewD : settingStyles.modalViewL}>
                            <Text style={this.props.settings.darkMode ? settingStyles.modalTextD : settingStyles.modalTextL}>{
                                (this.state.resetAll ? 'Clear ALL data?' : '') +
                                (this.state.resetCategory ? 'Revert to Default Categories?' : '') +
                                (this.state.resetSettings ? 'Revert to Default Settings?' : '')
                            }</Text>
                            <View style={styles.columns}>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (this.state.resetAll)
                                            store.dispatch(deleteHistory());
                                        if (this.state.resetCategory) {
                                            store.dispatch(defaultExpenseCategory());
                                            store.dispatch(defaultExpenseSelection());
                                            store.dispatch(defaultIncomeCategory());
                                            store.dispatch(defaultIncomeSelection());
                                            store.dispatch(resetAllKeys());
                                        }
                                        if (this.state.resetSettings)
                                            store.dispatch(defaultSettings());
                                        this.setState({ resetAll: false, resetCategory: false, resetSettings: false });
                                    }}
                                    style={{ ...styles.roundView, backgroundColor: this.props.settings.accent, width: '47.5%' }}>
                                    <Text style={styles.centerTextL}>Confirm</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({ resetAll: false, resetCategory: false, resetSettings: false })} style={this.props.settings.darkMode ? settingStyles.cancelBtnD : settingStyles.cancelBtnL}>
                                    <Text style={styles.centerTextL}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View >
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings
})

export default connect(mapStateToProps)(Screen);