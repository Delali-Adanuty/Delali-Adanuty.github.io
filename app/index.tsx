import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import {globalStyles, lightStyles, darkStyles} from '@/styles/globalStyles';
import {View, Text, ImageBackground, SafeAreaView} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import CustomButton from '@/components/customButton';

import { useColorScheme } from '@/hooks/useColorScheme';
import {useRouter} from "expo-router"

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter()
  const colorScheme = useColorScheme();
  const schemeStyle = colorScheme === 'dark' ? darkStyles : lightStyles;

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    DMSans: require('../assets/fonts/DMSans-Regular.ttf')
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <View className = "flex-1" style={schemeStyle.backgroundStyle}>
        <SafeAreaView className='flex-1 mx-5 justify-between'>
          <View>
            <Text className='text-center  text-3xl' style={[globalStyles.text, schemeStyle.text]}>
              Simple Meditation
            </Text>
            <Text className='text-center text-2xl mt-3' style={[globalStyles.text, schemeStyle.text]}>
              Simplifying Meditation for Everyone
            </Text>
          </View>

            <View>
              <CustomButton 
              onPress={() => router.push("/natureMeditate")}
              title="Get Started"
              />
            </View>
        </SafeAreaView>
    </View>
  );
}

