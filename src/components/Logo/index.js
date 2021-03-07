const logo = require('./logo.png');

import React from 'react';
import { Image } from 'react-native';

export default class Logo extends React.Component {
    render() {
        return (
            <Image 
                style={{
                    height: this.props.dim,
                    width: this.props.dim,
                    ...this.props.style
                }}
                source={logo}
            />
        );
    }
}
