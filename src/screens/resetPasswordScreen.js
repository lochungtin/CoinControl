import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button, Alert } from 'react-native';
import { connect } from 'react-redux';
import { updateLogin, updateAccountSettings } from '../redux/action';
import { store } from '../redux/store';
import firebase from "../firebase/config"

import { signupStyles, styles, white, } from '../styles';

class Screen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
        }
    }
    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }
    reset = () => {
        firebase.auth().sendPasswordResetEmail(this.state.email)
            .then(function (user) {
                alert('Please check your email...')
            }).catch(function (e) {
                console.log(e)
            })
    }

    render() {
        return (

            <View style={this.props.settings.darkMode ? styles.screenD : styles.screenL}>
                <View style={{ ...styles.rows, justifyContent: 'space-between', paddingTop: 50 }}>
                    <View style={{ ...styles.columns, justifyContent: 'center', maxHeight: 35, }}>
                    </View>
                    <View style={styles.screen}>
                        <Text>Reset Password Screen</Text>
                        <View style={signupStyles.container}>
                            <TextInput
                                style={signupStyles.inputStyle}
                                placeholder="Email"
                                value={this.state.email}
                                onChangeText={(val) => this.updateInputVal(val, 'email')}
                            />
                            <Button
                                color="#3740FE"
                                title="Reset"
                                onPress={() => this.reset()}
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