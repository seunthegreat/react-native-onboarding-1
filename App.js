import { StyleSheet, Text, View, FlatList, Dimensions, Image, TouchableOpacity } from 'react-native';
import React from 'react';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;


const data = [
 {
  key: 'first',
  image: require("./src/assets/Fast.png"),
  title: "Fast and Reliable",
  description: "xome thing goes here lll sle this and that"
 },
 {
  key: 'second',
  image: require("./src/assets/Security.png"),
  title: "101% Security",
  description: "xome thing goes here lll sle this and that"
 },
 {
  key: 'third',
  image: require("./src/assets/Transfer.png"),
  title: "Great to Have you!",
  description: "xome thing goes here lll sle this and that"
 },
];

const renderItem = ({item, index}) => {
  return(
    <View key={index} style={sliderContainer}>
      <Image style={imageStyle} source={item.image}/>
      <View style={contentStyle}>
        <Text style={titleStyle}>{item.title}</Text>
        <Text>{item.description}</Text>
      </View>
    </View>
  )
}

const sliderContainer = {
  width: width, 
  justifyContent:'center',
  alignItems:'center', 
}

const imageStyle = {
  width: width/1.2,
  height: height/2.5,
  resizeMode: "contain"
}

const contentStyle={
  alignItems:'center',
  marginTop: 35,
  width: width * 0.75,
}

const titleStyle = {
  marginBottom: 15,
  fontWeight: '700', 
  color:'black',
  fontSize: 22
}

const App = () => {
  return (
    <View style={{flex: 1, alignItems:'center'}}>
      <FlatList 
        data={data}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{flex: 0.7}}
      />
      <View style={{flex: 0.3, justifyContent:'center', alignItems:'center'}}>
        <TouchableOpacity style={buttonContainer}>
          <Text style={buttonStyle}>Create an account</Text>
        </TouchableOpacity>
        <View style={{flexDirection:"row", marginTop: 20}}>
          <Text style={{fontWeight: "400", fontSize:15}}>I have one.</Text>
          <Text style={{fontWeight: "700", fontSize:15, color:"#ed682c"}}> Log me In</Text>
        </View>
      </View>
      
    </View>
  )
}

export default App;

const buttonContainer = {
  backgroundColor:'#1e2fb6', 
  height: 88.91,
  width: 208,
  alignItems:'center',
  justifyContent:'center', 
  borderRadius: 27
}

const buttonStyle = {
  color:"white", 
  fontSize: 15 
}