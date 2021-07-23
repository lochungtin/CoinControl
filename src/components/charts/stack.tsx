import * as array from 'd3-array';
import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import React from 'react';
import { Svg, Path } from 'react-native-svg';

interface DataProps {
    colors: Array<string>
    data: Array<{[key: string]: any}>,
    height: number
    keys: Array<string>,
    onPress: (date: string) => void,
    width: number
}

export default class BarChart extends React.Component<DataProps> {
    render() {
        let series: any = shape
            .stack()
            .keys(this.props.keys)
            .value((item, key) => item[key])(this.props.data);

        let x: any = scale
            .scaleBand()
            .domain(this.props.data.map((_, index: number) => index.toString()))
            .range([0, this.props.width])
            .paddingInner(0.4)
            .paddingOuter(0);

        let y: any = scale
            .scaleLinear()
            .domain(array.extent(array.merge(array.merge(series))) as any)
            .range([this.props.height, 0]);

        return (
            <Svg style={{ height: this.props.height, width: this.props.width }}>
                {series.map((serie: any, keyIndex: number) => {
                    return serie.map((entry: any, entryIndex: number) => {
                        return (
                            <Path
                                key={`${keyIndex}-${entryIndex}`}
                                d={shape
                                    .area()
                                    .y0((d) => y(d[0]))
                                    .y1((d) => y(d[1]))
                                    .x((d, _index) => (_index === 0 ? x(entryIndex) : x(entryIndex) + x.bandwidth()))
                                    .defined((d) => !isNaN(d[0]) && !isNaN(d[1]))([entry, entry]) || undefined
                                }
                                fill={this.props.colors[keyIndex]}
                                onPress={() => this.props.onPress(this.props.data[entryIndex].date)}
                            />
                        );
                    });
                })}
            </Svg>
        );
    }
}
