import { View, Text } from 'react-native'
import React from 'react'
import { useState,useEffect } from 'react'
import { useMMKVString } from 'react-native-mmkv'
import ActorItem from './ActorItem'
import { FlatList } from 'react-native'
import { useTranslation } from 'react-i18next'
import { VITE_BASE_URL } from '../../../env'

const Actors = ({searchTerm}) => {
    const{token,setToken}=useMMKVString("accessToken");
    const [actorData,setActorData]=useState([]);
    const { t }=useTranslation()

    const getActorData=async()=>{
        const response=await fetch(`${VITE_BASE_URL}/search/person/${searchTerm}`,{headers:{Authorization:`Bearer ${token}`,Accept:"application/json"}})
        const data=await response.json();
        setActorData(data.content);
    }

    const NoItemsFound = () => {
        <View className='w-full h-full justify-center items-center'>
          <Text>{t("noitemsfound")}</Text>
        </View>
    }


    useEffect(() => {
      searchTerm&& getActorData()
    }, [searchTerm])
    

    return (
        <View className='mt-6'>
        
              <Text className='text-white text-2xl ml-2 mb-2'>{t("actors")}</Text>
              <FlatList
                showsHorizontalScrollIndicator={false}
                ListEmptyComponent={NoItemsFound}
                contentContainerStyle={{ gap: 8,paddingHorizontal:8}}
                data={actorData}
                horizontal
                renderItem={({ item }) => <ActorItem item={item}/>} />
            </View>
    )
}

export default Actors