import { GoogleSignin, GoogleSigninButton, statusCodes, } from '@react-native-community/google-signin';
import React from 'react';
import { Text, View, TextInput, Button, Alert } from 'react-native';
import { AccessToken, GraphRequest, GraphRequestManager, LoginManager, } from 'react-native-fbsdk';
import { connect } from 'react-redux';

import { fireabseLoginAccount } from "../firebase/action";
import firebase from "../firebase/config";

import { updateLogin, updateAccountSettings } from '../redux/action';
import { store } from '../redux/store';

import { signupStyles, styles, white, } from '../styles';

//Lets agree here first. What data do we need from the user
// Given Name; Last Name; IDtoken
//facebook test user:wrteveesrm_1611780393@tfbnw.net ;password: coincontrol2020
GoogleSignin.configure({
    webClientId: '486441035059-8l61ntdopa47itlm7kknd6acpvmn04q4.apps.googleusercontent.com'
});

class Screen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogin: this.props.isLogin,
            givenName: this.props.accountSettings.givenName,
            familyName: this.props.accountSettings.familyName,
            idToken: this.props.accountSettings.idToken,
            email: '',
            password: '',
            loginType: this.props.accountSettings.loginType,

            details: {
                "cards": this.props.cards,
                "data": this.props.data,
                "expenseCategories": this.props.expenseCategories,
                "incomeCategories": this.props.incomeCategories,
                "settings": this.props.settings,
            }
            //accountSettings: this.props.accountSettings,
        }
        console.log("this.state.accountSettings");
        console.log(this.state.isLogin);
        console.log(this.props.accountSettings);
    }

    emailSignIn= () => {
        console.log(this.state.isLogin, this.state.loginType)
        if (this.state.isLogin && this.state.loginType == "Facebook") {
            Alert.alert("Alert", "Please log out if you want to switch your account");
            return;
        }
        if (this.state.email === '' && this.state.password === '') {
            Alert.alert('Enter details to signin!')
        } 
        else {
            firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then((res) => {
                    console.log(res)
                    //console.log('User logged-in successfully!')
                    this.setState({
                        email: '',
                        password: ''
                    })
                    console.log(res.user.displayName, res.user.uid);
                    console.log("email");
                    console.log(email);
                    this.signInUpdate("", res.user.displayName, res.user.uid, "Email")
                    this.props.navigation.navigate('Settings')
                })
                .catch(error => this.setState({ errorMessage: error.message }))
        }
    }

    facebookSignIn = () => {
        LoginManager.logInWithPermissions(['public_profile']).then(
            result => {
                console.log(result);

                if (result.isCancelled)
                    console.log('login is cancelled.');
                else {
                    AccessToken.getCurrentAccessToken().then(data => {
                        const profileRequest = new GraphRequest(
                            '/me',
                            {
                                token: data.accessToken.toString(),
                                parameters: {
                                    fields: {
                                        string: 'id, name, first_name, last_name',
                                    },
                                },
                            },
                            (error, result) => {
                                if (error)
                                    console.log('login info has error: ' + error);
                                else
                                    this.signInUpdate(result["last_name"], result["first_name"], result["id"], "Facebook");
                            },
                        );
                        new GraphRequestManager().addRequest(profileRequest).start();
                    });
                }
            },
            error => console.log('an error has occurred')
        );
    }

    googleSignIn = async () => {
        console.log(this.state.isLogin, this.state.loginType)
        if (this.state.isLogin && this.state.loginType == "Facebook") {
            console.log("Halloworld")
            Alert.alert("Alert", "Please log out if you want to switch your account");
            return;
        }
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo);
            this.signInUpdate(userInfo["user"]["familyName"], userInfo["user"]["givenName"], userInfo["user"]["id"], "Google");
        } catch (error) {
            switch (error.code) {
                case statusCodes.SIGN_IN_CANCELLED:
                    console.log('Sign In Cancelled');
                    break;

                case statusCodes.IN_PROGRESS:
                    console.log('Sign In In Progress');
                    break;

                case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                    console.log('Play Services not available');
                    break;

                default:
                    console.log(error);
                    break;
            }
        }
    }

    googleSignOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            this.signOutUpdate();
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED)
                console.log('Not Logged In');
            else
                console.error(error);
        }
    }

    signInUpdate = async (familyName, givenName, id, loginType) => {
        store.dispatch(updateLogin({ isLogin: true }));
        store.dispatch(updateAccountSettings({ familyName, givenName, idToken: id, loginType }));
        this.setState({ isLoggedIn: true, familyName, givenName, idToken: id, loginType })
        fireabseLoginAccount(familyName, givenName, id, loginType, this.state.details)
        this.props.navigation.navigate('Settings');
    }

    signOutUpdate = async () => {
        store.dispatch(updateLogin({ isLogin: false }));
        store.dispatch(updateAccountSettings({}));
        this.setState({ isLoggedIn: false, familyName: null, givenName: null, idToken: null });
        this.props.navigation.navigate('Settings');
    }

    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    render() {
        return (

            <View style={this.props.settings.darkMode ? styles.screenD : styles.screenL}>
                <View style={{ ...styles.rows, justifyContent: 'space-between', paddingTop: 50 }}>
                    <View style={{ ...styles.columns, justifyContent: 'center', maxHeight: 35, }}>
                    </View>
                    <View style={styles.screen}>
                        <Text>Account Screen</Text>
                        <View style={signupStyles.container}>
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
                                title="Login"
                                onPress={this.emailSignIn}
                            />

                            <GoogleSigninButton
                                style={{ width: 192, height: 48 }}
                                size={GoogleSigninButton.Size.Wide}
                                color={GoogleSigninButton.Color.Dark}
                                onPress={this.googleSignIn}
                            />

                            <Button
                                color="#3740FE"
                                title="Facebook Login"
                                onPress={this.facebookSignIn}
                            />

                            <Text
                                style={signupStyles.loginText}
                                onPress={() => this.props.navigation.navigate('SignUp')}
                            >
                                Don't have account? Click here to signup
                            </Text>
                            <Text
                                style={signupStyles.loginText}
                                onPress={() => this.props.navigation.navigate('ResetPassword')}
                            >
                                Forgot Password? Click here to reset
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    cards: state.cards,
    data: state.data,
    expenseCategories: state.expenseCategories,
    incomeCategories: state.incomeCategories,
    settings: state.settings,
    isLogin: state.isLogin,
    accountSettings: state.accountSettings,
});

export default connect(mapStateToProps)(Screen);