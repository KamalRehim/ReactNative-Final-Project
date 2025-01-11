import { View, Text } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'

const ActorItem = ({item}) => {
  return (
    <View>
        <FastImage
        style={{ width: 125, height: 125,borderRadius:100 }}
        source={{uri:item.profile_path? `https://image.tmdb.org/t/p/original/${item.profile_path}` :"",priority: FastImage.priority.normal}}
        resizeMode={FastImage.resizeMode.cover}
    />
    <Text className='text-white text-center text-xl'>{item.name}</Text>
    </View>
  )
}

export default ActorItem