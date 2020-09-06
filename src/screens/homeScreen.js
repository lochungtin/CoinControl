import React from 'react';
import { Text, View } from 'react-native';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Bubble from '../components/Bubble';
import { parseAll } from '../functions/parser';
import { accent, darkWhite, homeScreenStyles, maxWidth, styles, white, } from '../styles';


class Screen extends React.Component {

    constructor(props) {
        super(props);
        const total = parseAll(this.props.records);
        this.state = {
            balance: Math.floor(total),
            balanceDecimal: this.getDecimal(total),
        }
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            const total = parseAll(this.props.records);
            this.setState({ 
                balance: Math.floor(total),
                balanceDecimal: this.getDecimal(total),
            });
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    getDecimal = total => {
        total = Math.abs(total);
        return (total - Math.floor(total)) * 100;
    }

    render() {
        return (
            <View style={styles.screen}>
                <View style={{ ...styles.rows, justifyContent: 'space-evenly', paddingTop: 50 }}>
                    <View style={{ ...styles.columns, maxHeight: 35, justifyContent: 'center' }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', minHeight: 30, minWidth: 30 }}>
                            <Icon name={'currency-gbp'} color={white} size={30} />
                        </View>
                        <Text style={homeScreenStyles.balance}>{this.state.balance}</Text>
                        <Text style={homeScreenStyles.balanceSmall}>.{this.state.balanceDecimal}</Text>
                    </View>
                    <View style={{ ...styles.columns, maxHeight: 20, justifyContent: 'center' }}>
                        <Icon name={'currency-gbp'} color={darkWhite} size={15} />
                        <Text style={{ color: darkWhite }}>{this.state.balance + '.' + this.state.balanceDecimal} left for 3 days</Text>
                    </View>
                    <View style={{ height: 10, justifyContent: 'center' }}>
                        <Progress.Bar color={accent} progress={0.3} width={maxWidth / 2} />
                    </View>
                    <View style={{ ...styles.columns, justifyContent: 'space-evenly', maxHeight: 70 }}>
                        <View style={{ ...styles.rows, maxWidth: 70 }}>
                            <Bubble color={accent} iconName={'sync'} iconsSize={25} onPress={() => console.log('sync')} size={35} />
                            <Text style={styles.centerText}>Sync</Text>
                        </View>
                        <View style={{ ...styles.rows, maxWidth: 70 }}>
                            <Bubble color={accent} iconName={'plus'} iconsSize={25} onPress={() => this.props.navigation.navigate('Update', { title: 'Income' })} size={35} />
                            <Text style={styles.centerText}>Income</Text>
                        </View>
                        <View style={{ ...styles.rows, maxWidth: 70 }}>
                            <Bubble color={accent} iconName={'minus'} iconsSize={25} onPress={() => this.props.navigation.navigate('Update', { title: 'Expense' })} size={35} />
                            <Text style={styles.centerText}>Expense</Text>
                        </View>
                        <View style={{ ...styles.rows, maxWidth: 70 }}>
                            <Bubble color={accent} iconName={'flag-outline'} onPress={() => console.log('new goal')} iconsSize={25} size={35} />
                            <Text style={styles.centerText}>Set Goal</Text>
                        </View>
                    </View>
                    <View style={{ height: 400 }} />
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    records: state.records
})

export default connect(mapStateToProps)(Screen);