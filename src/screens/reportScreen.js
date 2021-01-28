import React from 'react';
import { Text, TouchableOpacity, View, } from 'react-native';
import { connect } from 'react-redux';
import TitleCard from '../components/Cards/TitleCard';

import { styles } from '../styles';

class Screen extends React.Component {

    constructor(props) {
        super(props);
    }

    style = (stylesheet, styleName) => stylesheet[styleName + (this.props.settings.darkMode ? "D" : "L")];

    render() {
        return (
            <View style={this.style(styles, 'screen')}>
                <TitleCard title={this.props.route.name + ' Reports'} icon={'menu'} iconPress={() => this.props.navigation.toggleDrawer()}/>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings,
})

export default connect(mapStateToProps)(Screen);