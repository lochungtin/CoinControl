import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import { GeneralHeaderStyles } from './styles';

import { ReduxThemeType } from '../../types/redux';
import { ScreenProps } from '../../types/ui';

interface DataProps {
    name: string
}

class Header extends React.Component<ReduxThemeType & ScreenProps & DataProps> {
    render() {
        return (
            <View style={{ ...GeneralHeaderStyles.root, backgroundColor: this.props.theme.dynamic.screen.secondaryBgC }}>
                <StatusBar backgroundColor={this.props.theme.dynamic.screen.secondaryBgC} />
                <View style={GeneralHeaderStyles.contentPositioner}>
                    <TouchableOpacity onPress={this.props.navigation.toggleDrawer}>
                        <Icon
                            color={this.props.theme.static.icon.drawerC}
                            name='menu-open'
                            size={40}
                        />
                    </TouchableOpacity>
                    <Text style={{ ...GeneralHeaderStyles.label, color: this.props.theme.dynamic.text.labelC }}>
                        {this.props.name.toUpperCase()}
                    </Text>
                    <Icon
                        color='transparent'
                        name='menu-open'
                        size={40}
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxThemeType) => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(Header);
