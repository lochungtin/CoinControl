import moment from 'moment';
import React from 'react';
import { Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Numpad from '../numpad';
import DatePicker from '../pickers/date';
import MultiPicker from '../pickers/multi';
import ModalBase from './base';
import Selector from './selector';

import { InputModalStyles } from './styles';

import { CategoryStore, CategoryType, DataType } from '../../types/data';
import { ReduxThemeType } from '../../types/redux';

interface AdditionalReduxType {
    categories: CategoryStore,
}

interface DataProps {
    record: DataType,
    onClose: () => void,
    onConfirm: (obj: DataType) => void,
    onDelete?: () => void,
    open: boolean,
}

class Modal extends React.Component<ReduxThemeType & AdditionalReduxType & DataProps> {

    state = {
        categoryKey: this.props.record.categoryKey || 'C0000000',
        date: this.props.record.date,
        dpOpen: false,
        msOpen: false,
        title: this.props.record.title,
    }

    onClose = () => {
        this.setState({ categoryKey: 'C0000000' });
        this.props.onClose();
    }

    onConfirm = (value: number) => {
        this.setState({ categoryKey: 'C0000000' });
        this.props.onConfirm({
            value,
            categoryKey: this.state.categoryKey,
            categoryType: this.props.record.categoryType,
            date: this.state.date,
            key: this.props.record.key,
            lmt: moment().toISOString(),
            title: this.state.title,
        });
    }

    onOpen = () => this.setState({
        categoryKey: this.props.record.categoryKey,
        date: this.props.record.date,
        title: this.props.record.title,
    });

    render() {
        let keylist: Array<string> = Object.keys((this.props.categories)[this.props.record.categoryType]);
        let categories: Array<CategoryType> = keylist.map((key: string) => (this.props.categories)[this.props.record.categoryType][key]);

        let category: CategoryType = (this.props.categories)[this.props.record.categoryType][this.state.categoryKey];

        return (
            <>
                <ModalBase
                    onClose={this.onClose}
                    onOpen={this.onOpen}
                    open={this.props.open}
                >
                    <View style={{ ...InputModalStyles.inputBox, backgroundColor: this.props.theme.dynamic.screen.secondaryBgC }}>
                        <TextInput
                            onChangeText={(title: string) => this.setState({ title })}
                            placeholder='Title (Optional) ...'
                            placeholderTextColor={this.props.theme.dynamic.text.secondaryC}
                            style={{ ...InputModalStyles.textInput, color: this.props.theme.dynamic.text.mainC }}
                            value={this.state.title}
                        />
                    </View>
                    <Selector
                        icon={category.icon}
                        label='Category'
                        onPress={() => this.setState({ msOpen: true })}
                        text={category.name.toUpperCase()}
                    />
                    <Selector
                        icon='calendar-month'
                        label='Date'
                        onPress={() => this.setState({ dpOpen: true })}
                        text={this.state.date}
                    />
                    <Numpad onConfirm={this.onConfirm} value={this.props.record.value} />
                </ModalBase>
                <DatePicker
                    onClose={() => this.setState({ dpOpen: false })}
                    onSelect={(date: string) => this.setState({ date, dpOpen: false })}
                    open={this.state.dpOpen}
                    selected={this.state.date}
                />
                <MultiPicker
                    items={categories}
                    onClose={() => this.setState({ msOpen: false })}
                    onSelect={(category: CategoryType) => this.setState({ categoryKey: category.key, msOpen: false })}
                    open={this.state.msOpen}
                    render={(category: CategoryType) => {
                        return (
                            <View key={category.key} style={InputModalStyles.category}>
                                <View style={{ ...InputModalStyles.icon, backgroundColor: category.color }}>
                                    <Icon
                                        color={this.props.theme.static.icon.categoryC}
                                        name={category.icon}
                                        size={25}
                                    />
                                </View>
                                <Text style={{ ...InputModalStyles.label, color: this.props.theme.dynamic.text.mainC }}>
                                    {category.name.toUpperCase()}
                                </Text>
                            </View>
                        );
                    }}
                    selectedIndices={[keylist.indexOf(this.state.categoryKey)]}
                />
            </>
        );
    }
}

const mapStateToProps = (state: ReduxThemeType & AdditionalReduxType) => ({
    categories: state.categories,
    theme: state.theme,
});

export default connect(mapStateToProps)(Modal);
