import React from 'react';
import { useState,useEffect,useCallback } from 'react';
import { useRoute } from '@react-navigation/native';
import { Alert,Text,View, ScrollView, TouchableOpacity } from "react-native";
import { useMMKVString } from 'react-native-mmkv';
import YoutubePlayer from "react-native-youtube-iframe";
import Similar from './Similar';
import { useTranslation } from 'react-i18next';
import { VITE_BASE_URL } from '../../../env';


const Details = () => {
  
    const [contentData,setContentData]=useState({});
    const [playing,setPlaying]=useState(false);
    const {token,setToken}=useMMKVString("accessToken");
    const [viewMore,setViewMore]=useState(false);
    const [trailerKey,setTrailerKey]=useState("");
    const route=useRoute();
    const {id,type}=route.params
    const { t }=useTranslation()

    const onStateChange = useCallback((state) => {
      if (state === "ended") {
        setPlaying(false);
        Alert.alert("video has finished playing!");
      }
    }, []);
    
    const togglePlaying = useCallback(() => {
      setPlaying((prev) => !prev);
    }, []);

    const getContentDataById = async () => {
      const response=await fetch(`${VITE_BASE_URL}/${type}/${id}/details`,{
        headers:{"Accept":"application/json","Authorization":`Bearer ${token}`}});

      const data=await response.json();
      setContentData(data.content);
    }

    

    const getTrailersById=async()=>{

      const response=await fetch(`${VITE_BASE_URL}/${type}/${id}/trailers`,{headers:{"Accept":"application/json","Authorization":`Bearer ${token}`}});
      const data=await response.json();
      setTrailerKey(data.trailers[0].key);

    }

    useEffect(() => {
      getContentDataById()
      getTrailersById()
    }, [id,type])
    
  return (
    <ScrollView style={{paddingBottom:40}} className='bg-black'>
      <YoutubePlayer
        height={240}
        videoId={trailerKey}
        onChangeState={onStateChange}
        play={playing}
      />
      <View className='px-3'>
        <Text className='text-white text-3xl font-extrabold mb-2 mt-3'>{type==="tv"?contentData.name:contentData.title}</Text>
        <TouchableOpacity className="rounded-[4px] my-3 flex-row justify-center bg-white py-4 items-center gap-2" onPress={togglePlaying}>
            <Text className=' text-black font-extrabold text-lg'>{t("play")}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{
            setViewMore(prevState=>!prevState)
        }}>
            <Text className='text-white text-lg'>{!viewMore?contentData.overview?.substring(0,150): contentData.overview}<Text className='font-bold text-zinc-500'>{!viewMore ?`...${t("more")}`:""}</Text></Text>
        </TouchableOpacity>
        <Similar id={id} type={type}/>
      </View>
    </ScrollView>
    )
}

export default Details