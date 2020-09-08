import React from 'react';
import { SafeAreaView, SectionList, Text, TouchableOpacity, View } from 'react-native';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Bubble from '../components/Bubble';
import { parseAll, parseTotal } from '../functions/parser';
import { iconColors, homeScreenStyles, shade3, maxWidth, styles, white, bgColor,  } from '../styles';

class Screen extends React.Component {

    constructor(props) {
        super(props);
        const total = parseTotal(this.props.records);
        console.log(parseAll(this.props.records));
        this.state = {
            balance: Math.floor(total),
            balanceDecimal: this.getDecimal(total),
            expand: '',
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
                <View style={{ ...styles.rows, justifyContent: 'space-between', paddingTop: 50 }}>
                    <View style={{ ...styles.columns, maxHeight: 35, justifyContent: 'center' }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', minHeight: 30, minWidth: 30 }}>
                            <Icon name={'currency-' + this.props.settings.currency} color={this.text().color} size={30} />
                        </View>
                        <Text style={this.balance()}>{this.state.balance}</Text>
                        <Text style={this.balanceSmall()}>.{this.state.balanceDecimal}</Text>
                    </View>
                    <View style={{ ...styles.columns, maxHeight: 20, justifyContent: 'center' }}>
                        <Icon name={'currency-' + this.props.settings.currency} color={this.text().color} size={15} />
                        <Text style={{ color: this.iconColor() }}>{this.state.balance + '.' + this.state.balanceDecimal} left for 3 days</Text>
                    </View>
                    <View style={{ height: 10, justifyContent: 'center' }}>
                        <Progress.Bar color={this.props.settings.accent} progress={0.3} width={maxWidth / 2} />
                    </View>
                    <View style={{ ...styles.columns, justifyContent: 'space-evenly', maxHeight: 70 }}>
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
                            <Bubble color={this.props.settings.accent} iconName={'flag-outline'} iconSize={25} onPress={() => console.log('new goal')} size={35} />
                            <Text style={this.centerText()}>Set Goal</Text>
                        </View>
                    </View>
                    <SafeAreaView style={this.safeAreaView()}>
                        <SectionList
                            renderItem={({ item }) =>
                                <TouchableOpacity onPress={() => { }} style={{ ...styles.roundView, ...styles.columns, backgroundColor: shade3, justifyContent: 'space-between' }}>
                                    <Icon name={item.icon} size={20} color={white} />
                                    <Text style={{ ...styles.text, width: '50%' }}>{item.category}</Text>
                                    <Text style={{ ...styles.centerText, width: '20%' }}>{(item.type === 'Expense' ? '-' : '+') + item.value}</Text>
                                </TouchableOpacity>
                            }
                            renderSectionHeader={({ section: { title } }) =>
                                <View style={{ backgroundColor: bgColor, paddingTop: '4%', paddingBottom: '3%' }}>
                                    <Text style={styles.text}>{title}</Text>
                                </View>
                            }
                            sections={parseAll(this.props.records)}
                            stickySectionHeadersEnabled={true}
                            style={{ maxHeight: 400, minWidth: maxWidth, paddingHorizontal: '5%' }}
                        />
                    </SafeAreaView>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    records: state.records,
    settings: state.settings
})

export default connect(mapStateToProps)(Screen);