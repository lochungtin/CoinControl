import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { BulletStyles, screenWidth } from './styles';

import { ReduxThemeType } from '../../types/redux';

interface DataProps {
    inactive?: boolean,
    onPress: () => void,
    text: string,
    width: number,
}

class Bullet extends React.Component<ReduxThemeType & DataProps> {
    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={{
                    ...BulletStyles.root,
                    backgroundColor: this.props.inactive ? this.props.theme.static.secondaryC : this.props.theme.static.accentC,
                    width: screenWidth * this.props.width,
                }}
            >
                <Text style={{ ...BulletStyles.text, color: this.props.inactive ? this.props.theme.static.bulletTextC.inactive : this.props.theme.static.bulletTextC.active  }}>
                    {this.props.text.toUpperCase()}
                </Text>
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = (state: ReduxThemeType) => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(Bullet);
