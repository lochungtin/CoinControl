import * as shape from 'd3-shape';
import React from 'react';
import { G, Path, Svg, } from 'react-native-svg';

export default class PieChart extends React.Component {

    render() {
        let data = this.props.data;
        if (this.props.data.length === 0)
            data = [{ onPress: () => {}, svg: { fill: this.props.trackColor }, value: 1 }];

        return (
            <Svg style={{ height: this.props.dim, width: this.props.dim }}>
                <G x={this.props.dim / 2} y={this.props.dim / 2}>
                    {shape
                        .pie()
                        .value(obj => obj.value)
                        .startAngle(0)
                        .endAngle(Math.PI * 2)(data)
                        .map((slice, index) => {
                            const { onPress, svg } = data[index];
                            return (
                                <Path
                                    {...svg}
                                    d={shape
                                        .arc()
                                        .outerRadius(this.props.dim / 2)
                                        .innerRadius((this.props.dim / 2) * (1 - this.props.width))
                                        .padAngle(0.05)(slice)
                                    }
                                    key={index}
                                    onPress={onPress}
                                />
                            );
                        })
                    }
                </G>
            </Svg>
        );
    }
}
