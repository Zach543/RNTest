import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Print, Asset } from 'expo'

export default class ReportItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.item.id);
    };
  
    printHtml = async () => {
        console.log("Printing")
        const style =   `<style>
                            table, th, td {
                                border: 1px solid black;
                                border-collapse: collapse;
                            }
                            .center-div {
                                margin: 0 auto;
                                width: 200px; 
                            }
                            .top-image {
                                display: block;
                                margin-left: auto;
                                margin-right: auto;                      
                            }
                        </style>`

        const workLog = `<td colspan="2" style="vertical-align: top;">
                            <p style="margin-bottom: -15px; font-weight: bold; text-align: left;">Work Log<p>
                            <p style="font-weight: normal; text-align: center;">${this.props.item.workLog}</p>
                        </td>`
        const company = `<td colspan="2" style="vertical-align: top;">
                            <p style="margin-bottom: -15px; font-weight: bold; text-align: left;">Company<p>
                            <p style="font-weight: normal; text-align: center;">${this.props.item.companyName} text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text</p>
                        </td>`

        const workLog2 =    `<td style="vertical-align: top;">
                                <p style="margin-bottom: -15px; font-weight: bold; text-align: left;">Work Log<p>
                                <p style="font-weight: normal; text-align: center;">${this.props.item.workLog}</p>
                            </td>`
        const company2 =    `<td style="vertical-align: top;">
                                <p style="margin-bottom: -15px; font-weight: bold; text-align: left;">Company<p>
                                <p style="font-weight: normal; text-align: center;">${this.props.item.companyName}</p>
                            </td>`


        const html = `<html>
                    <head>
                    ${style}
                    </head>
                    <body>
                        <div class="center-div">
                            <img class="top-image" src=${Asset.fromModule(require('../../assets/list.png')).uri} alt="Top Image" height="100" width="100">
                            <h1 style="text-align: center">REPORTS</h1>
                        </div>
                        <table style="width:100%; table-layout:fixed;">
                            <tr>
                                ${company}
                                ${workLog}
                            </tr>
                            <tr>
                                ${company}
                                ${workLog}
                            </tr>
                            <tr>
                                <tr>
                                    ${company2}
                                    ${workLog2}
                                    <td colspan="2" rowspan="2" style="vertical-align: top;">stuff</td>
                                </tr>
                            </tr>
                        </table>
                    </body>
                    </html>`;

        await Print.printAsync({
          html: html
        });
    };
        
    render() {
        const textColor = this.props.selected ? "#FF9900" : "black";
        return (
            <TouchableWithoutFeedback onPress={this._onPress}>
                <View style={styles.reportsRow}>
                    <View style={styles.leftContainer}>
                        <Text style={[styles.listText, { color: textColor }]}>{this.props.item.companyName}</Text>
                    </View>
                    <View style={styles.rightContainer}>
                        <TouchableOpacity style={styles.button} onPress={this.printHtml}>
                            <Text style={styles.buttonText}>PDF</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('AddReport')}>
                            <Text style={styles.buttonText}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}  

const styles = StyleSheet.create({
    reportsRow: {
        flex: 1,
        flexDirection: 'row',
        padding: 10
    },
    listText: {
        fontSize: 20,
        marginLeft: 20,
        marginRight: 20
    },
    leftContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#FF9900',
        alignItems: 'center',
        width: '40%',
        alignSelf: 'center',
        padding: 5,
        borderRadius: 5,
        marginBottom: 10,
        marginRight: 10
    },
  });  