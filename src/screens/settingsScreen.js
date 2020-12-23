import moment from 'moment';
import React from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View, } from 'react-native';
import { connect } from 'react-redux';

import Bubble from '../components/Bubble';
import ExpandButton from '../components/ExpandButton';
import ScreenHeader from '../components/ScreenHeader';
import SettingsHeader from '../components/SettingsHeader';
import SettingsItem from '../components/SettingsItem';
import Scroller from '../components/Scroller';
import NotifService from '../notifications/notifService';
import { defaultExpenseCategory, defaultExpenseSelection, defaultIncomeCategory, defaultIncomeSelection, defaultSettings, deleteHistory, resetAllKeys, updateSettings, } from '../redux/action';
import { store } from '../redux/store';
import { colors, settingStyles, styles, } from '../styles';

class Screen extends React.Component {

    constructor(props) {
        super(props);
        var hrs = new Array(24);
        var mins = new Array(12);
        for (var i = 0; i < 24; i++)
            hrs[i] = { key: i, label: i }
        for (var i = 0; i < 12; i++)
            mins[i] = { key: i, label: i * 5 }

        const hr = parseInt(props.settings.notifSchedule.substring(0, 2));
        const min = parseInt(props.settings.notifSchedule.substring(3, 5)) / 5;

        this.state = {
            colorPicker: false,
            currencyPicker: false,
            resetAll: false,
            resetCategory: false,
            resetSettings: false,
            timePicker: false,

            hours: hrs,
            minutes: mins,
            setHr: hr,
            setMin: min,
        }

        this.notif = new NotifService(
            this.onRegister.bind(this),
            this.onNotif.bind(this),
        );
    }

    addZero = num => {
        return num < 10 ? '0' + num : num;
    }

    onRegister = token => {
        this.setState({ registerToken: token.token, fcmRegistered: true });
    }

    onNotif = notif => {

    }

    handlePerm = perms => {
        Alert.alert('Permissions', JSON.stringify(perms));
    }

    render() {
        return (
            <View style={this.props.settings.darkMode ? styles.screenD : styles.screenL}>
                <Modal animationType={'slide'} transparent={true} visible={this.state.colorPicker || this.state.currencyPicker || this.state.timePicker}>
                    <View style={settingStyles.modalViewContainer}>
                        <View style={this.props.settings.darkMode ? settingStyles.modalViewD : settingStyles.modalViewL}>
                            <ExpandButton
                                dark={this.props.settings.darkMode}
                                onPress={() => {
                                    if (this.state.timePicker) {
                                        this.notif.cancelAll();
                                        var set = moment().set({
                                            'hour': parseInt(this.addZero(this.state.hours[this.state.setHr].label)),
                                            'minute': parseInt(this.addZero(this.state.minutes[this.state.setMin].label)),
                                            'second': 0,
                                        });
                                        if (set.isBefore(moment()))
                                            set.add(1, 'day');
                                        this.notif.scheduleNotif(set, this.props.settings.accent);

                                        store.dispatch(updateSettings(
                                            {
                                                key: 'notifSchedule',
                                                update:
                                                    this.addZero(this.state.hours[this.state.setHr].label) + ":" +
                                                    this.addZero(this.state.minutes[this.state.setMin].label)
                                            }
                                        ))
                                        this.setState({ colorPicker: false, currencyPicker: false, timePicker: false });
                                    }
                                }} />
                            {this.state.colorPicker &&
                                <View style={styles.columns}>
                                    <Bubble
                                        color={colors[0]}
                                        onPress={() => {
                                            store.dispatch(updateSettings({ key: 'accent', update: colors[0] }));
                                            this.setState({ colorPicker: false });
                                        }}
                                        selected={this.props.settings.accent === colors[0]}
                                    />
                                    <Bubble
                                        color={colors[1]}
                                        onPress={() => {
                                            store.dispatch(updateSettings({ key: 'accent', update: colors[1] }));
                                            this.setState({ colorPicker: false });
                                        }}
                                        selected={this.props.settings.accent === colors[1]}
                                    />
                                    <Bubble
                                        color={colors[2]}
                                        onPress={() => {
                                            store.dispatch(updateSettings({ key: 'accent', update: colors[2] }));
                                            this.setState({ colorPicker: false });
                                        }}
                                        selected={this.props.settings.accent === colors[2]}
                                    />
                                    <Bubble
                                        color={colors[3]}
                                        onPress={() => {
                                            store.dispatch(updateSettings({ key: 'accent', update: colors[3] }));
                                            this.setState({ colorPicker: false });
                                        }}
                                        selected={this.props.settings.accent === colors[3]}
                                    />
                                    <Bubble
                                        color={colors[4]}
                                        onPress={() => {
                                            store.dispatch(updateSettings({ key: 'accent', update: colors[4] }));
                                            this.setState({ colorPicker: false });
                                        }}
                                        selected={this.props.settings.accent === colors[4]}
                                    />
                                </View>
                            }
                            {this.state.currencyPicker &&
                                <View style={styles.columns}>
                                    <Bubble
                                        color={this.props.settings.accent}
                                        iconName={'currency-usd'}
                                        iconSize={20}
                                        onPress={() => {
                                            store.dispatch(updateSettings({ key: 'currency', update: 'usd' }));
                                            this.setState({ currencyPicker: false });
                                        }}
                                        selected={this.props.settings.currency === 'usd'}
                                    />
                                    <Bubble
                                        color={this.props.settings.accent}
                                        iconName={'currency-gbp'}
                                        iconSize={20}
                                        onPress={() => {
                                            store.dispatch(updateSettings({ key: 'currency', update: 'gbp' }));
                                            this.setState({ currencyPicker: false });
                                        }}
                                        selected={this.props.settings.currency === 'gbp'}
                                    />
                                    <Bubble
                                        color={this.props.settings.accent}
                                        iconName={'currency-jpy'}
                                        iconSize={20}
                                        onPress={() => {
                                            store.dispatch(updateSettings({ key: 'currency', update: 'jpy' }));
                                            this.setState({ currencyPicker: false });
                                        }}
                                        selected={this.props.settings.currency === 'jpy'}
                                    />
                                    <Bubble
                                        color={this.props.settings.accent}
                                        iconName={'currency-eur'}
                                        iconSize={20}
                                        onPress={() => {
                                            store.dispatch(updateSettings({ key: 'currency', update: 'eur' }));
                                            this.setState({ currencyPicker: false });
                                        }}
                                        selected={this.props.settings.currency === 'eur'}
                                    />
                                    <Bubble
                                        color={this.props.settings.accent}
                                        iconName={'currency-btc'}
                                        iconSize={20}
                                        onPress={() => {
                                            store.dispatch(updateSettings({ key: 'currency', update: 'btc' }));
                                            this.setState({ currencyPicker: false });
                                        }}
                                        selected={this.props.settings.currency === 'btc'}
                                    />
                                </View>
                            }
                            {this.state.timePicker &&
                                <View style={styles.columns}>
                                    <Scroller
                                        dark={this.props.settings.darkMode}
                                        data={this.state.hours}
                                        initial={this.state.setHr}
                                        onScroll={(index) => this.setState({ setHr: this.state.hours[index].key })}
                                    />
                                    <Scroller
                                        dark={this.props.settings.darkMode}
                                        data={this.state.minutes}
                                        initial={this.state.setMin}
                                        onScroll={(index) => this.setState({ setMin: this.state.minutes[index].key })}
                                    />
                                </View>
                            }
                        </View>
                    </View>
                </Modal>
                <Modal animationType={'slide'} transparent={true} visible={this.state.resetAll || this.state.resetCategory || this.state.resetSettings}>
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
                <ScreenHeader dark={this.props.settings.darkMode} action={() => this.props.navigation.navigate('Home')} name={'Settings'} />
                <ScrollView style={settingStyles.scrollView}>
                    <SettingsHeader title={'ACCOUNTS'} />
                    <SettingsItem action={() => this.props.navigation.navigate('Account')} iconL={'login'} text={'Login'} />
                    <SettingsItem action={() => this.props.navigation.navigate('Account')} iconL={'account'} text={'Account Settings'} />

                    <SettingsHeader title={'GENERAL'} />
                    <SettingsItem action={() => this.setState({ currencyPicker: true, modal: true })} iconL={'currency-usd'} iconR={'currency-' + this.props.settings.currency} text={'Currency'} />

                    <SettingsHeader title={'THEMES'} />
                    <SettingsItem action={() => this.setState({ colorPicker: true, modal: true })} iconL={'palette'} iconR={'circle'} iconRColor={this.props.settings.accent} text={'Accent Color'} />
                    <SettingsItem action={() => store.dispatch(updateSettings({ key: 'darkMode', update: !this.props.settings.darkMode }))} iconL={'moon-waning-crescent'} state={this.props.settings.darkMode} switch={true} text={'Dark Mode'} />

                    <SettingsHeader title={'CATEGORIES'} />
                    <SettingsItem action={() => this.props.navigation.navigate('Category', { title: 'Expense' })} iconL={'shopping'} text={'Expense Categories'} />
                    <SettingsItem action={() => this.props.navigation.navigate('Category', { title: 'Income' })} iconL={'cash'} text={'Income Categories'} />
                    <SettingsItem action={() => this.setState({ resetCategory: true })} iconL={'backup-restore'} text={'Reset Default Categories'} />

                    <SettingsHeader title={'ADVANCED'} />
                    <SettingsItem action={() => store.dispatch(updateSettings({ key: 'compactView', update: !this.props.settings.compactView }))} iconL={'card-text'} state={this.props.settings.compactView} switch={true} text={'Compact View'} />
                    <SettingsItem
                        action={() => {
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
                            store.dispatch(updateSettings({ key: 'notification', update: !this.props.settings.notification }))
                        }}
                        iconL={'bell'}
                        state={this.props.settings.notification}
                        switch={true}
                        text={'Notifications'}
                    />
                    <SettingsItem action={() => this.setState({ timePicker: true, modal: true })} disabled={!this.props.settings.notification} iconL={'subdirectory-arrow-right'} text={this.props.settings.notifSchedule} />
                    <SettingsItem action={() => this.setState({ resetSettings: true })} iconL={'backup-restore'} text={'Reset Default Settings'} />
                    <SettingsItem action={() => this.setState({ resetAll: true })} iconL={'trash-can'} text={'Clear All Data'} />
                </ScrollView>
            </View >
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings
})

export default connect(mapStateToProps)(Screen);