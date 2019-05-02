import React from 'react';
import {NavigationActions} from 'react-navigation';
import {Text, View} from 'react-native';

class SideMenu extends React.Component {
    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    }

    render () {
        return (
            <View style={{paddingTop: 20}}>
                <Text style={{padding: 10}} onPress={this.props.screenProps.signOut()}>
                    Sign Out
                </Text>
                <Text style={{padding: 10}} onPress={() => this.props.navigation.navigate('Item2', {fromSideMenu: true})}>
                    Reset Password
                </Text>
            </View>
        );
    }
}

export default SideMenu;
