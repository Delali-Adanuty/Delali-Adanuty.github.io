import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useColorScheme } from 'react-native';
import { globalStyles, darkStyles, lightStyles } from '@/styles/globalStyles';
import AFFIRMATION_GALLERY from '@/constants/affirmation-gallery';
import GuidedAffirmationsGallery from '@/components/GuidedAffirmationsGallery';

const Affirmations = () => {
    const colorScheme = useColorScheme();
    const schemeStyle = colorScheme === 'dark' ? darkStyles : lightStyles;

  return (
    <View className='flex-1 py-10 px-6' style={[schemeStyle.backgroundStyle]}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <Text className='text-2xl py-3 mt-4' style={[schemeStyle.text, globalStyles.text]}>Change your beliefs with affirmations</Text>
            <View>
                {AFFIRMATION_GALLERY.map((g) => (
                    <GuidedAffirmationsGallery 
                    key={g.title} 
                    title={g.title} 
                    previews={g.data} />
                ))}
            </View>
        </ScrollView>
    </View>
  )
}

export default Affirmations

const styles = StyleSheet.create({})