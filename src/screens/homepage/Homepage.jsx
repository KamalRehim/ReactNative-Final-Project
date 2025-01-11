import React from 'react'
import { ScrollView } from 'react-native'
import Poster from './Poster'
import ContentList from '../../common/ContentList'

const Homepage = () => {
  return (
    <ScrollView contentContainerStyle={{paddingBottom:20}} className='flex-1 bg-black'>
      <Poster/>
      <ContentList searchTerm="" type="movie"/>
      <ContentList searchTerm="" type="tv"/>
    </ScrollView>
  )
}

export default Homepage