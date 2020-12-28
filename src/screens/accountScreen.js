import React, {useState, useEffect} from 'react';
import { Text, View, Button,Alert} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { black, bgColorD, bgColorL, chartScreenStyles, iconColors, maxWidth, styles, white, } from '../styles';

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-community/google-signin';
  import { updateLogin } from '../redux/action';
  import { store } from '../redux/store';

  GoogleSignin.configure({
    webClientId: '486441035059-8l61ntdopa47itlm7kknd6acpvmn04q4.apps.googleusercontent.com'
  });
  
class Screen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          isLoggedIn :this.props.isLogin.isLogin,
        }
    }
    
    signIn = async () => {
        try {
          if(this.state.isLoggedIn){
            Alert.alert("Alert", "Please log out if you want to switch your account");
            return;
          }
          await GoogleSignin.hasPlayServices(); 
          const userInfo = await GoogleSignin.signIn();
          console.log(userInfo);
          //const isSignedIn = await GoogleSignin.isSignedIn();
          //console.log("hehe",isSignedIn);
          store.dispatch(updateLogin({isLogin: true}));
          this.setState({state:this.props.isLogin.isLogin})
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
          store.dispatch(updateLogin({isLogin: false}));
          this.setState({state:this.props.isLogin.isLogin})
          //this.props.navigation.navigate('Settings'); 
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_REQUIRED) {
            Alert.alert("Alert", "You have not logged in");
          }else{
          console.error(error);
          }
        }
      };
   
    render() {
        return (
          <View style={this.props.settings.darkMode ? styles.screenD : styles.screenL}>
                <View style={{ ...styles.rows, justifyContent: 'space-between', paddingTop: 50 }}>
                    <View style={{ ...styles.columns, justifyContent: 'center', maxHeight: 35, }}>
                    </View>
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
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
  isLogin: state.isLogin,
  settings: state.settings,

})

export default connect(mapStateToProps)(Screen);