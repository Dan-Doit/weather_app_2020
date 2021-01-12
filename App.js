import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Loding from './Loding'
import * as Location from 'expo-location';
import {Alert} from 'react-native';
import axios from 'axios';
import Weather from './Weather';

const API_KEY = "d145f8eeda2e368a59d2809a852426c4";

export default class extends React.Component {

  state = {
    isLoding : true
  }

  getLocation = async() => {

    try {
      await Location.requestPermissionsAsync();
      const {coords:{latitude,longitude}} = await Location.getCurrentPositionAsync();
      console.log(latitude,longitude);
      const {data:{main:{temp},weather}} = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
      this.setState({temp,weather : weather[0].main});
      this.setState({isLoding : false});
    } catch (error) {
      Alert.alert("We can't find you","So sad mate");
    }
  }

  componentDidMount(){
    this.getLocation();
  }
  render(){

    const {isLoding,temp,weather} = this.state;

    return (
      isLoding ? <Loding /> : <Weather temp={Math.round(temp)} condition={weather} />
     );
    }
  }


