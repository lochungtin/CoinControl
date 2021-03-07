import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button, Alert } from 'react-native';
import { connect } from 'react-redux';
import { updateLogin, updateAccountSettings } from '../redux/action';
import { store } from '../redux/store';
import firebase from "../firebase/config"
import { loginAccount } from "../firebase/action"

import { signupStyles, styles, white, } from '../styles';



class Screen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: this.props.isLogin,
            givenName: this.props.accountSettings.givenName,
            familyName: this.props.accountSettings.familyName,
            idToken: this.props.accountSettings.idToken,
            LoggedInMethod: null,
            displayName: '',
            email: '',
            password: '',
            isLoading: false
        }
        console.log("this.state.accountSettings");
        console.log(this.props.accountSettings);
    }
    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }
    registerUser = () => {
        if (this.state.email === '' && this.state.password === '') {
            Alert.alert('Enter details to signup!')
        } else {
            this.setState({
                isLoading: true,
            })
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((res) => {
                    res.user.updateProfile({
                        displayName: this.state.displayName,
                    })
                    //console.log(res.user.uid)
                    loginAccount("", this.state.displayName, res.user.uid, "Email")
                    console.log('User registered successfully!')
                    this.setState({
                        isLoading: false,
                        displayName: '',
                        email: '',
                        password: ''
                    })

                    this.props.navigation.navigate('Account')
                })
                .catch(error => { console.log(error.message); this.setState({ errorMessage: error.message }) })
        }
    }

    render() {
        return (

            <View style={this.props.settings.darkMode ? styles.screenD : styles.screenL}>
                <View style={{ ...styles.rows, justifyContent: 'space-between', paddingTop: 50 }}>
                    <View style={{ ...styles.columns, justifyContent: 'center', maxHeight: 35, }}>
                    </View>
                    <View style={styles.screen}>
                        <Text>Signup Screen</Text>
                        <View style={signupStyles.container}>
                            <TextInput
                                style={signupStyles.inputStyle}
                                placeholder="Name"
                                value={this.state.displayName}
                                onChangeText={(val) => this.updateInputVal(val, 'displayName')}
                            />
                            <TextInput
                                style={signupStyles.inputStyle}
                                placeholder="Email"
                                value={this.state.email}
                                onChangeText={(val) => this.updateInputVal(val, 'email')}
                            />
                            <TextInput
                                style={signupStyles.inputStyle}
                                placeholder="Password"
                                value={this.state.password}
                                onChangeText={(val) => this.updateInputVal(val, 'password')}
                                maxLength={15}
                                secureTextEntry={true}
                            />
                            <Button
                                color="#3740FE"
                                title="Signup"
                                onPress={() => this.registerUser()}
                            />

                            <Text
                                style={signupStyles.loginText}
                                onPress={() => this.props.navigation.navigate('Account')}>
                                Already Registered? Click here to login
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    isLogin: state.isLogin,
    settings: state.settings,
    accountSettings: state.accountSettings

})

export default connect(mapStateToProps)(Screen);