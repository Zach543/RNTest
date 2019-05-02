import React from 'react';
import { ErrorRow } from 'aws-amplify-react-native';
import { Auth } from 'aws-amplify';
import { Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';

export default class CustomForgotPassword extends React.Component {

    state = {username: ''};

    constructor(props) {
        super(props);
        this._validAuthStates = ["forgotPassword"];
    }

    onChange = (key, value) => {
        this.setState({ [key]: value })
    }

    goBack() {
        if (this.fromSideMenu()) {
            console.log("go back")
            this.props.navigation.goBack()
        } else {
            this.props.onStateChange("signIn")
        }
    }

    submit() {
        Auth.forgotPassword(this.state.username)
        .then(data => {
            console.log("Data: " + data)
            //go to confirm page
        })
        .catch(err => {
            console.log("Error: " + JSON.stringify(err))
            if (err.message != null) {
                this.setState({error: err.message})
            } else {
                this.setState({error: err})
            }
        });
    }

    fromSideMenu() {
        if (this.props.navigation != null) {
            return (this.props.navigation.getParam('fromSideMenu', false));
        }
        return (false);
    }

    render () {
        var marginTop = 0
        if (this.fromSideMenu()) {
            marginTop = 50
        }
        if (this.props.authState == "forgotPassword" || this.fromSideMenu()) {
            return (
                <View style={styles.container}>
                    <Text style={[styles.heading, {marginTop: marginTop}]}>
                        Reset Password
                    </Text>
                    <TextInput style={styles.input} value={this.state.username} onChangeText={text => this.onChange('username', text)} placeholder='Username'/>
                    <TouchableOpacity style={styles.button} onPress={() => this.submit()}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => this.goBack()}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <ErrorRow>{this.state.error}</ErrorRow>
                </View>
            );
        } else {
            return null;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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