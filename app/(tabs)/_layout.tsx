import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Tabs} from "expo-router";
import {Colors} from '@/constants/Colors'
import { globalStyles, lightStyles, darkStyles } from '@/styles/globalStyles';
import { useColorScheme } from 'react-native';
import {MaterialCommunityIcons, Feather} from '@expo/vector-icons';


const TabsLayout = () => {
    const colorScheme = useColorScheme();
    const schemeStyle = colorScheme === 'dark' ? darkStyles : lightStyles;
  return (
        <Tabs screenOptions={{headerShown:false, tabBarActiveTintColor: Colors.primary, tabBarStyle:schemeStyle.backgroundStyle}}>
                <Tabs.Screen
                    name= "natureMeditate"
                    options = {{
                        tabBarLabel: ({color}) => (
                            <Text style={{...globalStyles.text, color:color}}>Meditation</Text>
                        ),
                        tabBarIcon: ({color}) => (
                            <MaterialCommunityIcons name="flower-tulip" size={24} color={color} />
                        )
                    }}
                />
                <Tabs.Screen
                    name= "affirmations"
                    options = {{
                        tabBarLabel: ({color}) => (
                            <Text style={{...globalStyles.text, color:color}}>Affirmations</Text>
                        ),
                        tabBarIcon: ({color}) => (
                            <Feather name="book-open" size={24} color={color} />
                        )
                    }}
                />                
        </Tabs>
  )
}

export default TabsLayout

const styles = StyleSheet.create({})