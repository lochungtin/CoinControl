import React from 'react';
import { SafeAreaView, SectionList, Text, View, } from 'react-native';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import HomeNavButton from '../components/HomeNavButton';
import ConfirmationModal from '../components/Modals/ConfirmationModal';
import GoalModal from '../components/Modals/GoalModal';
import RecordModal from '../components/Modals/RecordModal';
import SectionHeader from '../components/SectionHeader';
import SectionItem from '../components/SectionItem';
import { deleteRecord, editRecord, } from '../redux/action';
import { store } from '../redux/store';

import { shade2, shade3, } from '../data/color';
import { homePromptText, goalText } from '../data/text';
import { homeScreenStyles, maxWidth, styles, } from '../styles';

class Screen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            confirmType: '',
            focus: '',
            gmOpen: false,
            rmOpen: false,
        }
    }

    deleteRecord = key => {
        store.dispatch(deleteRecord(key));
        this.setState({ confirmType: '' });
    }

    goalMessage = () => {
        if (this.props.data.goal.percentage > 1)
            return goalText.exceed;
        return (this.props.data.goalSettings.type !== 'none' ? this.processValue(this.props.data.goal.remaining) : '') + " " + goalText[this.props.data.goalSettings.type];
    }

    goalMessageColor = () => this.props.settings.darkMode ? shade2 : shade3;

    openConfirmation = key => {
        if (!this.props.settings.prompt.dr)
            this.setState({ confirmType: 'dr', focus: key });
        else
            this.deleteRecord(key);
    }

    processValue = val => {
        const splt = val.toString().split('.');
        if (splt.length === 1)
            return val + '.00';
        if (splt[1].length === 1)
            return val + '0';
        else
            return splt[0] + '.' + splt[1].substring(0, 2);
    }

    style = (stylesheet, styleName) => stylesheet[styleName + (this.props.settings.darkMode ? "D" : "L")];

    render() {
        return (
            <View style={this.style(styles, 'screen')}>
                <View style={{ ...styles.rows, height: '30%', justifyContent: 'space-evenly' }}>
                    <View style={styles.columns}>
                        <Icon name={'currency-' + this.props.settings.currency} color={this.style(styles, 'text').color} size={30} />
                        <Text style={this.style(homeScreenStyles, 'balance')}>
                            {this.props.data.total.split('.')[0]}
                        </Text>
                        <Text style={this.style(homeScreenStyles, 'balanceSmall')}>
                            {"." + this.props.data.total.split('.')[1].substring(0, 2)}
                        </Text>
                    </View>
                    <View style={styles.columns}>
                        {this.props.data.goalSettings.type !== 'none' && this.props.data.goal.percentage <= 1 &&
                            <Icon name={'currency-' + this.props.settings.currency} color={this.goalMessageColor()} size={15} />
                        }
                        <Text style={{ color: this.goalMessageColor() }}>
                            {this.goalMessage()}
                        </Text>
                    </View>
                    <View style={styles.columns}>
                        <Progress.Bar color={this.props.settings.accent} progress={this.props.data.goal.percentage} width={maxWidth / 1.8} />
                    </View>
                    <View style={{ ...styles.columns, width: 250, justifyContent: 'space-evenly' }}>
                        <HomeNavButton icon={'cloud-sync-outline'} onPress={() => this.props.navigation.navigate('Update', 'Income')} text={'Sync'} />
                        <HomeNavButton icon={'plus'} onPress={() => this.props.navigation.navigate('Update', 'Income')} text={'Income'} />
                        <HomeNavButton icon={'minus'} onPress={() => this.props.navigation.navigate('Update', 'Expense')} text={'Expense'} />
                        <HomeNavButton icon={'flag-outline'} onPress={() => this.setState({ gmOpen: true })} text={'Goals'} />
                    </View>
                </View>

                <SafeAreaView style={this.style(homeScreenStyles, 'border')}>
                    {this.props.data.display.length === 0 &&
                        <View style={{ paddingTop: 30 }}>
                            <Text style={this.style(homeScreenStyles, 'message')}>
                                Add a record to start using the app
                            </Text>
                        </View>
                    }
                    <SectionList
                        key={this.props.data}
                        keyExtractor={(item, index) => item + index}
                        renderItem={({ item }) =>
                            <SectionItem
                                compactMode={this.props.settings.compactView}
                                itemkey={item}
                                onDelete={key => this.openConfirmation(key)}
                                onEdit={key => this.setState({ focus: key, rmOpen: true })}
                            />
                        }
                        renderSectionHeader={({ section: { title } }) =>
                            <SectionHeader title={title} />
                        }
                        sections={this.props.data.display}
                        stickySectionHeadersEnabled={true}
                        style={{ flex: 1, minWidth: maxWidth, paddingHorizontal: '2.5%' }}
                    />
                </SafeAreaView>

                <RecordModal
                    close={() => this.setState({ rmOpen: false })}
                    itemkey={this.state.focus}
                    onConfirm={record => {
                        store.dispatch(editRecord(record));
                        this.setState({ rmOpen: false });
                    }}
                    open={this.state.rmOpen}
                />
                <GoalModal
                    close={() => this.setState({ gmOpen: false })}
                    open={this.state.gmOpen}
                />
                <ConfirmationModal
                    close={() => this.setState({ confirmType: '' })}
                    onConfirm={() => this.deleteRecord(this.state.focus)}
                    open={this.state.confirmType !== ''}
                    text={homePromptText[this.state.confirmType]}
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    data: state.data,
    settings: state.settings
});

export default connect(mapStateToProps)(Screen);