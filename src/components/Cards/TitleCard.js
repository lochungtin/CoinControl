import React from 'react';
import { connect } from 'react-redux';

import Card from './Card';

class TitleCard extends React.Component {
    render() {
        return (
            <Card
                icon={this.props.icon}
                iconPress={this.props.iconPress}
                onPress={this.props.onPress}
                title={this.props.title}
            />
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(TitleCard);