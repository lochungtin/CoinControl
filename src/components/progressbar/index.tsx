import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { PGBarStyles, screenWidth } from './style';
import { WHITE } from '../../data/color';

import { ReduxThemeType } from '../../types/redux';

interface DataProps {
    height: number,
    progress: number,
    width: number,
}

class PGBar extends React.Component<ReduxThemeType & DataProps> {
    render() {
        return (
            <View
                style={{
                    ...PGBarStyles.root,
                    backgroundColor: WHITE,
                    borderRadius: this.props.height / 2,
                    height: this.props.height,
                    width: screenWidth * this.props.width,
                }}
            >
                <View style={{
                    ...PGBarStyles.root,
                    backgroundColor: this.props.theme.static.accentC,
                    borderRadius: this.props.height / 2,
                    height: this.props.height,
                    width: screenWidth * this.props.width * this.props.progress,
                }} />
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxThemeType) => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(PGBar);
