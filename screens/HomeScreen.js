import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useCallback, useState } from "react";
import { StatusBar } from "expo-status-bar";
import bg from "../assets/bg.webp";
import { theme } from "../theme";
import { debounce } from 'lodash';
import { MagnifyingGlassIcon,  } from "react-native-heroicons/outline";
import { CalendarDaysIcon, MapPinIcon } from 'react-native-heroicons/solid'
import { fetchlocation, fetchWeatherForecast } from "../api/weather";

export default function HomeScreen() {
  const [ showSearch, toggleSearch ] = useState(false);
  const [locations, setLocations] = useState([]);
  const [ weather, setWeather] = useState({})

  const handleLocation =  (loc) => {
    setLocations([]);
    toggleSearch(false);
    fetchWeatherForecast({
      cityName: loc.name,
      day: 7
    }).then(data => {
      setWeather(data)
      console.log('got ofreacst:', data);
    })
  }

  const handleSearch = value => {
    //fetch location
    if(value.length > 2) {
      fetchlocation( {cityName: value}).then( data => {
        setLocations(data)
      })
    }
    
  }

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), [])

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
                onChangeText={handleTextDebounce}
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
                            let borderClass = showBorder? 'border-b-2 border-b-gray-400' : ''
                            return (
                                <TouchableOpacity 
                                key={index}
                                onPress={() => handleLocation(loc)}
                                className={"flex-row item-center border-0 p-3 px-4 mb-1 "+borderClass}>
                                    <MapPinIcon size={20} color={'gray'} />
                                        <Text className="text-black text-lg ml-2">{loc?.name}, {loc?.country}</Text>
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
                {location?.name}, 
                <Text className="text-lg font-semibold text-gray-300">
                    {" " + location?.country}
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
                    {current?.temp_c}&#176;
                </Text>
                <Text className="text-center font-bold text-white text-xl tracking-widest">
                   {current?.condition?.text}
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
        {/* forecast for next days */}
        <View className="mb-2 space-y-3">
          <View className="flex-row items-center mx-5 space-x-2">
            <CalendarDaysIcon size="22" color="white" />
            <Text className="text-white text-base">Погода на неделю</Text>
          </View>
          <ScrollView
          horizontal
          contentContainerStyle={{paddingHorizontal: 15}}
          showsHorizontalScrollIndicator>
            <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4" style={{backgroundColor: theme.bgWhite(0.15)}}>
              <Image source={require('../assets/heavyrain.png')}
              className="h-11 w-11 " />
              <Text className="text-white">Понедельник</Text>
              <Text className="text-white text-xl font-semibold">-25&#176;</Text>
            </View>
            <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4" style={{backgroundColor: theme.bgWhite(0.15)}}>
              <Image source={require('../assets/heavyrain.png')}
              className="h-11 w-11 " />
              <Text className="text-white">Вторник</Text>
              <Text className="text-white text-xl font-semibold">-23&#176;</Text>
            </View>
            <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4" style={{backgroundColor: theme.bgWhite(0.15)}}>
              <Image source={require('../assets/heavyrain.png')}
              className="h-11 w-11 " />
              <Text className="text-white">Среда</Text>
              <Text className="text-white text-xl font-semibold">-20&#176;</Text>
            </View>
            <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4" style={{backgroundColor: theme.bgWhite(0.15)}}>
              <Image source={require('../assets/heavyrain.png')}
              className="h-11 w-11 " />
              <Text className="text-white">Четверг</Text>
              <Text className="text-white text-xl font-semibold">-16&#176;</Text>
            </View>
            <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4" style={{backgroundColor: theme.bgWhite(0.15)}}>
              <Image source={require('../assets/heavyrain.png')}
              className="h-11 w-11 " />
              <Text className="text-white">Пятница</Text>
              <Text className="text-white text-xl font-semibold">-10&#176;</Text>
            </View>
            <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4" style={{backgroundColor: theme.bgWhite(0.15)}}>
              <Image source={require('../assets/heavyrain.png')}
              className="h-11 w-11 " />
              <Text className="text-white">Суббота</Text>
              <Text className="text-white text-xl font-semibold">-12&#176;</Text>
            </View>
            <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4" style={{backgroundColor: theme.bgWhite(0.15)}}>
              <Image source={require('../assets/heavyrain.png')}
              className="h-11 w-11 " />
              <Text className="text-white">Воскресенье</Text>
              <Text className="text-white text-xl font-semibold">-5&#176;</Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}
