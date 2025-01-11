import { Text, TouchableOpacity, View, Image } from 'react-native';
import { storage } from '../../utils/MMKVStore';
import { useState, useEffect } from 'react';
import { VITE_BASE_URL } from '../../../env';
import { useTranslation } from 'react-i18next';

const Profile = () => {
    const { t }=useTranslation();
    const [username, setUsername] = useState('');

    useEffect(() => {
        setUsername(storage.getString('username') || "");
    }, []);


    const Logout = async() => {
        const response=await fetch(`${VITE_BASE_URL}/auth/logout`,{headers:{"Content-Type": "application/json","Accept": "application/json"}});
        storage.set("firstTimeUser",false)
        storage.delete("accessToken")        
    }

    return (
        <View className='flex-1 bg-black p-4 items-center justify-center'>
            <View className='items-center mt-10'>
                <Text className=' text-white font-bold text-4xl mt-4'>
                    {t("usernameInput")}:{username}
                </Text>
            </View>
            <TouchableOpacity onPress={Logout} className='bg-[#E50A14] mt-10 py-3 w-28'><Text className='text-white text-center font-bold text-xl'>{t("logout")}</Text></TouchableOpacity>
        </View>
    );
};

export default Profile;