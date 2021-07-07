import React, { Component } from 'react';
import {View,Button,TextInput} from 'react-native';

import firebase from 'firebase';

class RegisterScreen extends Component {
    constructor(props){
        super(props);

        this.state={
            email:'',
            password:'',
            name:''
        }
        this.onSignUp=this.onSignUp.bind(this)
    }

        onSignUp(){
            const {email ,password,name} =this.state;
            firebase.auth().createUserWithEmailAndPassword(email,password)
            .then((result)=>{
                firebase.firestore().collection('users')
                .doc(firebase.auth().currentUser.uid)
                .set({
                    name,
                    email,
                })
                console.log(result)
            }).catch((err)=>console.log(err))
        }
    render() {
        return (
            <View>
                <TextInput
                    placeholder ='name'
                    onChangeText={(name)=>this.setState({name:name})}
                />
                <TextInput
                    placeholder ='email'
                    onChangeText={(email)=>this.setState({email:email})}
                />
                <TextInput
                    placeholder ='password'
                    onChangeText={(password)=>this.setState({password:password})}
                    secureTextEntry={true}
                />
                <Button
                    title='SignUp'
                    onPress={()=>this.onSignUp()}
                />
            </View>
        );
    }
}



export default RegisterScreen;
