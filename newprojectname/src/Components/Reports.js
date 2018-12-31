import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { buildSubscription } from 'aws-appsync';
import { graphqlMutation } from 'aws-appsync-react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import ReportItem from './ReportItem';

const ListFieldReports = gql`
  query {
    listFieldServiceReports {
      items {
        id companyName workLog
      }
    }
  }
`

const SubscribeToReports = gql`
  subscription {
    onCreateFieldServiceReport {
      id companyName workLog
    }
  }
`

const SubscribeToDeletedReports = gql`
  subscription {
    onDeleteFieldServiceReport {
      id companyName workLog
    }
  }
`

const DeleteReport = gql`
  mutation($id: ID!) {
    deleteFieldServiceReport(input: {
        id: $id
    }) {
        id companyName workLog
    }
  }
`

class Reports extends React.Component {
    
    state = {selected: []};

    componentDidMount() {
        console.log("Component Did Mount")
        this.props.subscribeToMore(
            buildSubscription(SubscribeToReports, ListFieldReports)
        );
        this.props.subscribeToMore(
            buildSubscription(SubscribeToDeletedReports, ListFieldReports)
        );
    }

    _keyExtractor = (item) => item.id;

    _onPressItem = (id) => {
        this.setState((state) => {
            const selected = state.selected;
            //Add or remove from array to keep the array holding only selected ids
            if (selected.includes(id)) {
                var pos = selected.indexOf(id);
                selected.splice(pos, 1);
            } else {
                selected.push(id)
            }
            return {selected};
        });
    };

    renderSeparator = () => {
        return (
          <View style={styles.separator}/>
        );
      };    

    _renderItem = ({item}) => (
        <ReportItem
            onPressItem={this._onPressItem}
            selected={this.state.selected.includes(item.id)}
            item={item}
            navigation={this.props.navigation}
        />
    );

    renderDeleteButton() {
        if(this.state.selected.length > 0) {
            return (
                <TouchableOpacity style={[styles.button, {marginTop: 20}]} onPress={this.deleteReport}>
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            );
        } else {
            return (
                <View></View>
            );
        }
    }

    deleteReport = () => {
        if (this.state.selected.length == 0) return

        this.state.selected.forEach((id) => {
            const report = {
                id: id
            }
            console.log("Deleting Report: " + report);
            this.props.deleteFieldServiceReport(report)
        });

        this.setState({
            selected: []
        })
    }

    render() {
        return (
          <View style={{flex: 1}}>
            {this.renderDeleteButton()}
            <FlatList
                data={this.props.reports}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                ItemSeparatorComponent={this.renderSeparator}
            />
            <TouchableOpacity style={styles.createButton} onPress={() => this.props.navigation.navigate('AddReport')}>
                <Text style={styles.buttonText}>Add Report</Text>
            </TouchableOpacity>
          </View>
        );
    }    
}

export default compose(
    graphql(ListFieldReports, {
        options: {
            fetchPolicy: 'cache-and-network'
        },
        props: props => ({
            reports: props.data.listFieldServiceReports ? props.data.listFieldServiceReports.items : [],
            subscribeToMore: props.data.subscribeToMore
        })
    }),
    graphqlMutation(DeleteReport, ListFieldReports, 'Delete')
)(Reports);

const styles = StyleSheet.create({
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center'
    },
    separator: {
        height: 1,
        width: "96%",
        backgroundColor: "black",
        marginLeft: "2%",
        marginRight: "2%"
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#FF9900',
        alignItems: 'center',
        width: '25%',
        alignSelf: 'flex-end',
        padding: 5,
        borderRadius: 5,
        marginBottom: 10,
        marginRight: 10
    },
    createButton: {
        backgroundColor: '#FF9900',
        alignItems: 'center',
        width: '50%',
        alignSelf: 'center',
        padding: 5,
        borderRadius: 5,
        marginBottom: 10,
        marginRight: 10
    }
});  