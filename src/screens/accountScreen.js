import React, {useState, useEffect} from 'react';
import { Text, View, Button,Alert} from 'react-native';
import { connect } from 'react-redux';
import { updateLogin, updateAccountSettings } from '../redux/action';
import { store } from '../redux/store';


import { black, bgColorD, bgColorL, chartScreenStyles, iconColors, maxWidth, styles, white, } from '../styles';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-community/google-signin';
import {
  LoginButton,
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';





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
          isLoggedIn :this.props.isLogin,
          givenName: this.props.accountSettings.givenName,
          familyName: this.props.accountSettings.familyName,
          idToken: this.props.accountSettings.idToken,
          LoggedInMethod:null
        }
        console.log("this.state.accountSettings");
        console.log(this.props.accountSettings);
    }
    signInUpdate = async (familyName, givenName, id,loginType) =>{
      store.dispatch(updateLogin({isLogin: true}));
      store.dispatch(updateAccountSettings({familyName: familyName,givenName:givenName,idToken:id,type:loginType }));
      this.setState({isLoggedIn:true,familyName:familyName,givenName:givenName,idToken:id})
      /**check 
      console.log("this.state.isLoggedIn,this.state.familyName,this.state.givenName")
      console.log(this.state.isLoggedIn,this.state.familyName,this.state.givenName)
      console.log("this.props.accountSettings");
      console.log(this.props.accountSettings);*/
      this.props.navigation.navigate('Settings');
    }

    signOutUpdate= async () =>{
      store.dispatch(updateLogin({isLogin: false}));
      this.setState({isLoggedIn:false,familyName:null,givenName:null,idToken:null})
      store.dispatch(updateAccountSettings({}));
      this.props.navigation.navigate('Settings');
    }

    googleSignIn = async () => {
      try {
        if(this.state.isLoggedIn){
          Alert.alert("Alert", "Please log out if you want to switch your account");
          return;
        }
        await GoogleSignin.hasPlayServices(); 
        const userInfo = await GoogleSignin.signIn();
        console.log(userInfo);
        this.signInUpdate(userInfo["user"]["familyName"],userInfo["user"]["givenName"],userInfo["user"]["id"],"Google");
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
  
    googleSignOut = async () => {
      try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        this.signOutUpdate();
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_REQUIRED) {
          Alert.alert("Alert", "You have not logged in");
        }else{
        console.error(error);
        }
      }
    };

    //for facebook
    getInfoFromToken = token => {
      const PROFILE_REQUEST_PARAMS = {
        fields: {
          string: 'id, name,  first_name, last_name',
        },
      };
      const profileRequest = new GraphRequest(
        '/me',
        {token, parameters: PROFILE_REQUEST_PARAMS},
        (error, result) => {
          if (error) {
            console.log('login info has error: ' + error);
          } else {
            //this.setState({userInfo: result});
            //console.log('result:', result["first_name"]);
            this.signInUpdate(result["last_name"],result["first_name"],result["id"],"Facebook");
          }
        },
      );
      new GraphRequestManager().addRequest(profileRequest).start();
    };
   
    render() {
        return (
          
          <View style={this.props.settings.darkMode ? styles.screenD : styles.screenL}>
          <View style={{ ...styles.rows, justifyContent: 'space-between', paddingTop: 50 }}>
          <View style={{ ...styles.columns, justifyContent: 'center', maxHeight: 35, }}>
          </View>
          <View style={styles.screen}>
          <Text>Account Screen</Text>
          {
          //check
          console.log(this.state.isLoggedIn,this.state.familyName,this.state.givenName,this.state.idToken)
          }
          
          <GoogleSigninButton
              style={{ width: 192, height: 48 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={this.googleSignIn} />

          <LoginButton onLoginFinished={(error, result) => {
            if(this.state.isLoggedIn){
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
          onLogoutFinished={() => this.signOutUpdate()
          }
            />

          <Button onPress={this.googleSignOut } title="Google LogOut">
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
  accountSettings: state.accountSettings

})

export default connect(mapStateToProps)(Screen);