import { StyleSheet } from 'react-native'
import {Colors} from '@/constants/Colors'

export const globalStyles =  StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        height:100
    },
    text:{
        fontFamily:'DMSans'
    },
    button:{
        backgroundColor:'orange',
        paddingVertical:7
    }
})

export const lightStyles = StyleSheet.create({
    backgroundStyle:{
        backgroundColor:Colors.light.background
    },
    text:{
        color:Colors.light.text
    }
})

export const darkStyles = StyleSheet.create({
    backgroundStyle:{
        backgroundColor:Colors.dark.background
    },
    text:{
        color:Colors.dark.text
    }
})

