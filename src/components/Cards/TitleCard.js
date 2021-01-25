import React from 'react';
import { connect } from 'react-redux';

import Card from './Card';

class TitleCard extends React.Component {
    render() {
        return (
            <Card icon={this.props.icon} title={this.props.title} onPress={this.props.onPress}/>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(TitleCard);