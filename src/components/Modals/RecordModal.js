import React from 'react';
import { TextInput, View, } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Bubble from '../Bubble';
import ColorPicker from '../ColorPicker';
import DatePicker from '../DatePicker';
import ExpandButton from '../ExpandButton';
import Numpad from '../Numpad';
import { editExpenseCategory, editIncomeCategory } from '../../redux/action';
import { store } from '../../redux/store';

import { black, shade2, shade3, white, } from '../../data/color';
import { recordModalStyles, styles, } from '../../styles';

class RecordModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cpOpen: false,
            dpOpen: false,
            editTitle: false,
            newDate: '',
            newTitle: '',
        }
    }

    catValue = () => (this.props.item.type === 'Expense' ? this.props.expenseCategories : this.props.incomeCategories)[this.props.item.catKey];

    close = () => {
        this.setState({ editTitle: false });
        this.props.close();
    }

    cpConfirm = hex => {
        this.setState({ cpOpen: false });
        var payload = {}
        payload[this.props.item.catKey] = { ...this.catValue(), color: hex };
        if (this.props.item.type === 'Expense')
            store.dispatch(editExpenseCategory(payload));
        else
            store.dispatch(editIncomeCategory(payload));
    }

    iconColor = () => this.props.settings.darkMode ? white : black;

    onChangeDate = date => this.setState({ newDate: date });

    onConfirm = num => {
        var rec = { ...this.props.item };

        if (rec.value !== num)
            rec.value = parseFloat(num);
        if (rec.date !== this.state.newDate && this.state.newDate !== '')
            rec.date = this.state.newDate;
        if (rec.title !== this.state.newTitle)
            rec.title = this.state.newTitle;

        this.props.onConfirm(rec);
    }

    placeholderColor = () => this.props.settings.darkMode ? shade2 : shade3;

    style = styleName => recordModalStyles[styleName + (this.props.settings.darkMode ? "D" : "L")];

    render() {
        return (
            <Modal
                animationIn={'slideInUp'}
                backdropOpacity={0}
                isVisible={this.props.open}
                onBackdropPress={this.close}
                onBackButtonPress={this.close}
                onSwipeComplete={this.close}
                swipeDirection='down'
                style={{ flexDirection: 'row', alignItems: 'flex-end', padding: 0, margin: 0 }}
            >
                {this.props.open &&
                    <View style={styles.rows}>
                        <View style={this.style('header')}>
                            <ExpandButton color={this.iconColor()} onPress={this.close} />
                        </View>
                        <View style={this.style('inputBox')}>
                            <Icon name={this.catValue().iconName} color={this.catValue().color} size={30} />
                            <TextInput
                                onChangeText={text => this.setState({ newTitle: text, editTitle: true })}
                                placeholder={'Title (Optional)'}
                                placeholderTextColor={this.placeholderColor()}
                                style={this.style('input')}
                                value={this.state.editTitle ? this.state.newTitle : this.props.item.title}
                            />
                            <Bubble onPress={() => this.setState({ cpOpen: true })} color={this.catValue().color} size={25} />
                        </View>
                        <Numpad
                            onChangeDate={this.onChangeDate}
                            onConfirm={this.onConfirm}
                            date={this.props.item.date}
                            num={this.props.item.value === undefined ? '0' : this.props.item.value}
                        />
                    </View>
                }
                <ColorPicker
                    close={() => () => this.setState({ cpOpen: false })}
                    open={this.state.cpOpen}
                    onPress={hex => this.cpConfirm(hex)}
                />

                <DatePicker
                    action={this.onChangeDate}
                    close={() => this.setState({ dpOpen: false })}
                    open={this.state.dpOpen}
                    selected={this.state.date}
                />
            </Modal>
        )
    }
}

const mapStateToProps = state => ({
    expenseCategories: state.expenseCategories,
    incomeCategories: state.incomeCategories,
    settings: state.settings
});

export default connect(mapStateToProps)(RecordModal);
