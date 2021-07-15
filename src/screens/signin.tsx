import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import BTMBar from '../components/auth/bottombar';

import Input from '../components/auth/input';
import { InputStyles } from '../components/auth/input/styles';
import Bullet from '../components/bullet';
import Header from '../components/headers/auth';

import { ReduxPropType } from '../types/redux';
import { ScreenProps } from '../types/uiprops';
import { AuthScreenStyles, screenHeight, ScreenStyles } from './styles';

class Screen extends React.Component<ReduxPropType & ScreenProps> {

    state = {
        headerHeight: 0,
        email: '',
        pswd: '',
    }

    render() {
        return (
            <View style={{ ...ScreenStyles.root, backgroundColor: this.props.theme.dynamic.screen.bgC }}>
                <Header navigation={this.props.navigation} />
                <ScrollView>
                    <View style={{ ...AuthScreenStyles.root }}>
                        <Text style={{ ...AuthScreenStyles.title, color: this.props.theme.dynamic.text.mainC }}>
                            Login
                        </Text>
                        <Text style={{ ...AuthScreenStyles.subtitle, color: this.props.theme.dynamic.text.labelC }}>
                            Please sign in to continue
                        </Text>
                        <Input
                            icon='email-outline'
                            label='email'
                            onChangeText={(email: string) => this.setState({ email })}
                            placeholder='Enter your email'
                        />
                        <Input
                            icon='lock-outline'
                            label='password'
                            onChangeText={(pswd: string) => this.setState({ pswd })}
                            placeholder='Enter your password'
                        />
                        <View style={InputStyles.bullet}>
                            <Bullet
                                onPress={() => { }}
                                text='LOGIN'
                                width={0.8}
                            />
                        </View>
                    </View>
                </ScrollView>
                <BTMBar
                    onPress={() => this.props.navigation.navigate('signup')}
                    pressable='Sign Up'
                    text={`Don't have an account?  `}
                />
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(Screen);
