import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import CategoryItem from '../components/CategoryItem';
import ExpandButton from '../components/ExpandButton';
import ScreenHeader from '../components/ScreenHeader';
import { store } from '../redux/store';
import { black, maxHeight, recordStyles, styles, white, } from '../styles';


class Screen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            adding: false,
            deleting: false,
        }
    }

    centerText = () => {
        return this.props.settings.darkMode ? styles.centerTextD : styles.centerTextL;
    }

    color = () => {
        return this.props.settings.darkMode ? white : black;
    }

    data = () => {
        return this.props.route.params.title === 'Expense' ? this.props.expenseCategories : this.props.incomeCategories;
    }

    render() {
        return (
            <View style={this.props.settings.darkMode ? styles.screenD : styles.screenL}>
                <ScreenHeader dark={this.props.settings.darkMode} action={() => this.props.navigation.goBack()} name={'Edit ' + this.props.route.params.title + ' Category'} />
                <FlatList
                    data={this.data()}
                    renderItem={({ item }) =>
                        <CategoryItem
                            dark={this.props.settings.darkMode}
                            accent={this.props.settings.accent}
                            expand={this.state.deleting}
                            item={item}
                        />
                    }
                    style={{ marginVertical: 50 }}
                />
                <View style={{ ...styles.columns, justifyContent: 'space-between', width: '25%' }}>
                    <TouchableOpacity onPress={() => this.setState({ adding: true })}>
                        <Icon name={'plus'} size={30} color={this.color()} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ deleting: !this.state.deleting })}>
                        <Icon name={'trash-can'} size={30} color={this.state.deleting ? this.props.settings.accent : this.color()} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    expenseCategories: state.expenseCategories,
    incomeCategories: state.incomeCategories,
    settings: state.settings
})

export default connect(mapStateToProps)(Screen);