import React from 'react';
import { SafeAreaView, SectionList, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import { parseAll, parseTotal } from '../functions/parser';
import { accent, darkWhite, homeScreenStyles, lightGrey, maxWidth, styles, white, } from '../styles';

class Screen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.screen}>
                <SafeAreaView style={{ maxHeight: 400, minWidth: maxWidth }}>
                        <SectionList
                            renderItem={({ item }) =>
                                <View style={{ ...styles.roundView, ...styles.columns, backgroundColor: lightGrey, justifyContent: 'space-between' }}>
                                    <Icon name={item.icon} size={20} color={white} />
                                    <Text style={styles.text}>{item.category}</Text>
                                    <Text style={styles.text}>{(item.type === 'Expense' ? '-' : '+') + item.value}</Text>
                                </View>
                            }
                            renderSectionHeader={({ section: { title } }) =>
                                <View>
                                    <Text style={styles.text}>{title}</Text>
                                </View>
                            }
                            sections={parseAll(this.props.records)}
                            style={{  maxHeight: 400, minWidth: maxWidth, paddingHorizontal: '5%', paddingTop: '5%' }}
                        />
                    </SafeAreaView>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    records: state.records
})

export default connect(mapStateToProps)(Screen);