import React from 'react';
import { SafeAreaView, SectionList, StatusBar, Text, View, } from 'react-native';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Bubble from '../components/Bubble';
import SectionHeader from '../components/SectionHeader';
import SectionItem from '../components/SectionItem';
import RecordModal from '../components/Modals/RecordModal';
import { parseAll, parseGoal, parseGoalPercentage, parseTotal, } from '../functions/parser';
import { deleteRecord, editRecord, } from '../redux/action';
import { store } from '../redux/store';

import { black, bgColorD, bgColorL, shade2, shade3, } from '../data/color';
import { homeScreenStyles, maxWidth, styles, } from '../styles';

class Screen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            amount: 0,
            expand: '',
            gmOpen: false,
            item: {},
            rmOpen: false,
            toGoal: parseGoal(this.props.records, this.props.goal.amount),
        }
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.setState({ toGoal: parseGoal(this.props.records, this.props.goal.amount) });
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    balance = () => Math.floor(parseTotal(this.props.records));

    balanceDecimal = () => {
        var total = Math.abs(parseTotal(this.props.records));
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

    goalMessageColor = () => this.props.settings.darkMode ? shade2 : shade3;

    statusBarBg = () => this.props.settings.darkMode ? bgColorD : bgColorL;

    statusBarStyle = () => this.props.settings.darkMode ? 'light-content' : 'dark-content';

    style = (stylesheet, styleName) => stylesheet[styleName + (this.props.settings.darkMode ? "D" : "L")];

    render() {
        return (
            <View style={this.props.settings.darkMode ? styles.screenD : styles.screenL}>
                <StatusBar backgroundColor={this.statusBarBg()} barStyle={this.statusBarStyle()} />
                <View style={{ alignItems: 'center', paddingTop: 20 }}>
                    <View style={{ ...styles.rows, height: '30%', justifyContent: 'space-evenly' }}>
                        <View style={styles.columns}>
                            <Icon name={'currency-' + this.props.settings.currency} color={this.style(styles, 'text').color} size={30} />
                            <Text style={this.style(homeScreenStyles, 'balance')}>
                                {this.balance()}
                            </Text>
                            <Text style={this.style(homeScreenStyles, 'balanceSmall')}>
                                {"." + this.balanceDecimal()}
                            </Text>
                        </View>
                        <View style={styles.columns}>
                            <Icon name={'currency-' + this.props.settings.currency} color={this.props.goal.type === 'none' ? 'transparent' : this.style(styles, 'text').color} size={15} />
                            <Text style={{ color: this.goalMessageColor() }}>
                                {this.goalMessage(parseGoal(this.props.records, this.props.goal.amount))}
                            </Text>
                        </View>
                        <View style={styles.columns}>
                            <Progress.Bar color={this.props.settings.accent} progress={1 - parseGoalPercentage(parseGoal(this.props.records, this.props.goal.amount), this.props.goal.amount)} width={maxWidth / 2} />
                        </View>
                        <View style={{ ...styles.columns, width: 250, justifyContent: 'space-evenly' }}>
                            <View style={styles.rows}>
                                <Bubble color={this.props.settings.accent} iconColor={black} iconName={'plus'} iconSize={25} onPress={() => this.props.navigation.navigate('Update', 'Income')} size={35} />
                                <Text style={this.style(styles, 'centerText')}>
                                    Income
                                </Text>
                            </View>
                            <View style={styles.rows}>
                                <Bubble color={this.props.settings.accent} iconColor={black} iconName={'minus'} iconSize={25} onPress={() => this.props.navigation.navigate('Update', 'Expense')} size={35} />
                                <Text style={this.style(styles, 'centerText')}>
                                    Expense
                                </Text>
                            </View>
                            <View style={styles.rows}>
                                <Bubble color={this.props.settings.accent} iconColor={black} iconName={'flag-outline'} iconSize={25} onPress={() => this.setState({ gmOpen: true })} size={35} />
                                <Text style={this.style(styles, 'centerText')}>
                                    Set Goal
                                </Text>
                            </View>
                        </View>
                    </View>

                    <SafeAreaView style={this.style(homeScreenStyles, 'border')}>
                        {this.props.records.length === 0 &&
                            <View style={{ paddingTop: 30 }}>
                                <Text style={this.style(homeScreenStyles, 'message')}>
                                    Add a record to start using the app
                                </Text>
                            </View>
                        }
                        <SectionList
                            renderItem={({ item }) =>
                                <SectionItem
                                    compactMode={this.props.settings.compactView}
                                    item={item}
                                    onDelete={key => store.dispatch(deleteRecord(key))}
                                    onEdit={item => this.setState({ item: item, rmOpen: true })}
                                />
                            }
                            renderSectionHeader={({ section: { title } }) => <SectionHeader title={title} />}
                            sections={parseAll(this.props.records)}
                            stickySectionHeadersEnabled={true}
                            style={{ flex: 1, minWidth: maxWidth, paddingHorizontal: '5%' }}
                        />
                    </SafeAreaView>
                </View>

                 <RecordModal
                    close={() => this.setState({ rmOpen: false })}
                    item={this.state.item}
                    onConfirm={record => {
                        store.dispatch(editRecord(record));
                        this.setState({ rmOpen: false });
                    }}
                    open={this.state.rmOpen}
                />
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