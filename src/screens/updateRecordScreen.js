import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import Bubble from '../components/Bubble';
import { accent, styles } from '../styles';

class Screen extends React.Component {

    constructor(props) {
        super(props);
        var icons = props.categories;
        if (icons[icons.length - 1].key !== 'Add')
            icons.push({ key: 'Add', iconName: 'plus' });
        this.state = {
            category: '',
            grid: [
                icons.slice(0, 4),
                icons.slice(4, 8),
                icons.slice(8, 12),
                icons.slice(12, 16),
            ]
        }
    }

    render() {
        return (
            <View style={styles.screen}>
                <View style={{ ...styles.columns, maxHeight: 120 }}>
                    {this.state.grid[0].map(item => (
                        <View key={item.key} style={{ ...styles.rows, justifyContent: 'space-between' }}>
                            <Bubble
                                color={accent}
                                iconName={item.iconName}
                                iconsSize={25}
                                onPress={() => this.setState({ category: item.key })}
                                size={35}
                            />
                            <Text style={styles.centerText}>{item.key}</Text>
                        </View>
                    ))}
                </View>
                <View style={{ ...styles.columns, maxHeight: 120 }}>
                    {this.state.grid[1].map(item => (
                        <View key={item.key} style={{ ...styles.rows, justifyContent: 'space-between' }}>
                            <Bubble
                                color={accent}
                                iconName={item.iconName}
                                iconsSize={25}
                                onPress={() => this.setState({ category: item.key })}
                                size={35}
                            />
                            <Text style={styles.centerText}>{item.key}</Text>
                        </View>
                    ))}
                </View>
                <View style={{ ...styles.columns, maxHeight: 120 }}>
                    {this.state.grid[2].map(item => (
                        <View key={item.key} style={{ ...styles.rows, justifyContent: 'space-between' }}>
                            <Bubble
                                color={accent}
                                iconName={item.iconName}
                                iconsSize={25}
                                onPress={() => {
                                    if (item.key === 'Add')
                                        this.props.navigation.navigate('Category');
                                    else
                                        this.setState({ category: item.key });
                                }}
                                size={35}
                            />
                            <Text style={styles.centerText}>{item.key}</Text>
                        </View>
                    ))}
                </View>
                <View style={{ ...styles.columns, maxHeight: 120 }}>
                    {this.state.grid[3].map(item => (
                        <View key={item.key} style={{ ...styles.rows, justifyContent: 'space-between' }}>
                            <Bubble
                                color={accent}
                                iconName={item.iconName}
                                iconsSize={25}
                                onPress={() => {
                                    if (item.key === 'Add')
                                        this.props.navigation.navigate('Category');
                                    else
                                        this.setState({ category: item.key });
                                }}
                                size={35}
                            />
                            <Text style={styles.centerText}>{item.key}</Text>
                        </View>
                    ))}
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    categories: state.categories
})

export default connect(mapStateToProps)(Screen);