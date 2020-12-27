import React from 'react';
import { TouchableOpacity, Text, View, } from 'react-native';
import { connect } from 'react-redux';

import { scPairStyles, styles } from '../styles';

class SCPair extends React.Component {

    style = styleName => {
        return scPairStyles[styleName + (this.props.settings.darkMode ? "D" : "L")];
    }

    render() {
        return (
            <View style={{...styles.columns, justifyContent:'space-evenly', width: '100%'}}>
                <TouchableOpacity onPress={this.props.onConfirm} style={{ ...scPairStyles.save, backgroundColor: this.props.settings.accent }}>
                    <Text style={this.style('text')}>
                        Confirm
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.onCancel} style={this.style('cancel')}>
                    <Text style={this.style('text')}>
                        Cancel
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(SCPair);