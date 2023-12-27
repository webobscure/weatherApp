import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import bg from "../assets/bg.webp";
import { theme } from "../theme";

import { MagnifyingGlassIcon,  } from "react-native-heroicons/outline";
import { MapPinIcon } from 'react-native-heroicons/solid'

export default function HomeScreen() {
  const [ showSearch, toggleSearch ] = useState(false);
  const [locations, setLocations] = useState([1, 2, 3]);

  const handleLocation =  (loc) => {
    console.log('location:', loc)
  }
  return (
    <View className="flex-1 relative ">
      <StatusBar style="light" />
      <Image blurRadius={10} source={bg} className="absolute h-full w-full" />
      <SafeAreaView className="flex flex-1">
        <View style={{ height: "7%" }} className="mx-4 relative z-50">
          <View
            className="flex-row justife-end items-center rounded-full"
            style={{ backgroundColor: showSearch ? theme.bgWhite(0.2) : 'transparent' }}
          >
            {showSearch ? (
              <TextInput
                placeholder="Найти город"
                placeholderTextColor={"lightgray"}
                className="pl-6 h-10 flex-1 text-base text-white "
              />
            ) : null}

            <TouchableOpacity
              style={{ backgroundColor: theme.bgWhite(0.3) }}
              className="rounded-full p-3 m-1"
              onPress={() => toggleSearch(!showSearch)}
            >
              <MagnifyingGlassIcon size={25} color="white" />
            </TouchableOpacity>
          </View>
          {
            locations.length > 0 && showSearch? (
                <View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
                    {
                        locations.map((loc, index) => {
                            let showBorder = index+1 != locations.length;
                            let borderClass = showBorder? 'border-b-2 border-b-gray' : ''
                            return (
                                <TouchableOpacity 
                                key={index}
                                onPress={() => handleLocation(loc)}
                                className={"flex-row item-center border-0 p-3 px-4 mb-1 "+borderClass}>
                                    <MapPinIcon size={20} color={'gray'} />
                                        <Text className="text-black text-lg ml-2">Санкт-Петербург</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            ) : null
          }
        </View>
        {/* forecast section */}
        <View className="mx-4 flex justify-around flex-1 mb-2">
            {/*location */}
            <Text className="text-white text-center text-2xl font-bold">
                Санкт-Петербург, 
                <Text className="text-lg font-semibold text-gray-300">
                    Россия
                </Text>
            </Text>
            {/* weather image */}
            <View className="flex-row justify-center">
                <Image source={require('../assets/snowflake.png')}
                className="w-52 h-52" />
            </View>
            { /* degree celcius*/}
            <View className="space-y-2">
                <Text className="text-center font-bold text-white text-6xl ml-5">
                    -20&#176;
                </Text>
                <Text className="text-center font-bold text-white text-xl tracking-widest">
                    Снег с осадками
                </Text>
            </View>
            {/*other stats */}
            <View className="flex-row justify-between mx-4">
                <View className="flex-row space-x-2 items-center">
                    <Image source={require('../assets/wind.png')} className="h-6 w-6"/>
                    <Text className="text-white font-semibold text-base">
                        22км
                    </Text>
                </View>
                <View className="flex-row space-x-2 items-center">
                    <Image source={require('../assets/drop.png')} className="h-6 w-6"/>
                    <Text className="text-white font-semibold text-base">
                        23%
                    </Text>
                </View>
                <View className="flex-row space-x-2 items-center">
                    <Image source={require('../assets/icons/sun.png')} className="h-6 w-6"/>
                    <Text className="text-white font-semibold text-base">
                        21:37
                    </Text>
                </View>
            </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
