import { GoogleSignin, GoogleSigninButton, statusCodes, } from '@react-native-community/google-signin';
import React from 'react';
import { Image, Text, View, TextInput, Alert, TouchableOpacity } from 'react-native';
import { AccessToken, GraphRequest, GraphRequestManager, LoginManager, } from 'react-native-fbsdk';
import { connect } from 'react-redux';
import Logo from '../components/Logo';
import ScreenHeader from '../components/ScreenHeader';
import SignUpInput from '../components/SignUpInput';

import { firebaseLoginAccount } from "../firebase/action";
import firebase from "../firebase/config";

import { signIn, signOut } from '../redux/action';
import { store } from '../redux/store';

import { signUpInputStyles, styles, } from '../styles';

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
            email: '',
            hidden: true,
            password: '',
        };
    }

    emailSignIn = () => {
        if (this.props.type !== '')
            Alert.alert("Alert", "Please log out if you want to switch your account");
        else {
            if (this.state.email !== '' && this.state.password !== '')
                firebase
                    .auth()
                    .signInWithEmailAndPassword(this.state.email, this.state.password)
                    .then(result => {
                        console.log(result)
                        //console.log('User logged-in successfully!')
                        this.setState({ email: '', password: '' });
                        this.signInUpdate("", result.user.displayName, result.user.uid, "Email")
                        this.props.navigation.navigate('Settings');
                    })
                    .catch(error => console.log(error.message));
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
        if (this.props.type !== '')
            Alert.alert("Alert", "Please log out if you want to switch your account");
        else {
            try {
                await GoogleSignin.hasPlayServices();
                const user = await GoogleSignin.signIn().user;
                this.signInUpdate(user.givenName, user.familyName, user.id, "Google");
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

    signInUpdate = async (displayName, familyName, type, uid) => {
        store.dispatch(signIn({ displayName, familyName, type, uid }));
        firebaseLoginAccount(
            displayName,
            familyName,
            type,
            uid,
            {
                "cards": this.props.cards,
                "data": this.props.data,
                "expenseCategories": this.props.expenseCategories,
                "incomeCategories": this.props.incomeCategories,
                "settings": this.props.settings,
            }
        );
        this.props.navigation.navigate('Settings');
    }

    signOutUpdate = async () => {
        store.dispatch(signOut());
        this.props.navigation.navigate('Settings');
    }

    toggleHidden = () => this.setState({ hidden: !this.state.hidden });

    updateEmail = email => this.setState({ email });

    updatePassword = password => this.setState({ password });

    render() {
        return (
            <View style={this.props.settings.darkMode ? styles.screenD : styles.screenL}>
                <ScreenHeader back={() => this.props.navigation.goBack()} name={'Sign In'} />
                <Logo dim={100} style={{ marginTop: 40 }} />
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
                <View style={signUpInputStyles.forgotPasswordContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ResetPassword')}>
                        <Text style={{ color: this.props.settings.accent }}>
                            Forgot Password?
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>

                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    accountSettings: state.accountSettings,
    cards: state.cards,
    data: state.data,
    expenseCategories: state.expenseCategories,
    incomeCategories: state.incomeCategories,
    settings: state.settings,
    isLogin: state.isLogin,
});

export default connect(mapStateToProps)(Screen);
