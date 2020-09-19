import React from 'react';
import { Modal, SafeAreaView, SectionList, StatusBar, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Bubble from '../components/Bubble';
import ExpandButton from '../components/ExpandButton';
import SectionHeader from '../components/SectionHeader';
import SectionItem from '../components/SectionItem';
import { parseAll, parseGoal, parseGoalPercentage, parseTotal } from '../functions/parser';
import { defaultGoal, updateGoal } from '../redux/action';
import { store } from '../redux/store';
import { bgColorD, bgColorL, black, iconColors, homeScreenStyles, maxWidth, maxHeight, styles, white, } from '../styles';

class Screen extends React.Component {

    constructor(props) {
        super(props);
        const total = parseTotal(this.props.records);
        this.state = {
            amount: 0,
            balance: Math.floor(total),
            balanceDecimal: this.getDecimal(total),
            expand: '',
            open: false,
            toGoal: parseGoal(this.props.records, this.props.goal.amount),
        }
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            const total = parseTotal(this.props.records);
            this.setState({
                balance: Math.floor(total),
                balanceDecimal: this.getDecimal(total),
                toGoal: parseGoal(this.props.records, this.props.goal.amount),
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

    goalMessage = (amount) => {
        switch (this.props.goal.type) {
            case 'monthly':
                return amount + ' left for this month';
            case 'weekly':
                return amount + ' left for this week';
            default:
                return 'No Goals Currently';
        }
    }

    message = () => {
        return this.props.settings.darkMode ? homeScreenStyles.messageD : homeScreenStyles.messageL;
    }

    safeAreaView = () => {
        return this.props.settings.darkMode ? homeScreenStyles.borderD : homeScreenStyles.borderL;
    }

    statusBarBg = () => {
        return this.props.settings.darkMode ? bgColorD : bgColorL;
    }

    statusBarStyle = () => {
        return this.props.settings.darkMode ? 'light-content' : 'dark-content';
    }

    text = () => {
        return this.props.settings.darkMode ? styles.textD : styles.textL;
    }

    render() {
        return (
            <View style={this.props.settings.darkMode ? styles.screenD : styles.screenL}>
                <StatusBar backgroundColor={this.statusBarBg()} barStyle={this.statusBarStyle()}/>
                <View style={{ alignItems: 'center', paddingTop: 20 }}>
                    <View style={{ ...styles.rows, maxHeight: '30%', justifyContent: 'space-evenly' }}>
                        <View style={{ ...styles.columns, flex: 0 }}>
                            <Icon name={'currency-' + this.props.settings.currency} color={this.text().color} size={30} />
                            <Text style={this.balance()}>{this.state.balance}</Text>
                            <Text style={this.balanceSmall()}>.{this.state.balanceDecimal}</Text>
                        </View>
                        <View style={{ ...styles.columns, flex: 0 }}>
                            <Icon name={'currency-' + this.props.settings.currency} color={this.props.goal.type === 'none' ? 'transparent' : this.text().color} size={15} />
                            <Text style={{ color: this.iconColor() }}>{this.goalMessage(parseGoal(this.props.records, this.props.goal.amount))} </Text>
                        </View>
                        <View style={{ ...styles.columns, flex: 0 }}>
                            <Progress.Bar color={this.props.settings.accent} progress={parseGoalPercentage(this.state.toGoal, this.props.goal.amount)} width={maxWidth / 2} />
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
                        {this.props.records.length === 0 &&
                            <View style={{ paddingTop: 30 }}>
                                <Text style={this.message()}>Add a record to start using the app</Text>
                            </View>
                        }
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
                                            if (this.state.amount !== 0) {
                                                store.dispatch(updateGoal({
                                                    amount: this.state.amount,
                                                    type: 'weekly',
                                                }));
                                                this.setState({ open: false });
                                            }
                                        }}
                                        style={{ ...styles.roundView, backgroundColor: white, paddingHorizontal: 10, width: '30%' }}
                                    >
                                        <Text style={styles.centerTextL}>Weekly</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            if (this.state.amount !== 0) {
                                                store.dispatch(updateGoal({
                                                    amount: this.state.amount,
                                                    type: 'monthly',
                                                }));
                                                this.setState({ open: false });
                                            }
                                        }}
                                        style={{ ...styles.roundView, backgroundColor: white, paddingHorizontal: 10, width: '30%' }}
                                    >
                                        <Text style={styles.centerTextL}>Monthly</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            store.dispatch(defaultGoal());
                                            this.setState({ open: false });
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
    goal: state.goal,
    records: state.records,
    settings: state.settings
})

export default connect(mapStateToProps)(Screen);