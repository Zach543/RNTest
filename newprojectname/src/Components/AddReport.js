import React from 'react'
import { graphqlMutation } from 'aws-appsync-react';
import gql from 'graphql-tag';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import KeyboardShift from './Util/KeyboardShift';

const CreateReport = gql`
  mutation($companyName: String, $workLog: String) {
    createFieldServiceReport(input: {
        companyName: $companyName
        workLog: $workLog
    }) {
        id companyName workLog
    }
  }
`

const ListFieldReports = gql`
  query {
    listFieldServiceReports {
      items {
        id companyName workLog
      }
    }
  }
`

class AddReport extends React.Component {
    state = {
        companyName: '',
        workLog: ''
    }

    onChange = (key, value) => {
        this.setState({ [key]: value })
    }

    addReport = () => {
        if (this.state.companyName === '' || this.state.workLog === '') return
        const report = {
            companyName: this.state.companyName, workLog: this.state.workLog
        }
        console.log(" company name: " + report.companyName + " work log: " + report.workLog)

        this.props.createFieldServiceReport(report)
        this.setState({
            companyName: '',
            workLog: ''
        })
        this.props.navigation.goBack()
    }

    render() {
        return (
            <KeyboardShift>
                {() => (
                    <View style={styles.container}>
                        <ScrollView>
                            <Text style={styles.heading}>Add Report</Text>
                            <TextInput style={styles.input} value={this.state.companyName} onChangeText={text => this.onChange('companyName', text)} placeholder='Company Name'/>
                            <TextInput style={[styles.input, { height: 120 }]} multiline={true} value={this.state.workLog} onChangeText={text => this.onChange('workLog', text)} placeholder='Work Log'/>
                            <TextInput style={styles.input} placeholder='Placeholder Text'/>
                            <TextInput style={styles.input} placeholder='Placeholder Text'/>
                            <TextInput style={styles.input} placeholder='Placeholder Text'/>
                            <TextInput style={styles.input} placeholder='Placeholder Text'/>
                            <TouchableOpacity style={styles.button} onPress={this.addReport}>
                                <Text style={styles.buttonText}>Add Report</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                )}
            </KeyboardShift>
        );
    }
}

export default graphqlMutation(CreateReport, ListFieldReports, 'Create')(AddReport);

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