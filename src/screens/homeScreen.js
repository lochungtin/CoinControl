import React from 'react';
import { Modal, SafeAreaView, SectionList, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Bubble from '../components/Bubble';
import ExpandButton from '../components/ExpandButton';
import SectionHeader from '../components/SectionHeader';
import SectionItem from '../components/SectionItem';
import { parseAll, parseTotal } from '../functions/parser';
import { black, iconColors, homeScreenStyles, maxWidth, maxHeight, styles, white } from '../styles';

class Screen extends React.Component {

    constructor(props) {
        super(props);
        const total = parseTotal(this.props.records);
        this.state = {
            balance: Math.floor(total),
            balanceDecimal: this.getDecimal(total),
            expand: '',
            open: false,
        }
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            const total = parseTotal(this.props.records);
            this.setState({
                balance: Math.floor(total),
                balanceDecimal: this.getDecimal(total),
            });
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    balance = () => {
        return this.props.settings.darkMode ? homeScreenStyles.balanceD : homeScreenStyles.balanceL;
    }

    balanceSmall = () => {
        return this.props.settings.darkMode ? homeScreenStyles.balanceSmallD : homeScreenStyles.balanceSmallL;
    }

    centerText = () => {
        return this.props.settings.darkMode ? styles.centerTextD : styles.centerTextL;
    }

    iconColor = () => {
        return this.props.settings.darkMode ? iconColors.iconD : iconColors.iconL;
    }

    getDecimal = total => {
        total = Math.abs(total);
        return Math.floor((total - Math.floor(total)) * 100);
    }

    safeAreaView = () => {
        return this.props.settings.darkMode ? homeScreenStyles.borderD : homeScreenStyles.borderL;
    }

    text = () => {
        return this.props.settings.darkMode ? styles.textD : styles.textL;
    }

    render() {
        return (
            <View style={this.props.settings.darkMode ? styles.screenD : styles.screenL}>
                <View style={{ alignItems: 'center', paddingTop: 20 }}>
                    <View style={{ ...styles.rows, minHeight: '30%', justifyContent: 'space-evenly' }}>
                        <View style={{ ...styles.columns, flex: 0 }}>
                            <Icon name={'currency-' + this.props.settings.currency} color={this.text().color} size={30} />
                            <Text style={this.balance()}>{this.state.balance}</Text>
                            <Text style={this.balanceSmall()}>.{this.state.balanceDecimal}</Text>
                        </View>
                        <View style={{ ...styles.columns, flex: 0 }}>
                            <Icon name={'currency-' + this.props.settings.currency} color={this.text().color} size={15} />
                            <Text style={{ color: this.iconColor() }}>{this.state.balance + '.' + this.state.balanceDecimal} left for 3 days</Text>
                        </View>
                        <View style={{ ...styles.columns, flex: 0 }}>
                            <Progress.Bar color={this.props.settings.accent} progress={0.3} width={maxWidth / 2} />
                        </View>
                        <View style={{ ...styles.columns, flex: 0, justifyContent: 'space-evenly' }}>
                            <View style={{ ...styles.rows, maxWidth: 70 }}>
                                <Bubble color={this.props.settings.accent} iconName={'sync'} iconSize={25} onPress={() => console.log('sync')} size={35} />
                                <Text style={this.centerText()}>Sync</Text>
                            </View>
                            <View style={{ ...styles.rows, maxWidth: 70 }}>
                                <Bubble color={this.props.settings.accent} iconName={'plus'} iconSize={25} onPress={() => this.props.navigation.navigate('Update', { darkMode: this.props.settings.darkMode, title: 'Income' })} size={35} />
                                <Text style={this.centerText()}>Income</Text>
                            </View>
                            <View style={{ ...styles.rows, maxWidth: 70 }}>
                                <Bubble color={this.props.settings.accent} iconName={'minus'} iconSize={25} onPress={() => this.props.navigation.navigate('Update', { darkMode: this.props.settings.darkMode, title: 'Expense' })} size={35} />
                                <Text style={this.centerText()}>Expense</Text>
                            </View>
                            <View style={{ ...styles.rows, maxWidth: 70 }}>
                                <Bubble color={this.props.settings.accent} iconName={'flag-outline'} iconSize={25} onPress={() => this.setState({ open: true })} size={35} />
                                <Text style={this.centerText()}>Set Goal</Text>
                            </View>
                        </View>
                    </View>

                    <SafeAreaView style={this.safeAreaView()}>
                        <SectionList
                            renderItem={({ item }) => <SectionItem dark={this.props.settings.darkMode} accent={this.props.settings.accent} compactMode={this.props.settings.compactView} item={item} />}
                            renderSectionHeader={({ section: { title } }) => <SectionHeader dark={this.props.settings.darkMode} title={title} />}
                            sections={parseAll(this.props.records)}
                            stickySectionHeadersEnabled={true}
                            style={{ flex: 1, minWidth: maxWidth, paddingHorizontal: '5%' }}
                        />
                    </SafeAreaView>
                </View>

                <Modal animationType='slide' transparent={true} visible={this.state.open}>
                    <View style={styles.modalViewContainer}>
                        <View style={{ ...styles.modalView, height: maxHeight / 4 - 20 }}>
                            <View style={styles.rows}>
                                <ExpandButton dark={this.props.settings.darkMode} onPress={() => this.setState({ open: false })} />
                                <View style={{ ...styles.roundView, ...styles.columns, backgroundColor: white, maxHeight: 60 }}>
                                    <Icon name={'cash'} size={35} color={black} />
                                    <TextInput
                                        keyboardType={'numeric'}
                                        placeholder={'Amount'}
                                        onChangeText={(text) => this.setState({ amount: parseInt(text) })}
                                        style={{ color: black, textAlign: 'center', width: '95%' }}
                                    />
                                </View>
                                <View style={{ ...styles.columns, justifyContent: 'space-between' }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ goalType: 'W' })
                                        }}
                                        style={{ ...styles.roundView, backgroundColor: white, paddingHorizontal: 10 ,width: '30%' }}
                                    >
                                        <Text style={styles.centerTextL}>Weekly</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ goalType: 'W' })
                                        }}
                                        style={{ ...styles.roundView, backgroundColor: white, paddingHorizontal: 10, width: '30%' }}
                                    >
                                        <Text style={styles.centerTextL}>Monthly</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ goalType: 'W' })
                                        }}
                                        style={{ ...styles.roundView, backgroundColor: this.props.settings.accent, paddingHorizontal: 10, width: '30%' }}
                                    >
                                        <Text style={styles.centerTextL}>None</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    records: state.records,
    settings: state.settings
})

export default connect(mapStateToProps)(Screen);