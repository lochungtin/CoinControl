import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import { BulletStyles, screenWidth } from './styles';

import { ReduxPropType } from '../../types/redux';

interface DataProps {
    inactive?: boolean,
    onPress: () => void,
    text: string,
    width: number,
}

class Bullet extends React.Component<ReduxPropType & DataProps> {
    render() {
        let colors: { bgC: string, textC: string } = this.props.inactive ?
            this.props.settings.theme.static.bullet.inactive :
            this.props.settings.theme.static.bullet.active;

        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={{
                    ...BulletStyles.root,
                    backgroundColor: colors.bgC,
                    width: screenWidth * this.props.width,
                }}
            >
                <Text style={{ ...BulletStyles.text, color: colors.textC }}>
                    {this.props.text.toUpperCase()}
                </Text>
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    settings: state.settings,
});

export default connect(mapStateToProps)(Bullet);
