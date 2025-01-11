import { useNavigation } from "@react-navigation/native"
import { TouchableOpacity } from "react-native"
import FastImage from "react-native-fast-image"

const ContentCard = ({ item,type }) => {

  const navigation = useNavigation();
  
  return (
  
    <TouchableOpacity onPress={()=>{navigation.navigate("Home",{params:{id:item.id,type:item.media_type?item.media_type:type},screen:"Details"})}}>

      <FastImage resizeMode={FastImage.resizeMode.contain} style={{width:100,height:150}} source={{uri:`https://image.tmdb.org/t/p/original/${item.poster_path}`,priority:item.media_type=="movie"?FastImage.priority.normal:FastImage.priority.low}}/>

    </TouchableOpacity>
  )


}





export default ContentCard