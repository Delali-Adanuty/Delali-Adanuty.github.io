import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
import { globalStyles, lightStyles, darkStyles} from '@/styles/globalStyles';

interface CustomButtonProps{
    onPress:() => void;
    title:string;
    textStyles?:string;
    containerStyles?: string;
}

const CustomButton = ({onPress, title, textStyles = "", containerStyles=""}: CustomButtonProps) => {
  return (
    <TouchableOpacity
     activeOpacity={0.7}
     className={`bg-green rounded-l rounded-r min-h[62px] justify-center items-center px-6 ${containerStyles}`
        }
     style={globalStyles.button}
     onPress={onPress}
     >
      <Text className={`text-2xl ${textStyles}`} style={globalStyles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({})