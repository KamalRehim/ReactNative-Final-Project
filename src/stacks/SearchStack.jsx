import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from '../screens/search/Search';

const Stack = createNativeStackNavigator()

const SearchStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Search Page" component={Search} />
        </Stack.Navigator>
    )
}

export default SearchStack