import React from 'react';
import { Text, TouchableOpacity, View, } from 'react-native';
import { connect } from 'react-redux';

import Logo from '../components/Logo';
import ScreenHeader from '../components/ScreenHeader';
import SignUpInput from '../components/SignUpInput';
import firebase from '../firebase/config';
import { store } from '../redux/store';
import { firebaseLoginAccount } from '../firebase/action';
import { signIn } from '../redux/action';

import { black, shade2, shade3 } from '../data/color';
import { accountScreenStyles, maxHeight, styles, } from '../styles';

class Screen extends React.Component {
    //{this.props.route.params.uid}

    constructor(props) {
        super(props);
    }

    color = () => this.props.settings.darkMode ? shade2 : shade3;

    async signInWithOptions (dataMethod){
        //1. Login to put local on database
        //2. Login to put database on local
        //3. Merge to update both database and local
        var userData = await firebaseLoginAccount(
            this.props.route.params.familyName,
            this.props.route.params.displayName,
            this.props.route.params.uid,
            this.props.route.params.type,
            {
                "cards": this.props.cards,
                "data": this.props.data,
                "expenseCategories": this.props.expenseCategories,
                "incomeCategories": this.props.incomeCategories,
                "settings": this.props.settings,
            },
            dataMethod
        )

        console.log("BROTHERBROTHER")
        console.log(userData)
        
        if(userData!=null){
            switch(dataMethod){
                case "localOnDatabase":
                    //userData should be null
                    alert("Error")
                    return 
                case "databaseOnLocal":
                    console.log(userData)
                    //update REDUX HERE (working on here just now)
                case "merge":
                    console.log(userData)
            }
        }

        var displayName = this.props.route.params.displayName;
        var familyName = this.props.route.params.familyName;
        var uid  = this.props.route.params.uid;
        var type= this.props.route.params.type;
        store.dispatch(signIn({ displayName, familyName, type, uid }));
        this.props.navigation.navigate('Settings');



    }

    render() {
        return (
            <View style={this.props.settings.darkMode ? styles.screenD : styles.screenL}>
                <View style={{ ...styles.rows, justifyContent: 'space-between', height: maxHeight - 170 }}>
                    <View style={{ ...styles.rows, justifyContent: 'center' }}>
                        <ScreenHeader back={this.props.navigation.goBack} name={'Confirm Sign in Options'} />
                        <View>
                            <TouchableOpacity onPress={async ()=> await this.signInWithOptions("localOnDatabase")}> 
                                <Text style={{color:"white"}}>
                                    1. Put local data on database
                                    
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity onPress={async ()=> await this.signInWithOptions("databaseOnLocal")}> 
                                <Text style={{color:"white"}}>
                                    2. Put database data on local stotage
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity onPress={async ()=> await this.signInWithOptions("merge")}> 
                                <Text style={{color:"white"}}>
                                    3. Merge to combine both database and local
                                </Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                    <View style={{ ...styles.rows, justifyContent: 'center' }}>
                       
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings,
    cards: state.cards,
    data: state.data,
    expenseCategories: state.expenseCategories,
    incomeCategories: state.incomeCategories,
    isLogin: state.isLogin,
})

export default connect(mapStateToProps)(Screen);