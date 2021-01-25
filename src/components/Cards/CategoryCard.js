import React from 'react';
import { Text, View, } from 'react-native';
import { connect } from 'react-redux';

import Card from './Card';

import { generalCardStyles } from '../../styles';

class CategoryCard extends React.Component {

    style = (stylesheet, styleName) => stylesheet[styleName + (this.props.settings.darkMode ? "D" : "L")];

    render() {
        return (
            <Card icon={'label-multiple-outline'} title={'CATEGORIES'}>
                
            </Card>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(CategoryCard);