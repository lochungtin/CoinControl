import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import BTMBar from '../components/auth/bottombar';
import Input from '../components/auth/input';
import Bullet from '../components/bullet';
import Header from '../components/headers/auth';

import { AuthScreenStyles, ScreenStyles } from './styles';

import { signIn } from '../firebase/auth';
import { AccountType } from '../types/data';
import { ReduxThemeType } from '../types/redux';
import { ScreenProps } from '../types/ui';
import { accountSignIn } from '../redux/action';
import { store } from '../redux/store';

class Screen extends React.Component<ReduxThemeType & ScreenProps> {

    state = {
        email: '',
        pswd: '',
    }

    signIn = () => signIn(
        this.state.email,
        this.state.pswd,
        (account: AccountType) => {
            store.dispatch(accountSignIn(account));
            this.props.navigation.navigate('settingsHome');
        }
    );

    render() {
        return (
            <View style={{ ...ScreenStyles.root, backgroundColor: this.props.theme.dynamic.screen.bgC }}>
                <Header navigation={this.props.navigation} />
                <ScrollView>
                    <View style={AuthScreenStyles.root}>
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
                            hidden
                            icon='lock-outline'
                            label='password'
                            onChangeText={(pswd: string) => this.setState({ pswd })}
                            placeholder='Enter your password'
                        />
                        <View style={AuthScreenStyles.forgotPswd}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('resetPswd')}>
                                <Text style={{ ...AuthScreenStyles.forgotPswdText, color: this.props.theme.dynamic.text.mainC }}>
                                    Forgot Password?
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={AuthScreenStyles.bullet}>
                            <Bullet
                                onPress={this.signIn}
                                text='login'
                                width={0.8}
                            />
                        </View>
                        <BTMBar
                            onPress={() => this.props.navigation.navigate('signup')}
                            pressable='Sign Up'
                            text={`Don't have an account?  `}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxThemeType) => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(Screen);
