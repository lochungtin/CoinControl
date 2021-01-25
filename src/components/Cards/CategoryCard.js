import React from 'react';
import { Text, View, } from 'react-native';
import { connect } from 'react-redux';

import Card from './Card';
import TypeSwitch from './TypeSwitch';

import { generalCardStyles } from '../../styles';


class CategoryCard extends React.Component {

    constructor(props) {
        super(props);
        var type = 'expense';
        if (Object.keys(props.data.expense).length === 0 && Object.keys(props.data.income).length > 0)
            type = 'income';

        this.state = {
            type: type,
            open: true,
        }
    }

    style = (stylesheet, styleName) => stylesheet[styleName + (this.props.settings.darkMode ? "D" : "L")];

    render() {
        return (
            <Card icon={'label-multiple-outline'} title={'CATEGORIES'} toggle={open => this.setState({ open })}>
                {this.state.open && <>
                    <TypeSwitch default={this.state.type} update={type => this.setState({ type })} />
                </>}
            </Card>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(CategoryCard);