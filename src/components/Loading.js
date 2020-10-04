import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {ActivityIndicator, View} from "react-native";
import Colors from "@/styles/Colors";
import React from "react";

function Loading() {
  return (
    <View style={{height: hp('90%'), flexDirection: 'column', justifyContent: 'center'}}>
      <ActivityIndicator size={"large"} color={Colors.blue1}/>
    </View>
  )
}

export default Loading;
