import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import Bubble from '../components/Bubble';
import { accent, styles, } from '../styles';


class Screen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.screen}>
                <View style={{ ...styles.columns, justifyContent: 'space-evenly' }}>
                    <View style={{ ...styles.rows, maxWidth: 70 }}>
                        <Bubble color={accent} iconName={'sync'} iconsSize={25} onPress={() => console.log('sync')} size={35} />
                        <Text style={styles.centerText}>Sync</Text>
                    </View>
                    <View style={{ ...styles.rows, maxWidth: 70 }}>
                        <Bubble color={accent} iconName={'plus'} iconsSize={25} onPress={() => this.props.navigation.navigate('Update', { type: 'add' })} size={35} />
                        <Text style={styles.centerText}>Income</Text>
                    </View>
                    <View style={{ ...styles.rows, maxWidth: 70 }}>
                        <Bubble color={accent} iconName={'minus'} iconsSize={25} onPress={() => this.props.navigation.navigate('Update', { type: 'minus' })} size={35} />
                        <Text style={styles.centerText}>Expense</Text>
                    </View>
                    <View style={{ ...styles.rows, maxWidth: 70 }}>
                        <Bubble color={accent} iconName={'flag-outline'} onPress={() => console.log('new goal')} iconsSize={25} size={35} />
                        <Text style={styles.centerText}>Set Goal</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(Screen);