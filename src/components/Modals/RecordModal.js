import React from 'react';
import { Text, TextInput, View, } from 'react-native';
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
import { generalBottomModalStyles, recordModalStyles, styles, } from '../../styles';

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

    catValue = () => (this.item('type') === 'Expense' ? this.props.expenseCategories : this.props.incomeCategories)[this.item('catKey')];

    close = () => {
        this.setState({ editTitle: false });
        this.props.close();
    }

    cpConfirm = hex => {
        this.setState({ cpOpen: false });
        var payload = {}
        payload[this.item('catKey')] = { ...this.catValue(), color: hex };
        if (this.item('type') === 'Expense')
            store.dispatch(editExpenseCategory(payload));
        else
            store.dispatch(editIncomeCategory(payload));
    }

    iconColor = () => this.props.settings.darkMode ? white : black;

    item = value => {
        if (this.props.itemkey) {
            const keyset = this.props.itemkey.split(':');
            return this.props.data.data[keyset[0]][keyset[1]][value]
        }
        return this.props.item[value];
    }

    onChangeDate = date => this.setState({ newDate: date });

    onConfirm = num => {
        var rec = {
            catKey: this.item('catKey'),
            date: this.item('date'),
            type: this.item('type'),
        };

        if (this.props.itemkey)
            rec.key = this.props.itemkey;

        if (rec.value !== num)
            rec.value = parseFloat(num);
        if (rec.date !== this.state.newDate && this.state.newDate !== '')
            rec.date = this.state.newDate;
        if (rec.title !== this.state.newTitle)
            rec.title = this.state.newTitle;

        this.props.onConfirm(rec);
    }

    placeholderColor = () => this.props.settings.darkMode ? shade2 : shade3;

    style = (stylesheet, styleName) => stylesheet[styleName + (this.props.settings.darkMode ? "D" : "L")];

    swipeControl = () => this.state.cpOpen || this.state.dpOpen ? undefined : 'down';

    render() {
        return (
            <Modal
                animationIn={'slideInUp'}
                isVisible={this.props.open}
                onBackdropPress={this.close}
                onBackButtonPress={this.close}
                onModalShow={this.update}
                onSwipeComplete={this.close}
                swipeDirection={this.swipeControl()}
                style={{ flexDirection: 'row', alignItems: 'flex-end', padding: 0, margin: 0 }}
            >
                {this.props.open && <>
                    <View style={styles.rows}>
                        <View style={this.style(generalBottomModalStyles, 'header')}>
                            <ExpandButton color={this.iconColor()} onPress={this.close} />
                        </View>
                        <View style={this.style(recordModalStyles, 'inputBox')}>
                            <Icon name={this.catValue().iconName} color={this.catValue().color} size={30} />
                            <TextInput
                                onChangeText={text => this.setState({ newTitle: text, editTitle: true })}
                                placeholder={'Title (Optional)'}
                                placeholderTextColor={this.placeholderColor()}
                                style={this.style(recordModalStyles, 'input')}
                                value={this.state.editTitle ? this.state.newTitle : this.item('title')}
                            />
                            <Bubble onPress={() => this.setState({ cpOpen: true })} color={this.catValue().color} size={25} />
                        </View>
                        <Numpad
                            onConfirm={this.onConfirm}
                            onSpecialPress={() => this.setState({ dpOpen: true })}
                            num={this.item('value') === undefined ? '0' : this.item('value')}
                        >
                            <Text style={{ color: this.props.settings.accent }}>
                                Date
                            </Text>
                            <Text style={{ color: this.props.settings.accent }}>
                                {(this.state.newDate === '' ? this.item('date') : this.state.newDate).substring(5).replace(/-/, '/')}
                            </Text>
                        </Numpad>
                    </View>
                    <ColorPicker
                        close={() => this.setState({ cpOpen: false })}
                        open={this.state.cpOpen}
                        onPress={hex => this.cpConfirm(hex)}
                    />
                    <DatePicker
                        action={this.onChangeDate}
                        close={() => this.setState({ dpOpen: false })}
                        open={this.state.dpOpen}
                        selected={(this.state.newDate === '' ? this.item('date') : this.state.newDate)}
                    />
                </>}
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    data: state.data,
    expenseCategories: state.expenseCategories,
    incomeCategories: state.incomeCategories,
    settings: state.settings
});

export default connect(mapStateToProps)(RecordModal);
