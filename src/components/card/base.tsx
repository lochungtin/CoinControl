import React, { ReactElement } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import { GeneralCardStyles } from './styles';

import { ReduxThemeType } from '../../types/redux';

interface DataProps {
    children: ReactElement,
    icon: string,
    title: string,
}

class CardBase extends React.Component<ReduxThemeType & DataProps> {
    render() {
        return (
            <View style={{ ...GeneralCardStyles.root, backgroundColor: this.props.theme.dynamic.screen.secondaryBgC }}>
                <View style={GeneralCardStyles.content}>
                    <View style={GeneralCardStyles.topRow}>
                        <Icon
                            color={this.props.theme.static.accentC}
                            name={this.props.icon}
                            size={35}
                        />
                        <View style={GeneralCardStyles.titlePadding}>
                            <Text style={{ ...GeneralCardStyles.title, color: this.props.theme.dynamic.text.labelC }}>
                                {this.props.title.toUpperCase()}
                            </Text>
                        </View>
                    </View>
                </View>
                {this.props.children}
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxThemeType) => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(CardBase);
