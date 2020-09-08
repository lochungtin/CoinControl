import React from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import Bubble from '../components/Bubble';
import ExpandButton from '../components/ExpandButton';
import ScreenHeader from '../components/ScreenHeader';
import SettingsHeader from '../components/SettingsHeader';
import SettingsItem from '../components/SettingsItem';
import { defaultIncomeCategory, defaultExpenseCategory, defaultSettings, deleteHistory, updateSettings, } from '../redux/action';
import { store } from '../redux/store';
import { black, colors, settingStyles, styles, white, } from '../styles';



class Screen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            colorPicker: false,
            currencyPicker: false,
            resetAll: false,
            resetCategory: false,
            resetSettings: false,
            timePicker: false,
        }
    }

    render() {
        return (
            <View style={this.props.settings.darkMode ? styles.screenD : styles.screenL}>
                <Modal animationType={'slide'} transparent={true} visible={this.state.colorPicker || this.state.currencyPicker || this.state.timePicker}>
                    <View style={settingStyles.modalViewContainer}>
                        <View style={this.props.settings.darkMode ? settingStyles.modalViewD : settingStyles.modalViewL}>
                            <ExpandButton dark={this.props.settings.darkMode} onPress={() => this.setState({ colorPicker: false, currencyPicker: false, timePicker: false })} />
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
                                            store.dispatch(defaultIncomeCategory());
                                            store.dispatch(defaultExpenseCategory());
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
                    <SettingsHeader dark={this.props.settings.darkMode} title={'GENERAL'} />
                    <SettingsItem dark={this.props.settings.darkMode} iconL={'account'} text={'Account Settings'} />
                    <SettingsItem dark={this.props.settings.darkMode} action={() => this.setState({ currencyPicker: true, modal: true })} iconL={'currency-usd'} iconR={'currency-' + this.props.settings.currency} text={'Currency'} />

                    <SettingsHeader dark={this.props.settings.darkMode} title={'THEMES'} />
                    <SettingsItem dark={this.props.settings.darkMode} action={() => this.setState({ colorPicker: true, modal: true })} iconL={'palette'} iconR={'circle'} iconRColor={this.props.settings.accent} text={'Accent Color'} />
                    <SettingsItem dark={this.props.settings.darkMode} accent={this.props.settings.accent} action={() => store.dispatch(updateSettings({ key: 'darkMode', update: !this.props.settings.darkMode }))} iconL={'moon-waning-crescent'} state={this.props.settings.darkMode} switch={true} text={'Dark Mode'} />

                    <SettingsHeader dark={this.props.settings.darkMode} title={'CATEGORIES'} />
                    <SettingsItem dark={this.props.settings.darkMode} iconL={'shopping'} text={'Expense Categories'} />
                    <SettingsItem dark={this.props.settings.darkMode} iconL={'cash'} text={'Income Categories'} />
                    <SettingsItem dark={this.props.settings.darkMode} action={() => this.setState({ resetCategory: true })} iconL={'backup-restore'} text={'Reset Default Categories'} />

                    <SettingsHeader dark={this.props.settings.darkMode} title={'ADVANCED'} />
                    <SettingsItem dark={this.props.settings.darkMode} accent={this.props.settings.accent} action={() => store.dispatch(updateSettings({ key: 'compactView', update: !this.props.settings.compactView }))} iconL={'card-text'} state={this.props.settings.compactView} switch={true} text={'Compact View'} />
                    <SettingsItem dark={this.props.settings.darkMode} accent={this.props.settings.accent} action={() => store.dispatch(updateSettings({ key: 'notification', update: !this.props.settings.notification }))} iconL={'bell'} state={this.props.settings.notification} switch={true} text={'Notifications'} />
                    <SettingsItem dark={this.props.settings.darkMode} action={() => this.setState({ timePicker: true, modal: true })} disabled={!this.props.settings.notification} iconL={'subdirectory-arrow-right'} text={this.props.settings.notifSchedule} />
                    <SettingsItem dark={this.props.settings.darkMode} action={() => this.setState({ resetSettings: true })} iconL={'backup-restore'} text={'Reset Default Settings'} />
                    <SettingsItem dark={this.props.settings.darkMode} action={() => this.setState({ resetAll: true })} iconL={'trash-can'} text={'Clear All Data'} />
                </ScrollView>
            </View >
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings
})

export default connect(mapStateToProps)(Screen);