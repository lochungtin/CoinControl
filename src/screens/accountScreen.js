import React, {useState, useEffect} from 'react';
import { Text, View, Button} from 'react-native';
import { connect } from 'react-redux';
import { styles } from '../styles';


import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-community/google-signin';
  import { DEFAULT_LOGIN,UPDATE_LOGIN } from '../redux/action';
  import { store } from '../redux/store';

  GoogleSignin.configure({
    webClientId: '486441035059-8l61ntdopa47itlm7kknd6acpvmn04q4.apps.googleusercontent.com'
  });
  
class Screen extends React.Component {

    constructor(props) {
        super(props);
    }
    
    signIn = async () => {
        try {
          await GoogleSignin.hasPlayServices(); 
          const userInfo = await GoogleSignin.signIn();
          isSignedIn = await GoogleSignin.isSignedIn();
          console.log(userInfo);
          store.dispatch(updateLogin(isSignedIn
        ));
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
            console.log("AJ FK")
            // some other error happened
          }
        }
      };
      signOut = async () => {
        try {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          this.setState({ user: null }); 
        } catch (error) {
          console.error(error);
        }
      };
   
    render() {
        return (
            <View style={styles.screen}>
                <Text>Account Screen</Text>
                <GoogleSigninButton
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={this.signIn} />

                <Button onPress={this.signOut } title="LogOut">
                </Button>
            </View>
        );
    }
}

const mapStateToProps = state => ({
  isLogin: state.isLogin,

})

export default connect(mapStateToProps)(Screen);