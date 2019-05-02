import React from 'react';

import Amplify, { Auth } from 'aws-amplify'; 
import authConfig from './authConfig'; 
import aws_config from './aws-exports';
import {
  withAuthenticator,
  SignUp,
  Loading
} from 'aws-amplify-react-native';

import AWSAppSyncClient from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';
import { ApolloProvider } from 'react-apollo';

import { createAppContainer } from 'react-navigation';
import DrawerNavigator from './src/Navigation/Drawer/DrawerNavigator';
import { CustomSignIn } from './src/Components/Onboarding/CustomSignIn';
import CustomForgotPassword from './src/Components/Onboarding/CustomForgotPassword';

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Remote debugger']);

Amplify.configure(authConfig);
Amplify.configure(aws_config);

const client = new AWSAppSyncClient({
  url: aws_config.aws_appsync_graphqlEndpoint,
  region: aws_config.aws_appsync_region,
  auth: {
    type: aws_config.aws_appsync_authenticationType,
    jwtToken: async () => (await Auth.currentSession()).idToken.jwtToken
  }
});

class App extends React.Component {
  signOut = () => {
    console.log("Signing Out")
    Auth.signOut()
        .then(() => {this.props.onStateChange('signedOut', null);})
        .catch(err => console.log('err: ', err))
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <Rehydrated>
          <AppContainer screenProps={{signOut: () => this.signOut}}/>
        </Rehydrated>
      </ApolloProvider>
    );
  }
}

const AppContainer = createAppContainer(DrawerNavigator);

export default withAuthenticator(App, false, [<CustomSignIn/>, <SignUp/>, <CustomForgotPassword screenProps={{onStateChange: (state) => this.props.onStateChange(state)}}/>, <Loading/>]);