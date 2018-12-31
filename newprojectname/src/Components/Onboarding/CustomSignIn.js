import React from 'react';
import { SignIn, ErrorRow } from 'aws-amplify-react-native';
import { Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';

export class CustomSignIn extends SignIn {
    constructor(props) {
        super(props);
        this._validAuthStates = ["signIn", "signedOut", "signedUp"];
    }

    onChange = (key, value) => {
        this.setState({ [key]: value })
    }

    showComponent(theme) {
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Sign In</Text>
                <TextInput style={styles.input} value={this.state.username} onChangeText={text => this.onChange('username', text)} placeholder='Username'/>
                <TextInput style={styles.input} value={this.state.password} onChangeText={text => this.onChange('password', text)} placeholder='Password'/>
                <TouchableOpacity style={styles.button} onPress={() => super.signIn()}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => super.changeState("signUp")}>
                    <Text style={styles.buttonText}>Create an Account</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => super.changeState("forgotPassword")}>
                    <Text style={styles.buttonText}>Forgot Password</Text>
                </TouchableOpacity>
                <ErrorRow theme={theme}>{this.state.error}</ErrorRow>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },  
    heading: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 30,
      alignSelf: 'center'
    },
    input: {
        textAlignVertical: 'top',
        fontSize: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginLeft: 20,
        marginRight: 20
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
    },
    button: {
        backgroundColor: '#FF9900',
        alignItems: 'center',
        width: '50%',
        alignSelf: 'center',
        padding: 10,
        borderRadius: 5,
        marginBottom: 50
    }
  });