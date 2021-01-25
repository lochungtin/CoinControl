import React from 'react';
import { Text, View, } from 'react-native';
import { connect } from 'react-redux';

import Card from './Card';

import { generalCardStyles } from '../../styles';

class TrendCard extends React.Component {

    style = (stylesheet, styleName) => stylesheet[styleName + (this.props.settings.darkMode ? "D" : "L")];

    render() {
        return (
            <Card icon={'chart-line'} title={'7 DAY CASHFLOW'}>
                
            </Card>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(TrendCard);