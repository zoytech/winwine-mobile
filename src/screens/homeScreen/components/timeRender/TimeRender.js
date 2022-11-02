import {useEffect, useState} from 'react';
import {Text} from 'react-native';

export default function TimeRender() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(hours + ':' + min + ':' + sec);
  }, []);
  return <Text>{currentDate}</Text>;
}
