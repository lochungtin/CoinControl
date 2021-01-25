import React from 'react';
import { Text, View, } from 'react-native';
import { connect } from 'react-redux';

import Card from './Card';

import { generalCardStyles } from '../../styles';

class GoalCard extends React.Component {

    style = (stylesheet, styleName) => stylesheet[styleName + (this.props.settings.darkMode ? "D" : "L")];

    render() {
        return (
            <Card icon={'flag-variant-outline'} title={'GOAL STATS'}>
                
            </Card>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(GoalCard);