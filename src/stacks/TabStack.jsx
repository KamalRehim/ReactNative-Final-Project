import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileStack from './ProfileStack';
import HomeStack from './HomeStack';
import TabBar from './TabBar';
import SearchStack from './SearchStack';

const Tab = createBottomTabNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator
      tabBar={
        ({ state, descriptors, navigation }) =>
          <TabBar
            state={state}
            descriptors={descriptors}
            navigation={navigation}
          />
      }
      screenOptions={{ headerShown: false }}>
      <Tab.Screen name='Home' component={HomeStack} />
      <Tab.Screen name='Search' component={SearchStack} />
      <Tab.Screen name='Profile' component={ProfileStack} />
    </Tab.Navigator>
  )
}

export default TabStack