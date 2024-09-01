import { StyleSheet, Text, View } from 'react-native'
import React, {useContext} from 'react';
import { globalStyles, lightStyles, darkStyles } from '@/styles/globalStyles';
import { useColorScheme } from 'react-native';
import CustomButton from '@/components/customButton'
import { router } from 'expo-router';
import { TimerContext } from '@/context/TimerContext';

const AdjustMeditationDuration = () => {
    const colorScheme = useColorScheme();
    const schemeStyle = colorScheme === 'dark' ? darkStyles : lightStyles;

    const {setDuration} = useContext(TimerContext);

    const handlePress =  (duration:number) => {
        setDuration(duration)
        router.back(); 
    }

  return (
    <View className='flex-1 relative' style={[schemeStyle.backgroundStyle]}>
        <View className='justify-center h-4/5'>
                <Text className='text-center text-2xl mb-8' style={[globalStyles.text, schemeStyle.text]}>Adjust your meditation duration</Text>
                <View className='px-5'>
                    <CustomButton 
                        title="10 seconds"
                        onPress={() => handlePress(10)}
                        containerStyles='mb-5'
                    />
                    <CustomButton 
                        title="5 minutes"
                        onPress={() => handlePress(5 * 60)}
                        containerStyles='mb-5'
                    />      
                    <CustomButton 
                        title="10 minutes"
                        onPress={() => handlePress(10 * 60)}
                        containerStyles='mb-5'
                    />       
                    <CustomButton 
                        title="15 minutes"
                        onPress={() => handlePress(15 * 60)}
                        containerStyles='mb-5'
                    />                                                             
                </View>
        </View>
    </View>
  )
}

export default AdjustMeditationDuration

const styles = StyleSheet.create({})