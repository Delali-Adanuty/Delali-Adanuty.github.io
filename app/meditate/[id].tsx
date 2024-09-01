import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState, useContext} from 'react';
import { globalStyles, lightStyles, darkStyles } from '@/styles/globalStyles';
import { useColorScheme } from 'react-native';
import meditationImages from '@/constants/meditation-images';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import {Colors} from '@/constants/Colors';
import CustomButton from '@/components/customButton';
import {Audio} from 'expo-av';
import { MEDITATION_DATA, AUDIO_FILES } from '@/constants/MeditationData';
import { TimerContext } from '@/context/TimerContext';

const Meditate = () => {
    const colorScheme = useColorScheme();
    const schemeStyle = colorScheme === 'dark' ? darkStyles : lightStyles;
    const  current = useContext(TimerContext).duration
    const [currentDuration, setCurrentDuration] = useState(() => current)
    const [buttonContent, setButtonContent] = useState('Start Meditation')
    

    const { id } = useLocalSearchParams(); 
    const [secondsRemaining, setSecondsRemaining] = useState(10);
    const [isMeditating, setIsMeditating] = useState(false);
    const [audioSound, setSound] = useState<Audio.Sound>(); 
    const [isPlayingAudio, setPlayingAudio] = useState(false);

    useEffect(() => {
      setCurrentDuration(current)
      setSecondsRemaining(currentDuration)
    }, [current])

    useEffect(() => {
      if (isMeditating == true){
        setButtonContent('Stop')
      }else{
        setButtonContent('Start Meditation')
      }
    }, [isMeditating])

    useEffect(() => {
      if (currentDuration !== secondsRemaining) {
        setSecondsRemaining(currentDuration);
      }
    }, [currentDuration]);

    useEffect(() => {
        let timerId: NodeJS.Timeout;

        if (secondsRemaining == 0){
          setIsMeditating(false)
          return;
        }
        if (isMeditating){
          
          timerId = setTimeout(() => {
            setSecondsRemaining(secondsRemaining-1)
          }, 1000)
        }



        return () => {
          clearTimeout(timerId)
        }
    }, [secondsRemaining, isMeditating])


    const toggleMeditationSessionStatus = async () => {
       if(secondsRemaining === 0 ){
        setSecondsRemaining(10)
       }

       setIsMeditating(!isMeditating);

       await toggleSound();
    }


    const toggleSound = async () => {
      const sound = audioSound ? audioSound : await initializeSound()

      const status =  await sound?.getStatusAsync();

      if (status?.isLoaded  && !isPlayingAudio){
        await sound.playAsync()
        setPlayingAudio(true)
      }else{
        await sound.pauseAsync()
        setPlayingAudio(false)
      }
    } 

    const initializeSound = async () => {
      const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;
  
      const {sound} = await Audio.Sound.createAsync(
        AUDIO_FILES[audioFileName]
      );

      setSound(sound);
      return sound
    }

  const handleAdjustDuration = () => {
    if (isMeditating) toggleMeditationSessionStatus();

    router.push("/(modal)/adjust-meditation-duration")
  }

    const formattedTimeMinutes = String(
      Math.floor(secondsRemaining/60)
    ).padStart(2, "0");

    const formattedTimeSeconds = String(
      secondsRemaining % 60
    ).padStart(2, "0");


  return (
    <View style={[schemeStyle.backgroundStyle]} className='flex-1'>
        <ImageBackground source={meditationImages[Number(id) - 1]} resizeMode='cover' className='flex-1'>
        <LinearGradient 
                colors={["rgba(0, 0, 0, 0.5)", "rgba(0, 0, 0, 0.8)"]}
                className='flex-1 justify-center items-center'
            >
                <View className='w-full px-4'>
                    <View className='mx-auto bg-neutral-200 rounded w-full justify-center items-start py-4 px-2'>
                      <Text className='text-3xl' style={{...globalStyles.text, color:Colors.primary}}>
                        {formattedTimeMinutes}:{formattedTimeSeconds}
                        </Text>
                    </View>
                </View>

                <View className='mb-5 mt-5'>
                    <CustomButton
                      title="Adjust Duration"
                      onPress={handleAdjustDuration}
                    />
                    <CustomButton
                      title={buttonContent}
                      onPress={toggleMeditationSessionStatus}
                      containerStyles='mt-4'
                    />                    
                </View>
        </LinearGradient>            
        </ImageBackground>
      
    </View>
  )
}

export default Meditate

const styles = StyleSheet.create({})