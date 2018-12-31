import { createDrawerNavigator } from 'react-navigation';
import ReportsStackNavigator from '../ReportsStackNavigator';
import SideMenu from './SideMenu';
import CustomForgotPassword from '../../Components/Onboarding/CustomForgotPassword'

const DrawerRouteConfigs = {
    Item1: {
      screen: ReportsStackNavigator
    },
    Item2: {
      screen: CustomForgotPassword
    }
  }
  
  const DrawerNavConfig = {
    drawerPosition: 'right',
    contentComponent: SideMenu,
  }
  
  const DrawerNavigator = createDrawerNavigator(DrawerRouteConfigs, DrawerNavConfig)
  
  export default DrawerNavigator;