import React from 'react';
import { View } from 'react-native'
import { connect } from 'react-redux';

import Bubble from '../Bubble';

class Clock extends React.Component {

    bubbleColor = data => this.props.selected === data ? this.props.settings.accent : 'transparent';

    makeGrid = data => {
        const r = this.props.dim / 2;
        const d1 = Math.sqrt(3) / 2 * r;

        if (this.props.pm && this.props.hr)
            data = data.map(num => {
                if (num === '12')
                    return '00';
                return (parseInt(num) + 12).toString();
            });

        return [
            [0, 0, 'center', 0, false, data.slice(0, 1)],
            [1, r - d1, 'space-between', r, true, data.slice(1, 3)],
            [2, d1 - r / 2, 'space-between', d1 * 2, true, data.slice(3, 5)],
            [3, r / 2, 'space-between', r * 2, true, data.slice(5, 7)],
            [4, r / 2, 'space-between', d1 * 2, true, data.slice(7, 9)],
            [5, d1 - r / 2, 'space-between', r, true, data.slice(9, 11)],
            [6, r - d1, 'center', 0, false, data.slice(11)],
        ];
    }

    render() {
        return (
            <View style={{ alignItems: 'center', width: this.props.dim, height: this.props.dim }}>
                {this.makeGrid(this.props.data).map(data => {
                    return (
                        <View key={data[0]}>
                            <View style={{ height: data[1] }} />
                            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: data[2], height: 0, width: data[3] + this.props.offset }} >
                                <Bubble
                                    color={this.bubbleColor(data[5][0])}
                                    onPress={() => this.props.onPress(data[5][0])}
                                    size={30}
                                    text={data[5][0]}
                                />
                                {data[0] === 3 && this.props.children}
                                {data[4] &&
                                    <Bubble
                                        color={this.bubbleColor(data[5][1])}
                                        onPress={() => this.props.onPress(data[5][1])}
                                        size={30}
                                        text={data[5][1]}
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