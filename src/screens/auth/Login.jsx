import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { storage } from '../../utils/MMKVStore'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useTranslation } from 'react-i18next'
import NetflixIcon from "../../../assets/icons/netflixicon.svg"
import { VITE_BASE_URL } from '../../../env'

const Login = () => {
  const navigation = useNavigation()
  const [formData, setFormData] = useState({})
  const { t }=useTranslation();

  const handleInputChange = (name, text) => {
    setFormData(prevState => ({...prevState, [name]: text}))
  }

  const login = async () => {
    
    const response = await fetch(`${VITE_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {"Content-Type": "application/json","Accept": "application/json",},
      body: JSON.stringify(formData)
    })
    const data = await response.json()
    storage.set("accessToken", data.token)

  }

  return (
    
    
    
    <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" contentContainerClassName='flex-1' className='bg-black'>
      <View className='mb-36 items-center'>
        <NetflixIcon/>
      </View>
      <View className='p-10 gap-5 relative'>
        <TextInput onChangeText={text=>{handleInputChange("email",text)}} placeholder={t("emailInput")} placeholderTextColor="#767676" className='border h-[50] bg-[#353236] pl-3' style={{color:"white"}}/>
        <TextInput onChangeText={text=>{handleInputChange("password",text)}} placeholder={t("passwordInput")} placeholderTextColor="#767676" className='border h-[50] bg-[#353236] pl-3' style={{color:"white"}}/>
        <TouchableOpacity onPress={login} className='bg-[#E50A14] py-5 rounded-lg'><Text className='text-white text-center'>{t("signin")}</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.navigate("Sign up")}}><Text className='text-gray-400 text-center mt-4'>{t("signup")}</Text></TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>



  )
}


export default Login