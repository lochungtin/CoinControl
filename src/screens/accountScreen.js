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
  import {
    LoginButton,
    LoginManager,
    AccessToken,
    GraphRequest,
    GraphRequestManager,
  } from 'react-native-fbsdk';

  import { updateLogin } from '../redux/action';
  import { store } from '../redux/store';



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
          isLoggedIn :this.props.isLogin.isLogin,
          givenName: null,
          lastName:null,
          idToken:null,
          LoggedInMethod:null

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
        {token, parameters: PROFILE_REQUEST_PARAMS},
        (error, result) => {
          if (error) {
            console.log('login info has error: ' + error);
          } else {
            //this.setState({userInfo: result});
            //console.log('result:', result["first_name"]);
            store.dispatch(updateLogin({isLogin: true}));
          this.setState({isLoggedIn:this.props.isLogin.isLogin})
            this.setState({lastName: result["last_name"]});
            this.setState({givenName: result["first_name"]});
            this.setState({id: result["id"]});
          }
        },
      );
      new GraphRequestManager().addRequest(profileRequest).start();
    };
  
    
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
          this.setState({isLoggedIn:true})
          //console.log(userInfo["user"]["familyName"],"HIHI");
          //console.log(userInfo["user"]["givenName"],"HIHI");
          //console.log(userInfo["user"]["id"],"HIHI");
          this.setState({familyName:userInfo["user"]["familyName"]});
          this.setState({givenName:userInfo["user"]["givenName"]});
          this.setState({idToken:userInfo["user"]["id"]});
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
          this.setState({isLoggedIn:false})
          //this.setState({isLoggedIn:true});
          this.props.navigation.navigate('Settings'); 
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_REQUIRED) {
            Alert.alert("Alert", "You have not logged in");
          }else{
          console.error(error);
          }
        }
      };
      facebookLogOut(){
            store.dispatch(updateLogin({isLogin: false}));
            this.setState({isLoggedIn:false})
            this.setState({givenName: null});
            this.setState({lastName: null});
            this.setState({id: null})
      }
   
    render() {
        return (
          
          <View style={this.props.settings.darkMode ? styles.screenD : styles.screenL}>
          <View style={{ ...styles.rows, justifyContent: 'space-between', paddingTop: 50 }}>
          <View style={{ ...styles.columns, justifyContent: 'center', maxHeight: 35, }}>
          </View>
          <View style={styles.screen}>
          <Text>Account Screen</Text>
          {console.log(this.state.isLoggedIn,"JOJO")}
          
          <GoogleSigninButton
              style={{ width: 192, height: 48 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={this.signIn} />

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
          onLogoutFinished={() => this.facebookLogOut()
          /*
            {
            
            store.dispatch(updateLogin({isLogin: false}));
            console.log(this.props.isLogin.isLogin,"PPP")
            this.setState({isLoggedIn:this.props.isLogin.isLogin})
            this.setState({givenName: null});
            this.setState({lastName: null});
            this.setState({id: null})
            }*/
          }
            />

          <Button onPress={this.signOut } title="Google LogOut">
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