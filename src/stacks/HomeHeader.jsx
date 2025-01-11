import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import ScreenCast from "../../assets/icons/screencast.svg"
import Search from "../../assets/icons/search.svg"
import { useMMKVString } from 'react-native-mmkv'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const HomeHeader = () => {

  const { t }=useTranslation();
  const [username]=useMMKVString("username");
  const navigation=useNavigation();

  return (
    <View className='w-full flex-row justify-between items-center p-3 py-2 bg-black'>
      <Text className='text-4xl text-white font-extrabold p-2'>{t("for")} {username}</Text>

      <View className='flex-row items-center gap-4'>
      <TouchableOpacity>
        <ScreenCast/>
      </TouchableOpacity>

      
      <TouchableOpacity onPress={()=>{
        navigation.navigate("Search",{screen:"Screen"})}}>
        <Search/>
      </TouchableOpacity>
      </View>
    </View>
  )
}

export default HomeHeader