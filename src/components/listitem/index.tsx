import React, { ReactElement } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { WHITE } from '../../data/color';

import { CategoryType } from '../../types/data';
import { ReduxPropType } from '../../types/redux';
import { ListItemStyles } from './styles';

interface DataProps {
    category: CategoryType,
    children?: ReactElement,
    key: string,
    label: string,
    onPress?: () => void,
    uppercase?: boolean,
}

class LItem extends React.Component<ReduxPropType & DataProps> {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} style={{ ...ListItemStyles.root, backgroundColor: this.props.theme.dynamic.screen.secondaryBgC }}>
                <View style={ListItemStyles.contentPositioner}>
                    <View style={{ ...ListItemStyles.icon, backgroundColor: this.props.category.color }}>
                        <Icon
                            color={WHITE}
                            name={this.props.category.icon}
                            size={25}
                        />
                    </View>
                    <Text style={{ ...ListItemStyles.label, color: this.props.theme.dynamic.text.mainC }}>
                        {this.props.uppercase ? this.props.label.toUpperCase() : this.props.label}
                    </Text>
                    <View style={ListItemStyles.rightChild}>
                        {this.props.children}
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(LItem);
