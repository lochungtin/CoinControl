import React from 'react';
import { Modal, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Bubble from '../components/Bubble';
import { updateSettings } from '../redux/action';
import { store } from '../redux/store';
import { colors, darkWhite, lightWhite, settingsScreenStyles, styles, white, lightGrey, } from '../styles';
import ExpandButton from '../components/ExpandButton';



class Screen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            colorPicker: false,
            currencyPicker: false,
            timePicker: false,
        }
    }

    render() {
        return (
            <View style={styles.screen}>
                <Modal animationType={'slide'} transparent={true} visible={this.state.colorPicker || this.state.currencyPicker || this.state.timePicker}>
                    <View style={settingsScreenStyles.modalViewContainer}>
                        <View style={settingsScreenStyles.modalView}>
                            <ExpandButton onPress={() => this.setState({ colorPicker: false, currencyPicker: false, timePicker: false })} />
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
                <ScrollView style={settingsScreenStyles.scrollView}>
                    <View style={settingsScreenStyles.titleContainer}>
                        <Text style={{ color: darkWhite }}>GENERAL</Text>
                    </View>
                    <TouchableOpacity onPress={() => { }} style={{ ...styles.columns, ...settingsScreenStyles.itemContainer }}>
                        <Icon name={'account'} size={20} color={darkWhite} />
                        <Text style={settingsScreenStyles.settingText}>Account settings</Text>
                        <View style={settingsScreenStyles.settingRight}>
                            <Icon name={'arrow-right'} size={20} color={darkWhite} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ currencyPicker: true, modal: true })} style={{ ...styles.columns, ...settingsScreenStyles.itemContainer }}>
                        <Icon name={'currency-usd'} size={20} color={darkWhite} />
                        <Text style={settingsScreenStyles.settingText}>Currency</Text>
                        <View style={settingsScreenStyles.settingRight}>
                            <Icon name={'currency-' + this.props.settings.currency} size={20} color={darkWhite} />
                        </View>
                    </TouchableOpacity>
                    <View style={settingsScreenStyles.titleContainer}>
                        <Text style={{ color: darkWhite }}>THEMES</Text>
                    </View>
                    <TouchableOpacity onPress={() => this.setState({ colorPicker: true, modal: true })} style={{ ...styles.columns, ...settingsScreenStyles.itemContainer }}>
                        <Icon name={'palette'} size={20} color={darkWhite} />
                        <Text style={settingsScreenStyles.settingText}>Accent Color</Text>
                        <View style={settingsScreenStyles.settingRight}>
                            <Icon name={'circle'} size={20} color={this.props.settings.accent} />
                        </View>
                    </TouchableOpacity>
                    <View onPress={() => { }} style={{ ...styles.columns, ...settingsScreenStyles.itemContainer }}>
                        <Icon name={'moon-waning-crescent'} size={20} color={darkWhite} />
                        <Text style={settingsScreenStyles.settingText}>Dark Mode</Text>
                        <View style={settingsScreenStyles.settingRight}>
                            <Switch
                                thumbColor={white}
                                trackColor={{ false: darkWhite, true: this.props.settings.accent }}
                                value={true}
                            />
                        </View>
                    </View>
                    <View style={settingsScreenStyles.titleContainer}>
                        <Text style={{ color: darkWhite }}>CATEGORIES</Text>
                    </View>
                    <TouchableOpacity onPress={() => { }} style={{ ...styles.columns, ...settingsScreenStyles.itemContainer }}>
                        <Icon name={'shopping'} size={20} color={darkWhite} />
                        <Text style={settingsScreenStyles.settingText}>Expense Categories</Text>
                        <View style={settingsScreenStyles.settingRight}>
                            <Icon name={'arrow-right'} size={20} color={darkWhite} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { }} style={{ ...styles.columns, ...settingsScreenStyles.itemContainer }}>
                        <Icon name={'card'} size={20} color={darkWhite} />
                        <Text style={settingsScreenStyles.settingText}>Income Categories</Text>
                        <View style={settingsScreenStyles.settingRight}>
                            <Icon name={'arrow-right'} size={20} color={darkWhite} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { }} style={{ ...styles.columns, ...settingsScreenStyles.itemContainer }}>
                        <Icon name={'backup-restore'} size={20} color={darkWhite} />
                        <Text style={settingsScreenStyles.settingText}>Reset Default</Text>
                        <View style={settingsScreenStyles.settingRight}>
                            <Icon name={'arrow-right'} size={20} color={darkWhite} />
                        </View>
                    </TouchableOpacity>
                    <View style={settingsScreenStyles.titleContainer}>
                        <Text style={{ color: darkWhite }}>ADVANCED</Text>
                    </View>
                    <View style={{ ...styles.columns, ...settingsScreenStyles.itemContainer }}>
                        <Icon name={'card-text'} size={20} color={darkWhite} />
                        <Text style={settingsScreenStyles.settingText}>Compact View</Text>
                        <View style={settingsScreenStyles.settingRight}>
                            <Switch
                                thumbColor={white}
                                trackColor={{ false: darkWhite, true: this.props.settings.accent }}
                                value={this.props.settings.compactView}
                                onChange={() => store.dispatch(updateSettings({ key: 'compactView', update: !this.props.settings.compactView }))}
                            />
                        </View>
                    </View>
                    <View style={{ ...styles.columns, ...settingsScreenStyles.itemContainer }}>
                        <Icon name={'bell'} size={20} color={darkWhite} />
                        <Text style={settingsScreenStyles.settingText}>Notifications</Text>
                        <View style={settingsScreenStyles.settingRight}>
                            <Switch
                                thumbColor={white}
                                trackColor={{ false: darkWhite, true: this.props.settings.accent }}
                                value={this.props.settings.notification}
                                onChange={() => store.dispatch(updateSettings({ key: 'notification', update: !this.props.settings.notification }))}
                            />
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => { }} style={{ ...styles.columns, ...settingsScreenStyles.itemContainer }}>
                        <Icon name={'subdirectory-arrow-right'} size={20} color={this.props.settings.notification ? darkWhite : lightGrey} />
                        <Text style={{ ...settingsScreenStyles.settingText, color: this.props.settings.notification ? darkWhite : lightGrey }}>Schedule</Text>
                        <View style={settingsScreenStyles.settingRight}>
                            <Text style={{ color: this.props.settings.notification ? darkWhite : lightGrey }}>23:00</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { }} style={{ ...styles.columns, ...settingsScreenStyles.itemContainer }}>
                        <Icon name={'backup-restore'} size={20} color={darkWhite} />
                        <Text style={settingsScreenStyles.settingText}>Reset Default Settings</Text>
                        <View style={settingsScreenStyles.settingRight}>
                            <Icon name={'arrow-right'} size={20} color={darkWhite} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { }} style={{ ...styles.columns, ...settingsScreenStyles.itemContainer }}>
                        <Icon name={'trash-can'} size={20} color={darkWhite} />
                        <Text style={settingsScreenStyles.settingText}>Clear Data</Text>
                        <View style={settingsScreenStyles.settingRight}>
                            <Icon name={'arrow-right'} size={20} color={darkWhite} />
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings
})

export default connect(mapStateToProps)(Screen);