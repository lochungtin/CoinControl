import React from 'react';
import { Text, TouchableOpacity, View, } from 'react-native';
import { connect } from 'react-redux';

import firebase from "../firebase/config";

import Logo from '../components/Logo';
import ScreenHeader from '../components/ScreenHeader';
import SignUpInput from '../components/SignUpInput';

import { black, shade2, shade3 } from '../data/color';
import { accountScreenStyles, maxHeight, styles, } from '../styles';

class Screen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displayName: '',
            email: '',
            hidden: true,
            reHidden: true,
            password: '',
            prompt: '',
            rePassword: '',
        }
    }

    color = () => this.props.settings.darkMode ? shade2 : shade3;

    registerUser = () => {
        if (this.state.email === '')
            this.setState({ prompt: 'Email Required' });
        if (this.state.password !== this.state.rePassword)
            this.setState({ promopt: 'Passwords Don\'t Match' });
        else {
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(result => {
                    result.user.updateProfile({
                        displayName: this.state.displayName,
                    });
                    this.props.navigation.navigate('SignIn', { info: { email: this.state.email, password: this.state.password } })
                })
                .catch(error => this.setState({ prompt: error.message }));
        }
    }

    toggleHidden = () => this.setState({ hidden: !this.state.hidden });

    toggleReHidden = () => this.setState({ reHidden: !this.state.reHidden });

    updateDisplayName = displayName => this.setState({ displayName });

    updateEmail = email => this.setState({ email });

    updatePassword = password => this.setState({ password });

    updateRePassword = rePassword => this.setState({ rePassword });

    render() {
        return (
            <View style={this.props.settings.darkMode ? styles.screenD : styles.screenL}>
                <View style={{ ...styles.rows, justifyContent: 'space-between', height: maxHeight - 170 }}>
                    <View style={{ ...styles.rows, justifyContent: 'center' }}>
                        <ScreenHeader back={this.props.navigation.goBack} name={'Sign Up'} />
                        <Logo dim={150} style={{ marginTop: 20, }} />
                        <SignUpInput
                            confirm={this.state.displayName !== '' && !this.state.displayName.includes(' ')}
                            onChangeText={this.updateDisplayName}
                            placeholder={'Display Name'}
                            type={'confirmation'}
                            value={this.state.displayName}
                        />
                        <SignUpInput
                            onChangeText={this.updateEmail}
                            placeholder={'Email'}
                            type={'confirmation'}
                            value={this.state.email}
                        />
                        <SignUpInput
                            iconOnPress={this.toggleHidden}
                            hidden={this.state.hidden}
                            onChangeText={this.updatePassword}
                            placeholder={'Password'}
                            type={'hidden'}
                            value={this.state.password}
                        />
                        <SignUpInput
                            iconOnPress={this.toggleReHidden}
                            hidden={this.state.reHidden}
                            onChangeText={this.updateRePassword}
                            placeholder={'Re-enter Password'}
                            type={'hidden'}
                            value={this.state.rePassword}
                        />
                        <Text style={{ color: this.color(), marginTop: 10 }}>
                            {this.state.prompt}
                        </Text>
                    </View>
                    <View style={{ ...styles.rows, justifyContent: 'center' }}>
                        <TouchableOpacity onPress={this.registerUser} style={{ ...styles.columns, ...accountScreenStyles.submitBtn, backgroundColor: this.props.settings.accent }}>
                            <Text style={{ color: black }}>
                                Sign Up
                            </Text>
                        </TouchableOpacity>
                        <View style={{ ...styles.columns, ...accountScreenStyles.signUpContainer }}>
                            <Text style={{ color: this.color() }}>
                                Already have an account?
                            </Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
                                <Text style={{ color: this.props.settings.accent }}>
                                    Sign In
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings,
})

export default connect(mapStateToProps)(Screen);