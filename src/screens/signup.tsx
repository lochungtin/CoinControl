import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import BTMBar from '../components/auth/bottombar';

import Input from '../components/auth/input';
import Bullet from '../components/bullet';
import Header from '../components/headers/auth';

import { AuthScreenStyles, ScreenStyles } from './styles';

import { signUp } from '../firebase/auth';
import { firebaseOverwriteAll } from '../firebase/data';
import { accountSignIn } from '../redux/action';
import { store } from '../redux/store';
import { AccountType, CategoryStore, DataStore } from '../types/data';
import { ReduxThemeType } from '../types/redux';
import { ScreenProps } from '../types/ui';

interface AdditionalReduxProps {
    data: DataStore,
    categories: CategoryStore,
}

class Screen extends React.Component<ReduxThemeType & ScreenProps & AdditionalReduxProps> {

    state = {
        email: '',
        pswd: '',
        rePswd: '',
    }

    signUp = () => signUp(
        this.state.email,
        this.state.pswd,
        this.state.rePswd,
        (account: AccountType) => {
            store.dispatch(accountSignIn(account));

            firebaseOverwriteAll(account.uid, this.props.data.data, this.props.categories);

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
                            Sign Up
                        </Text>
                        <Text style={{ ...AuthScreenStyles.subtitle, color: this.props.theme.dynamic.text.labelC }}>
                            Create your CoinControl account
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
                        <Input
                            hidden
                            icon='lock-outline'
                            label='password'
                            onChangeText={(rePswd: string) => this.setState({ rePswd })}
                            placeholder='Confirm your password'
                        />
                        <View style={AuthScreenStyles.bullet}>
                            <Bullet
                                onPress={this.signUp}
                                text='create account'
                                width={0.8}
                            />
                        </View>
                        <BTMBar
                            onPress={() => this.props.navigation.navigate('signin')}
                            pressable='Sign In'
                            text={`Already have an account?  `}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxThemeType & AdditionalReduxProps) => ({
    data: state.data,
    categories: state.categories,
    theme: state.theme,
});

export default connect(mapStateToProps)(Screen);
