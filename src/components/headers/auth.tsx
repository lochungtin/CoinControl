import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { connect } from 'react-redux';

import { ReduxPropType } from '../../types/redux';
import { screenWidth } from './styles';

class Header extends React.Component<ReduxPropType> {
    render() {
        return (
            <Svg>
                <Path
                    d='M 0 0 L 0 6 C 3.258 9.22 4.008 5.756 5.779 6.846 C 7.358 8.005 8.687 10.242 10.788 7.71 C 12.503 5.302 14.514 5.42 15.377 7.518 C 16.42 12.385 19 11 19.993 8.801 L 20 0 L 0 0 L 0 6'
                    fill={this.props.theme.static.accentC}
                    scale={screenWidth / 20}
                />
            </Svg>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(Header);
