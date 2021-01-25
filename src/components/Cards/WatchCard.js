import React from 'react';
import { Text, View, } from 'react-native';
import { connect } from 'react-redux';

import Card from './Card';

import { generalCardStyles } from '../../styles';

class WatchCard extends React.Component {

    style = (stylesheet, styleName) => stylesheet[styleName + (this.props.settings.darkMode ? "D" : "L")];

    render() {
        return (
            <Card icon={'eye-outline'} title={'WATCH LIST'}>
                
            </Card>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(WatchCard);