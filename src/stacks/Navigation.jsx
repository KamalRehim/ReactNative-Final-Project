import { NavigationContainer } from '@react-navigation/native';
import { useMMKVString } from 'react-native-mmkv';
import TabStack from './TabStack';
import AuthStack from './AuthStack';

const Navigation = () => {
    const [accessToken, setAccessToken] = useMMKVString('accessToken')
    
    
    

    return (
        <NavigationContainer>
            {accessToken?<TabStack></TabStack>:<AuthStack></AuthStack>}
        </NavigationContainer>
    )


};
  
export default Navigation;

