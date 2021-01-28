import { GoogleSignin, GoogleSigninButton, statusCodes, } from '@react-native-community/google-signin';
import React from 'react';
import { Text, View, Button, Alert } from 'react-native';
import { AccessToken, GraphRequest, GraphRequestManager, LoginButton, } from 'react-native-fbsdk';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import { updateLogin } from '../redux/action';
import { store } from '../redux/store';

import { styles } from '../styles';



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
            isLoggedIn: props.login.login,
            givenName: null,
            lastName: null,
            idToken: null,
            LoggedInMethod: null
        }
    }

    getInfoFromToken = token => {
        const PROFILE_REQUEST_PARAMS = {
            fields: {
                string: 'id, name,  first_name, last_name',
            },
        };
        const profileRequest = new GraphRequest(
            '/me',
            { token, parameters: PROFILE_REQUEST_PARAMS },
            (error, result) => {
                if (error) {
                    console.log('login info has error: ' + error);
                } else {
                    //this.setState({userInfo: result});
                    //console.log('result:', result["first_name"]);
                    store.dispatch(updateLogin({ isLogin: true }));
                    this.setState({ lastName: result["last_name"], givenName: result["first_name"], id: result["id"], isLoggedIn: this.props.isLogin.isLogin });
                }
            },
        );
        new GraphRequestManager().addRequest(profileRequest).start();
    };


    signIn = async () => {
        try {
            if (this.state.isLoggedIn) {
                Alert.alert("Alert", "Please log out if you want to switch your account");
                return;
            }
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo);
            //const isSignedIn = await GoogleSignin.isSignedIn();
            //console.log("hehe",isSignedIn);
            store.dispatch(updateLogin({ isLogin: true }));
            //console.log(userInfo["user"]["familyName"],"HIHI");
            //console.log(userInfo["user"]["givenName"],"HIHI");
            //console.log(userInfo["user"]["id"],"HIHI");
            this.setState({ isLoggedIn: true, familyName: userInfo["user"]["familyName"], givenName: userInfo["user"]["givenName"], idToken: userInfo["user"]["id"] });
            this.props.navigation.navigate('Settings');
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                console.log("SIGN_IN_CANCELLED")
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log("IN_PROGRESS")
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log("PLAY_SERVICES_NOT_AVAILABLE")
                // play services not available or outdated
            } else {
                console.log(error)
                // some other error happened
            }
        }
    };

    signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            this.setState({ user: null });
            store.dispatch(updateLogin({ isLogin: false }));
            this.setState({ isLoggedIn: false })
            //this.setState({isLoggedIn:true});
            this.props.navigation.navigate('Settings');
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                Alert.alert("Alert", "You have not logged in");
            } else {
                console.error(error);
            }
        }
    };

    facebookLogOut() {
        store.dispatch(updateLogin({ isLogin: false }));
        this.setState({ isLoggedIn: false, givenName: null, lastName: null, id: null });
    }

    render() {
        return (

            <View style={this.props.settings.darkMode ? styles.screenD : styles.screenL}>
                <View style={{ ...styles.rows, justifyContent: 'space-between', paddingTop: 50 }}>
                    <View style={{ ...styles.columns, justifyContent: 'center', maxHeight: 35, }}>
                    </View>
                    <View style={styles.screen}>
                        <Text>Account Screen</Text>
                        <GoogleSigninButton
                            style={{ width: 48, height: 48 }}
                            size={GoogleSigninButton.Size.Icon}
                            color={GoogleSigninButton.Color.Dark}
                            onPress={this.signIn}
                        />
                        <LoginButton
                            style={{ height: 48 }}
                            onLoginFinished={(error, result) => {
                                if (this.state.isLoggedIn) {
                                    Alert.alert("Alert", "Please log out if you want to switch your account");
                                    return;
                                }
                                if (error) {
                                    console.log('login has error: ' + result.error);
                                } else if (result.isCancelled) {
                                    console.log('login is cancelled.');
                                } else {
                                    AccessToken.getCurrentAccessToken().then(data => {
                                        const accessToken = data.accessToken.toString();
                                        this.getInfoFromToken(accessToken);
                                    });
                                }
                            }}
                            onLogoutFinished={this.facebookLogOut}
                        />

                        <Button onPress={this.signOut} title="Google LogOut" />
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    login: state.login,
    settings: state.settings,

})

export default connect(mapStateToProps)(Screen);