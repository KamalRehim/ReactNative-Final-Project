import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homepage from '../screens/homepage/Homepage';
import Details from '../screens/details/Details';
import HomeHeader from './HomeHeader';

const Stack = createNativeStackNavigator()

const HomeStack = () => {


    return (
        <Stack.Navigator screenOptions={{header:()=><HomeHeader/>}}>
            <Stack.Screen name="Home Page" component={Homepage} />
            <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
    )


}

export default HomeStack