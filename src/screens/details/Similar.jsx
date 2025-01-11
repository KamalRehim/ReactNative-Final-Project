import { useState, useEffect } from 'react'
import { useMMKVString } from 'react-native-mmkv';
import { Text, View, FlatList} from 'react-native'
import ContentCard from '../../common/ContentCard';
import { useTranslation } from 'react-i18next';
import { VITE_BASE_URL } from '../../../env';

const Similar = ({id,type}) => {

  const {token,setToken}=useMMKVString("accessToken");
  const { t }=useTranslation()
  const [contentData,setContentData]=useState({});
  

    const getSimilarContentById=async()=>{
      const response=await fetch(`${VITE_BASE_URL}/${type}/${id}/similar`,{headers:{"Accept":"application/json","Authorization":`Bearer ${token}`}});
      const data=await response.json();
      setContentData(data.similar)
    }

    useEffect(() => {
      getSimilarContentById()
    }, [id,type])


    const NoItemsFound = () => {
      <View className='w-full h-full justify-center items-center'>
        <Text>{t("noitemsfound")}</Text>
      </View>
    }



  return (
    <View>
      <Text className='text-white text-xl mt-3 mb-3'>{t("similar")} {type==="movie"?`${t("movies")}`:`${t("shows")}`}</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={NoItemsFound}
        contentContainerStyle={{ gap: 8,paddingHorizontal:8}}
        data={contentData}
        horizontal
        renderItem={({ item }) => <ContentCard item={item} type={type}/>} />
    </View>
  )
}

export default Similar  