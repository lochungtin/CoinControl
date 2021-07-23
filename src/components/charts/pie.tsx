import * as shape from 'd3-shape';
import React from 'react';
import { G, Path, Svg, } from 'react-native-svg';

interface DataProps {
    data: Array<any>,
    size: number,
    width: number,
}

export default class PieChart extends React.Component<DataProps> {

    render() {
        return (
            <Svg style={{ height: this.props.size, width: this.props.size }}>
                <G x={this.props.size / 2} y={this.props.size / 2}>
                    {shape
                        .pie()
                        .value((obj: any) => obj.value)
                        .startAngle(0)
                        .endAngle(Math.PI * 2)(this.props.data)
                        .map((slice: any, index) => {
                            return (
                                <Path
                                    {...this.props.data[index].svg}
                                    d={shape
                                        .arc()
                                        .outerRadius(this.props.size / 2)
                                        .innerRadius((this.props.size / 2) * (1 - this.props.width))
                                        .padAngle(0.05)(slice)
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