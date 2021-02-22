import * as shape from 'd3-shape';
import React from 'react';
import { G, Path, Svg, } from 'react-native-svg';

export default class ProgressCircle extends React.Component {

    render() {
        const data = [
            { svg: { fill: this.props.trackColor }, value: 1 - this.props.progress, },
            { svg: { fill: this.props.progressColor }, value: this.props.progress },
        ];

        return (
            <Svg style={{ height: this.props.dim, width: this.props.dim }}>
                <G x={this.props.dim / 2} y={this.props.dim / 2}>
                    {shape
                        .pie()
                        .value(obj => obj.value)
                        .sort((a, b) => a.value - b.value)
                        .startAngle(0)
                        .endAngle(Math.PI * 2)(data)
                        .map((slice, index) => {
                            const { svg } = data[index];
                            return (
                                <Path
                                    {...svg}
                                    d={
                                        shape
                                            .arc()
                                            .outerRadius(this.props.dim / 2)
                                            .innerRadius(this.props.dim / 2 - this.props.strokeWidth)(slice)
                                    }
                                    key={index}
                                />
                            );
                        })
                    }
                </G>
            </Svg>
        );
    }
}