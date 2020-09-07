import React from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import { updateSettings } from '../redux/action';
import { store } from '../redux/store';
import { darkWhite, lightWhite, settingsScreenStyles, styles, white, lightGrey, } from '../styles';


class Screen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.screen}>
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
                    <TouchableOpacity onPress={() => { }} style={{ ...styles.columns, ...settingsScreenStyles.itemContainer }}>
                        <Icon name={'currency-usd'} size={20} color={darkWhite} />
                        <Text style={settingsScreenStyles.settingText}>Currency</Text>
                        <View style={settingsScreenStyles.settingRight}>
                            <Icon name={'currency-gbp'} size={20} color={darkWhite} />
                        </View>
                    </TouchableOpacity>
                    <View style={settingsScreenStyles.titleContainer}>
                        <Text style={{ color: darkWhite }}>THEMES</Text>
                    </View>
                    <TouchableOpacity onPress={() => { }} style={{ ...styles.columns, ...settingsScreenStyles.itemContainer }}>
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
                        <Text style={{...settingsScreenStyles.settingText, color: this.props.settings.notification ? darkWhite : lightGrey}}>Schedule</Text>
                        <View style={settingsScreenStyles.settingRight}>
                            <Text style={{color: this.props.settings.notification ? darkWhite : lightGrey}}>23:00</Text>
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