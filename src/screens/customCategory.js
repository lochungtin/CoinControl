import React from 'react';
import { FlatList, View } from 'react-native';
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
    }

    centerText = () => {
        return this.props.settings.darkMode ? styles.centerTextD : styles.centerTextL;
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
                    renderItem={({ item }) => <CategoryItem 
                        dark={this.props.settings.darkMode} 
                        accent={this.props.settings.accent}
                        item={item} 
                        />
                    }
                />
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