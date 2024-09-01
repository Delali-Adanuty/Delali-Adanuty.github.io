import { FlatList, StyleSheet, Text, View, Pressable, ImageBackground } from 'react-native'
import React from 'react'
import { globalStyles, lightStyles, darkStyles } from '@/styles/globalStyles';
import { useColorScheme } from 'react-native';

import {MEDITATION_DATA} from '@/constants/MeditationData';
import MEDITATION_IMAGES from '@/constants/meditation-images';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const NatureMeditate = () => {
  const colorScheme = useColorScheme();
  const schemeStyle = colorScheme === 'dark' ? darkStyles : lightStyles;

  return (
    <View className='flex-1' style={schemeStyle.backgroundStyle}>
      <View className='mb-6 mt-6 px-6 py-8'>
          <Text className='text-3xl text-left mb-3' style={[globalStyles.text, schemeStyle.text]}>Welcome!</Text>
          <Text className='text-xl' style={[globalStyles.text, schemeStyle.text]}>
              Start your meditation practice today
          </Text>
      </View>
      <View className='mb-20'>
          <FlatList
              data={MEDITATION_DATA}
              className='mb-20'
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <Pressable 
                 onPress={ () => router.push(`/meditate/${item.id}`)}
                 className='h-48 my-3 rounded-md overflow-hidden px-6'
                >
                  
                  <ImageBackground 
                   source={MEDITATION_IMAGES[item.id - 1]}
                   resizeMode = "cover"
                   className='flex-1 rounded-md justify-center'
                  >
                    <LinearGradient 
                    colors={["transparent", "rgba(0, 0, 0, 0.8)"]}
                    className='flex-1 justify-center items-center'
                    >
                      <Text className='text-gray-100 text-3xl text-center' style={[globalStyles.text]}>{item.title}</Text>
                    </LinearGradient>
                  </ImageBackground>
                </Pressable>
              )}
          />
      </View>
    </View>
  )
}

export default NatureMeditate

const styles = StyleSheet.create({})