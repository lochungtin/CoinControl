import React from 'react';
import { View } from 'react-native'
import { connect } from 'react-redux';

import Bubble from '../Bubble';

import { RNKey } from '../../functions/GenKey';

class Clock extends React.Component {

    bubbleColor = data => this.props.selected === data ? this.props.settings.accent : 'transparent';

    makeGrid = data => {
        const r = this.props.dim / 2;
        const d = Math.sqrt(3) / 2 * r;

        if (this.props.pm && this.props.hr)
            data = data.map(num => {
                if (num === '12')
                    return '00';
                return (parseInt(num) + 12).toString();
            });

        return [
            {
                double: false,
                height: 0,
                justifyContent: 'center',
                values: data.slice(0, 1),
                width: 0,
            },
            {
                double: true,
                height: r - d,
                justifyContent: 'space-between',
                values: data.slice(1, 3),
                width: r,
            },
            {
                double: true,
                height: d - r / 2,
                justifyContent: 'space-between',
                values: data.slice(3, 5),
                width: d * 2,
            },
            {
                double: true,
                height: r / 2,
                justifyContent: 'space-between',
                mid: true,
                values: data.slice(5, 7),
                width: r * 2,
            },
            {
                double: true,
                height: r / 2,
                justifyContent: 'space-between',
                values: data.slice(7, 9),
                width: d * 2,
            },
            {
                double: true,
                height: d - r / 2,
                justifyContent: 'space-between',
                values: data.slice(9, 11),
                width: r,
            },
            {
                double: false,
                height: r - d,
                justifyContent: 'center',
                values: data.slice(11),
                width: 0,
            },
        ];
    }

    onPress = num => this.props.onPress(num);

    render() {
        return (
            <View style={{ alignItems: 'center', height: this.props.dim, width: this.props.dim, }}>
                {this.makeGrid(this.props.data).map(data => {
                    return (
                        <View key={RNKey()}>
                            <View style={{ height: data.height }} />
                            <View style={{ alignItems: 'center', flexDirection: 'row', height: 0, justifyContent: data.justifyContent, width: data.width + this.props.offset, }} >
                                <Bubble
                                    color={this.bubbleColor(data.values[0])}
                                    onPress={() => this.onPress(data.values[0])}
                                    size={30}
                                    text={data.values[0]}
                                />
                                {data.mid && this.props.children}
                                {data.double &&
                                    <Bubble
                                        color={this.bubbleColor(data.values[1])}
                                        onPress={() => this.onPress(data.values[1])}
                                        size={30}
                                        text={data.values[1]}
                                    />
                                }
                            </View>
                        </View>
                    );
                })}
            </View>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(Clock);