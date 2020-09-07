import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';

import { styles } from '../styles';

class Screen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.screen}>
                <ScrollView>
                    <Text>Settings Screen</Text>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(Screen);