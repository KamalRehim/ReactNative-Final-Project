import { useState, useEffect } from 'react'
import { Text, View, FlatList } from 'react-native'
import ContentCard from './ContentCard'
import { useTranslation } from 'react-i18next'
import { VITE_BASE_URL } from '../../env'

const ContentList = ({searchTerm,type}) => {

  const [contentData, setContentData] = useState([])
  const { t } = useTranslation();

  const getContentData = async () => {
    const response = await fetch(searchTerm ? `${VITE_BASE_URL}/search/${type}/${searchTerm}`:`${VITE_BASE_URL}/${type}/trending`)
    const data = await response.json()
    setContentData(data.content);
  }


  useEffect(() => {
    getContentData();
  }, [searchTerm,type])


  const NoItemsFound = () => {
    <View className='w-full h-full justify-center items-center'>
      <Text>{t("noitemsfound")}</Text>
    </View>
  }

  


  return (
    <View>
        <Text className='text-white text-xl ml-2 mb-2'>{searchTerm?`${t("resultsfor")}`+` ${type==="tv"?t("shows"):t("movies")}`:type==="movie" ?`${t("trendingmovies")}`:`${t("trendingshows")}`}</Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={NoItemsFound}
          contentContainerStyle={{ gap: 8,paddingHorizontal:8}}
          data={contentData}
          horizontal
          renderItem={({ item }) => <ContentCard item={item} type={type} /> } 
        />
    </View>
  )
}


export default ContentList  