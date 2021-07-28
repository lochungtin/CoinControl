import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import { NumpadStyles } from './styles';

import { ReduxThemeType } from '../../types/redux';
import { NumpadBtnProps } from '../../types/ui';

interface NumpadControlProps {
    disabled: boolean,
    highlight: boolean,
}

class Btn extends React.Component<ReduxThemeType & NumpadBtnProps & NumpadControlProps> {

    onPress = () => {
        if (!this.props.disabled)
            this.props.onPress();
    }

    render() {
        let color: string = this.props.theme.dynamic.text.mainC;
        if (this.props.disabled)
            color = this.props.theme.dynamic.text.secondaryC;

        if (this.props.highlight)
            color = this.props.theme.static.accentC;

        return (
            <TouchableOpacity onPress={this.onPress} style={NumpadStyles.btn}>
                <Icon
                    color={color}
                    name={this.props.highlight ? 'checkbox-marked-circle-outline' : this.props.icon}
                    size={40}
                />
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = (state: ReduxThemeType) => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(Btn);
