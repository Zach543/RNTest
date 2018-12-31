import React from 'react';
import { createStackNavigator } from 'react-navigation';
import {Image, TouchableOpacity} from 'react-native';
import AddReport from '../Components/AddReport';
import Reports from '../Components/Reports';  

const StackNavRouteConfigs = {
    Reports: {
        screen: Reports,
        navigationOptions: {
            title: 'Reports',
        }
    },
    AddReport: {
        screen: AddReport,
        navigationOptions: {
            title: 'Add Report',
        }
    }
}
  
const StackNavConfig = {
    initialRouteName: 'Reports',
    defaultNavigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        },
        headerRight: (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Image
                    style={{width: 44, height: 44, tintColor: '#fff'}}
                    source={require('../../assets/menu.png')}
                />
            </TouchableOpacity>
        ),
    }),
    headerBackTitleVisible: false,
    headerLayoutPreset: 'center',
}
  
const StackNavigator = createStackNavigator(StackNavRouteConfigs, StackNavConfig);  

export default StackNavigator;