import React from 'react';
import { Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import { InputStyles } from './styles';

import { ReduxThemeType } from '../../../types/redux';

interface DataProps {
    hidden?: boolean,
    icon: string,
    label: string,
    onChangeText: (text: string) => void,
    placeholder: string,
}

class Input extends React.Component<ReduxThemeType & DataProps> {
    render() {
        return (
            <View style={{ ...InputStyles.root, backgroundColor: this.props.theme.dynamic.screen.secondaryBgC }}>
                <Icon
                    color={this.props.theme.static.accentC}
                    name={this.props.icon}
                    size={35}
                />
                <View style={InputStyles.textBox}>
                    <Text style={{ ...InputStyles.label, color: this.props.theme.dynamic.text.labelC }}>
                        {this.props.label.toUpperCase()}
                    </Text>
                    <TextInput
                        autoCapitalize='none'
                        placeholder={this.props.placeholder}
                        placeholderTextColor={this.props.theme.dynamic.text.secondaryC}
                        onChangeText={this.props.onChangeText}
                        secureTextEntry={this.props.hidden}
                        style={{ ...InputStyles.text, color: this.props.theme.dynamic.text.mainC }}
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxThemeType) => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(Input);
