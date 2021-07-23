import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import Category from '../category';

import { ListStyles } from './styles';

import { CategoryType} from '../../../types/data';
import { ReduxThemeType } from '../../../types/redux';

interface DataProps {
    categoryList: Array<CategoryType>,
    onSelectCategory: (categoryKey: string) => void,
}

class List extends React.Component<ReduxThemeType & DataProps> {
    render() {
        let part2: Array<CategoryType> = [...this.props.categoryList];
        let part1: Array<CategoryType> = part2.splice(0, Math.ceil(part2.length / 2));

        return (
            <View style={ListStyles.root}>
                <View style={ListStyles.column}>
                    {part1.map((category: CategoryType) => {
                        return (
                            <Category
                                category={category}
                                key={category.key}
                                onPress={() => this.props.onSelectCategory(category.key)}
                            />
                        );
                    })}
                </View>
                <View style={ListStyles.column}>
                    {part2.map((category: CategoryType) => {
                        return (
                            <Category
                                category={category}
                                key={category.key}
                                onPress={() => this.props.onSelectCategory(category.key)}
                            />
                        );
                    })}
                </View>
            </View>
        );
    }
}
const mapStateToProps = (state: ReduxThemeType) => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(List);
