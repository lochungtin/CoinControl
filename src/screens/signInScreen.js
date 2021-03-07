import { GoogleSignin, GoogleSigninButton, statusCodes, } from '@react-native-community/google-signin';
import React from 'react';
import { Text, TouchableOpacity, View, } from 'react-native';
import { AccessToken, GraphRequest, GraphRequestManager, LoginManager, } from 'react-native-fbsdk';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import ScreenHeader from '../components/ScreenHeader';
import SignUpInput from '../components/SignUpInput';
import { firebaseLoginAccount } from '../firebase/action';
import firebase from '../firebase/config';
import { signIn, signOut } from '../redux/action';
import { store } from '../redux/store';

import { black, shade2, shade3 } from '../data/color';
import { accountScreenStyles, maxHeight, styles, } from '../styles';

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

    color = () => this.props.settings.darkMode ? shade2 : shade3;

    emailSignIn = () => {
        if (this.state.email !== '' && this.state.password !== '')
            firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(result => {
                    this.signInUpdate("", result.user.displayName, result.user.uid, "Email");
                    this.props.navigation.goBack();
                })
                .catch(error => console.log(error.message));
    }

    facebookSignIn = () => {
        LoginManager.logInWithPermissions(['public_profile']).then(
            result => {
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

    googleSignIn = () => {
        GoogleSignin.hasPlayServices().then(has => {
            if (has) {
                GoogleSignin.signIn()
                    .then(result => {
                        const user = result.user;
                        this.signInUpdate(user.givenName, user.familyName, user.id, "Google");
                    })
                    .catch(error => console.log(error));
            }
        }).catch(error => console.log(error));
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

    style = styleName => accountScreenStyles[styleName + (this.props.settings.darkMode ? "D" : "L")];

    toggleHidden = () => this.setState({ hidden: !this.state.hidden });

    updateEmail = email => this.setState({ email });

    updatePassword = password => this.setState({ password });

    render() {
        return (
            <View style={this.props.settings.darkMode ? styles.screenD : styles.screenL}>
                <View style={{ ...styles.rows, justifyContent: 'space-between', height: maxHeight - 170 }}>
                    <View style={{ ...styles.rows, justifyContent: 'center' }}>
                        <ScreenHeader back={this.props.navigation.goBack} name={'Sign In'} />
                        <View style={{ height: 50 }} />
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
                        <View style={accountScreenStyles.forgotPasswordContainer}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('ResetPassword')}>
                                <Text style={{ color: this.color() }}>
                                    Forgot Password?
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={this.emailSignIn} style={{ ...styles.columns, ...accountScreenStyles.submitBtn, backgroundColor: this.props.settings.accent }}>
                            <Text style={{ color: black }}>
                                Sign In
                            </Text>
                        </TouchableOpacity>
                        <View style={{ ...styles.columns, ...accountScreenStyles.orBarContainer }}>
                            <View style={this.style('orBar')} />
                            <Text style={{ color: this.color() }}>
                                or sign in with
                            </Text>
                            <View style={this.style('orBar')} />
                        </View>
                        <View style={{ ...styles.rows, ...accountScreenStyles.oauthContainer }}>
                            <GoogleSigninButton
                                style={{ height: 52, width: 309, }}
                                size={GoogleSigninButton.Size.Wide}
                                color={GoogleSigninButton.Color.Light}
                                onPress={this.googleSignIn}
                            />
                            <View style={{ height: 49 }}>
                                <TouchableOpacity onPress={this.facebookSignIn} style={{ ...styles.columns, ...accountScreenStyles.facebookSignInBtn }}>
                                    <Icon
                                        color={'#3b5998'}
                                        name={'facebook'}
                                        size={23}
                                    />
                                    <Text style={accountScreenStyles.facebookSignInText}>
                                        Continue with Faceboook
                                </Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={{ ...styles.columns, ...accountScreenStyles.facebookSignInBtn }}>
                                <Icon
                                    color={black}
                                    name={'apple'}
                                    size={23}
                                />
                                <Text style={accountScreenStyles.facebookSignInText}>
                                    Placeholder for iOS
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ ...styles.columns, ...accountScreenStyles.signUpContainer }}>
                        <Text style={{ color: this.color() }}>
                            Don't have an account?
                        </Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
                            <Text style={{ color: this.props.settings.accent }}>
                                Sign Up
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    account: state.account,
    cards: state.cards,
    data: state.data,
    expenseCategories: state.expenseCategories,
    incomeCategories: state.incomeCategories,
    settings: state.settings,
    isLogin: state.isLogin,
});

export default connect(mapStateToProps)(Screen);
