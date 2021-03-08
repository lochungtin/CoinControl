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
import { editExpenseCategory, editIncomeCategory, } from '../../redux/action';
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
        };
    }

    catValue = key => (this.item('type') === 'Expense' ? this.props.expenseCategories : this.props.incomeCategories)[this.item('catKey')][key];

    close = () => {
        this.setState({ editTitle: false, newDate: '' });
        this.props.close();
    }

    cpToggle = cpOpen => this.setState({ cpOpen });

    cpConfirm = color => {
        this.setState({ cpOpen: false });
        let payload = {}
        payload[this.item('catKey')] = {
            color,
            iconName: this.catValue('iconName'),
            name: this.catValue('name'),
        };
        store.dispatch(this.item('type') === 'Expense' ? editExpenseCategory(payload) : editIncomeCategory(payload));
    }

    dpToggle = dpOpen => this.setState({ dpOpen });

    iconColor = () => this.props.settings.darkMode ? white : black;

    item = value => {
        if (this.props.itemkey) {
            const keyset = this.props.itemkey.split(':');
            return this.props.data.data[keyset[0]][keyset[1]][value]
        }
        return this.props.item[value];
    }

    onChangeDate = newDate => this.setState({ newDate });

    onConfirm = num => {
        let rec = {
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

    textChange = newTitle => this.setState({ newTitle, editTitle: true });

    render() {
        return (
            <Modal
                animationIn={'slideInUp'}
                isVisible={this.props.open}
                onBackdropPress={this.close}
                onBackButtonPress={this.close}
                onSwipeComplete={this.close}
                style={generalBottomModalStyles.bottomModalContainer}
                swipeDirection={this.swipeControl()}
            >
                {this.props.open && <>
                    <View style={styles.rows}>
                        <View style={this.style(generalBottomModalStyles, 'header')}>
                            <ExpandButton color={this.iconColor()} onPress={this.close} />
                        </View>
                        <View style={this.style(recordModalStyles, 'inputBox')}>
                            <Icon
                                color={this.catValue('color')}
                                name={this.catValue('iconName')}
                                size={30}
                            />
                            <TextInput
                                onChangeText={this.textChange}
                                placeholder={'Title (Optional)'}
                                placeholderTextColor={this.placeholderColor()}
                                style={this.style(recordModalStyles, 'input')}
                                value={this.state.editTitle ? this.state.newTitle : this.item('title')}
                            />
                            <Bubble onPress={() => this.cpToggle(true)} color={this.catValue('color')} size={25} />
                        </View>
                        <Numpad
                            key={this.state.newDate}
                            onConfirm={this.onConfirm}
                            onSpecialPress={() => this.dpToggle(true)}
                            num={this.item('value') === undefined ? '0' : this.item('value')}
                        >
                            <Text style={{ color: this.props.settings.accent }}>
                                Date
                            </Text>
                            <Text style={{ color: this.props.settings.accent }}>
                                {(this.state.newDate ? this.state.newDate : this.item('date')).substring(5).replace(/-/, '/')}
                            </Text>
                        </Numpad>
                    </View>
                    <ColorPicker
                        close={() => this.cpToggle(false)}
                        onPress={this.cpConfirm}
                        open={this.state.cpOpen}
                    />
                    <DatePicker
                        action={this.onChangeDate}
                        close={() => this.dpToggle(false)}
                        date={(this.state.newDate === '' ? this.item('date') : this.state.newDate)}
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
