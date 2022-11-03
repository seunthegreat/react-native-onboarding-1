import { Text, View, Dimensions, Image, TouchableOpacity, Animated } from 'react-native';
import React, {useState, useRef, useEffect} from 'react';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const data = [
 {
  key: 'first',
  image: require("./src/assets/images/Fast.png"),
  Heading: "Fast and Reliable",
  description: "xome thing goes here lll sle this and that"
 },
 {
  key: 'second',
  image: require("./src/assets/images/Security.png"),
  Heading: "101% Security",
  description: "xome thing goes here lll sle this and that"
 },
 {
  key: 'third',
  image: require("./src/assets/images/Transfer.png"),
  Heading: "Great to Have you!",
  description: "xome thing goes here lll sle this and that"
 },
];

const nextArrowIcon = require("./src/assets/icons/Next.png");

const RenderItem = ({item, index, scrollX}) => {

  const inputRange = [(index - 1) * width, index * width, (index + 1) * width]; //--> prev, current, next slide
  const inputRangeOpacity = [(index - 0.5) * width, index * width, (index + 0.5) * width]; //--> prev, current, next slide
  const scale = scrollX.interpolate({
    inputRange, 
    outputRange: [0, 1, 0]
  });

  //--Heading animation--//
  const translateXHeading = scrollX.interpolate({
    inputRange, 
    outputRange: [width * 0.2, 0, -width * 0.2],
  });

  const translateXDescription = scrollX.interpolate({
    inputRange, 
    outputRange: [width * 0.6, 0, -width * 0.6],
  });

  const opacity = scrollX.interpolate({
    inputRange: inputRangeOpacity,
    outputRange: [ 0, 1, 0]
  });
  return(
    <Animated.View key={index} style={sliderContainer}>
      <Animated.Image style={[imageStyle, {
        transform: [{ scale }]
      }]} source={item.image}/>
      <View style={contentStyle}>
        <Animated.Text style={[HeadingStyle, 
        {
          opacity,
          transform: [{translateX: translateXHeading}]
        }
        ]}>{item.Heading}</Animated.Text>
        <Animated.Text style={[{
          opacity,
          transform: [ {translateX: translateXDescription}]
        }]}>{item.description}</Animated.Text>
      </View>
    </Animated.View>
  )
}

const sliderContainer = {
  width: width, 
  justifyContent:'center',
  alignItems:'center', 
}

const imageStyle = {
  width: width,
  height: height/2.5,
  resizeMode: "contain"
}

const contentStyle={
  alignItems:'center',
  marginTop: 35,
  width: width * 0.75,
}

const HeadingStyle = {
  marginBottom: 15,
  fontWeight: '700', 
  color:'black',
  fontSize: 22
}

const App = () => {

  //--Constants for animation--//
  const scrollX = React.useRef(new Animated.Value(0)).current; 

   //--State--//
  const [index, setIndex] = useState(0);
  const ref = useRef();

  const handleNext = () => {
    ref?.current?.scrollToOffset({
      offset: (index + 1) * width, 
      animated: true
    })
    setIndex(index+1);
  };

  // useEffect(() => {
  //   console.log(index);
  // }, [index]);

  return (
    <View style={{flex: 1, alignItems:'center'}}>
      <View style={{flex: 0.7}}>
      <Animated.FlatList 
        ref={ref}
        data={data}
        keyExtractor={(item) => item.key}
        renderItem={({item, index}) => <RenderItem item={item} index={index} scrollX={scrollX}/>}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={ Animated.event(
          [{ nativeEvent: {contentOffset: {x: scrollX}}}],
          { useNativeDriver: true}
        )}
        scrollEventThrottle={16}
        onMomentumScrollEnd={ev => {
          setIndex(Math.floor(ev.nativeEvent.contentOffset.x/width))
        }}
      />
      </View>
      <View style={{flex: 0.3, justifyContent:'center', alignItems:'center'}}>
        { index == 2 && (
          <View style ={{justifyContent:'center', alignItems:'center'}}>
            <TouchableOpacity style={buttonContainer} onPress={handleNext} >
              <Text style={buttonStyle}>Create an account</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <Text style={{ fontWeight: "400", fontSize: 15 }}>I have one.</Text>
              <Text style={{ fontWeight: "700", fontSize: 15, color: "#ed682c" }}> Log me In</Text>
            </View>
          </View>
          ) 
        }

        { index < 2 &&  <TouchableOpacity style={buttonIconContainer} onPress={handleNext} >
            <Image source={nextArrowIcon} style={{height: 22.7, width: 22.7}}/>
        </TouchableOpacity> }
      
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

const buttonIconContainer = {
  height: 80,
  width: 80, 
  borderRadius: 80,
  backgroundColor:'#1e2fb6', 
  justifyContent:'center',
  alignItems:"center"
}

const buttonStyle = {
  color:"white", 
  fontSize: 15 
}