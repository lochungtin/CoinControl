import React from 'react';
import { Text, View, } from 'react-native';
import { connect } from 'react-redux';

import Card from './Card';
import TypeSwitch from './TypeSwitch';

import { generalCardStyles } from '../../styles';


class WatchCard extends React.Component {

    constructor(props) {
        super(props);
        var type = 'expense';
        if (Object.keys(props.data.expense).length === 0 && Object.keys(props.data.income).length > 0)
            type = 'income';

        this.state = {
            type: type,
        }
    }

    style = (stylesheet, styleName) => stylesheet[styleName + (this.props.settings.darkMode ? "D" : "L")];

    render() {
        return (
            <Card icon={'eye-outline'} title={'WATCHLIST'}>
                <TypeSwitch default={this.state.type} update={type => this.setState({ type })} />
            </Card>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(WatchCard);