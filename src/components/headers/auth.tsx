import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import { AuthHeaderStyles, screenWidth } from './styles';

import { ReduxPropType } from '../../types/redux';
import { ScreenProps } from '../../types/ui';

class Header extends React.Component<ReduxPropType & ScreenProps> {
    render() {
        let scale: number = screenWidth / 20;
        return (
            <View>
                <StatusBar backgroundColor={this.props.theme.static.accentC} />
                <View style={{ ...AuthHeaderStyles.stack, height: scale * 11 }}>
                    <Svg>
                        <Path
                            d='M 0 0 L 0 6 C 3.258 9.22 4.008 5.756 5.779 6.846 C 7.358 8.005 8.687 10.242 10.788 7.71 C 12.503 5.302 14.514 5.42 15.377 7.518 C 16.42 12.385 19 11 19.993 8.801 L 20 0 L 0 0 L 0 6'
                            fill={this.props.theme.static.accentC}
                            scale={scale}
                        />
                    </Svg>
                    <View style={AuthHeaderStyles.navBtnStack}>
                        <View style={AuthHeaderStyles.navBtnPositioner}>
                            <TouchableOpacity onPress={this.props.navigation.toggleDrawer}>
                                <Icon
                                    color={this.props.theme.static.icon.drawerC}
                                    name='menu-open'
                                    size={40}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(Header);
