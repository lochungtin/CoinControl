import React, {useState, useEffect} from 'react';
import { Text, View, TextInput, Button,Alert} from 'react-native';
import { connect } from 'react-redux';
import { updateLogin, updateAccountSettings } from '../redux/action';
import { store } from '../redux/store';
import firebase from "../firebase/config"
import {fireabseLoginAccount} from "../firebase/action"

import { signupStyles, styles, white, } from '../styles';
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
          isLogin :this.props.isLogin,
          givenName: this.props.accountSettings.givenName,
          familyName: this.props.accountSettings.familyName,
          idToken: this.props.accountSettings.idToken,
          email: '', 
          password: '',
          loginType: this.props.accountSettings.loginType,

          details : {
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
    
    signInUpdate = async (familyName, givenName, id,loginType) =>{
      store.dispatch(updateLogin({isLogin: true}));
      store.dispatch(updateAccountSettings({familyName: familyName,givenName:givenName,idToken:id,loginType:loginType }));
      this.setState({isLoggedIn:true,familyName:familyName,givenName:givenName,idToken:id,loginType:loginType })
      fireabseLoginAccount(familyName, givenName, id,loginType,this.state.details)
      this.props.navigation.navigate('Settings');
    }

    signOutUpdate= async () =>{
      store.dispatch(updateLogin({isLogin: false}));
      this.setState({isLoggedIn:false,familyName:null,givenName:null,idToken:null})
      store.dispatch(updateAccountSettings({}));
      this.props.navigation.navigate('Settings');
    }

    googleSignIn = async () => {
      console.log(this.state.isLogin, this.state.loginType)
      if(this.state.isLogin && this.state.loginType=="Facebook"){
        console.log("Halloworld")
        Alert.alert("Alert", "Please log out if you want to switch your account");
        return;
      }
      try {
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

    emailLogin = () => {
      console.log(this.state.isLogin, this.state.loginType)
      if(this.state.isLogin && this.state.loginType=="Facebook"){
        Alert.alert("Alert", "Please log out if you want to switch your account");
        return;
      }
      if(this.state.email === '' && this.state.password === '') {
        Alert.alert('Enter details to signin!')
      } else {
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
          console.log(res.user.displayName,res.user.uid);
          console.log("email");
          this.signInUpdate("",res.user.displayName,res.user.uid,"Email")
          console.log(email);
          this.props.navigation.navigate('Settings')
        })
        .catch(error => this.setState({ errorMessage: error.message }))
      }
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
              onPress={() => this.emailLogin()}
            />  

            <GoogleSigninButton
              style={{ width: 192, height: 48 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={this.googleSignIn} />

            <LoginButton onLoginFinished={(error, result) => {
              if(this.state.isLoggedIn && this.state.loginType =="Google"){
                this.googleSignOut();
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
            }/>

            

            <Text 
              style={signupStyles.loginText}
              onPress={() => this.props.navigation.navigate('SignUp')}>
              Don't have account? Click here to signup
            </Text>  
            <Text 
              style={signupStyles.loginText}
              onPress={() => this.props.navigation.navigate('ResetPassword')}>
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

})

export default connect(mapStateToProps)(Screen);