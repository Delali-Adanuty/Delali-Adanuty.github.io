import { StyleSheet, Text, View, ScrollView, ImageBackground } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useLocalSearchParams } from 'expo-router';
import { GalleryPreviewData } from '@/constants/models/AffrmationCategory';
import AFFIRMATION_GALLERY from '@/constants/affirmation-gallery';
import { globalStyles, darkStyles, lightStyles } from '@/styles/globalStyles';
import { useColorScheme } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const AffirmationPractice = () => {
    const colorScheme = useColorScheme();
    const schemeStyle = colorScheme === 'dark' ? darkStyles : lightStyles;

    const [sentences, setSentences] = useState<string[]>([]);

    const {itemId} = useLocalSearchParams();

    const [affirmation, setAffirmation] = useState<GalleryPreviewData>();

    useEffect(() => {
        for (let idx = 0; idx < AFFIRMATION_GALLERY.length; idx++){
            const affirmationsData = AFFIRMATION_GALLERY[idx].data;
            const affirmationToStart = affirmationsData.find(
                (a) => a.id === Number(itemId)
            );
            if (affirmationToStart){
                setAffirmation(affirmationToStart)
                const affirmationsArray = affirmationToStart.text.split('.');
                 
                //Remove the last element if it's an empty string
                if (affirmationsArray[affirmationsArray.length - 1] === ''){
                    affirmationsArray.pop();
                }

                setSentences(affirmationsArray);

                return;
            }
        }
    }, [])

  return (
        <View style={[schemeStyle.backgroundStyle]} className='flex-1'>
            <ImageBackground
                source={affirmation?.image}
                resizeMode='cover'
                className='flex-1'
            >
                <LinearGradient 
                    colors={["rgba(0, 0, 0, 0.5)", "rgba(0, 0, 0, 0.8)"]}
                    className='flex-1 justify-center items-center'
                    >
                    <ScrollView className='mt-20' showsVerticalScrollIndicator={false}>
                        <View className='h-full justify-center'>
                                <View className='h-4/5 justify-center'>
                                {sentences.map((sentence, idx) => (
                                    <Text key={idx} className='text-2xl mb-12 text-center mx-6 text-white' style={[globalStyles.text]}>{sentence}.</Text>
                                ))}
                                </View>
                        </View>
                    </ScrollView>
                </LinearGradient>
            </ImageBackground>

        </View>
  )
}

export default AffirmationPractice

const styles = StyleSheet.create({})