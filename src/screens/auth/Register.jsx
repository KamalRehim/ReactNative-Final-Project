import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { storage } from '../../utils/MMKVStore'
import { useTranslation } from 'react-i18next'
import NetflixIcon from "../../../assets/icons/netflixicon.svg"
import { VITE_BASE_URL } from '../../../env'


const Register = () => {
    const navigation = useNavigation()
    const [formData, setFormData] = useState({})
    const { t } = useTranslation()

    const handleInputChange = (name, text) => {setFormData(prevState => ({...prevState, [name]: text}))}

    const register = async () => {

      try {
        const response = await fetch(`${VITE_BASE_URL}/auth/signup`, {method: "POST",headers: {"Content-Type": "application/json","Accept": "application/json",},body: JSON.stringify(formData)})
        const data = await response.json()
        storage.set("username", data.user.username);
        navigation.navigate("Sign in")
      }
      catch(error) {
        console.error(error)
      }

      
    }

    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" contentContainerClassName='flex-1' className='bg-black'>
        <View className='mb-36 items-center'>
          <NetflixIcon/>
        </View>
        <View className='p-10 gap-5 relative'>

          <TextInput onChangeText={text=>{handleInputChange("email",text)}} placeholder={t("emailInput")} placeholderTextColor="#767676" className='border h-[50] bg-[#353236] pl-3' style={{color:"white"}}/>
          <TextInput onChangeText={text=>{handleInputChange("password",text)}} placeholder={t("passwordInput")} placeholderTextColor="#767676" className='border h-[50] bg-[#353236] pl-3' style={{color:"white"}}/>
          <TextInput onChangeText={text=>{handleInputChange("username",text)}} placeholder={t("usernameInput")} placeholderTextColor="#767676" className='border h-[50] bg-[#353236] pl-3' style={{color:"white"}}/>
          <TouchableOpacity onPress={register} className='bg-[#E50A14] py-5 rounded-lg'><Text className='text-white text-center'>{t("signup")}</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => {navigation.navigate("Sign in")}}><Text className='text-gray-400 text-center mt-4'>{t("signin")}</Text></TouchableOpacity>

        </View>

    </KeyboardAwareScrollView>

    )
}

export default Register