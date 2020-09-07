import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';


function useViewModel(props) {
  const tag = 'Screens::ViewDoctor::ImageSlider';
  const nav = useNavigation();

  const [dataSource, setDataSource] = useState([]);
  const [pos, setPos] = useState(0);
  const [timeoutGoNext, setTimeoutGoNext] = useState(null);

  const goNext = () => {
    setPos(pos === dataSource.length - 1 ? 0 : pos + 1);
    // console.log(tag, 'goNext()', pos);
  };

  useEffect(()=> {
    const timout = setTimeout(goNext, 2000);
    setTimeoutGoNext(timout);
    return () => {
      if (timeoutGoNext != null) {
        clearTimeout(timeoutGoNext);
      }
    }
  }, [pos]);

  useEffect(() => {
    let initDataSource = [];
    props.images.map((item, index) => {
      initDataSource.push({
        // title: 'Title ' + index,
        // caption: 'Caption ' + index,
        url: item,
      })
    });
    setDataSource(initDataSource);

    // Component Unmount, same as componentWillUnmount
    return () => {
      if (timeoutGoNext != null) {
        clearTimeout(timeoutGoNext);
      }
    }
  }, []);

  return {
    dataSource, setDataSource,
    pos, setPos,
  }
}

export default useViewModel;
