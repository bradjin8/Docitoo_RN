import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const tag = 'Screens::ViewDoctor::ImageSlider';

function useViewModel(props) {
  const nav = useNavigation();

  const [dataSource, setDataSource] = useState([]);
  const [pos, setPos] = useState(0);

  const goNext = () => {
    setPos(pos === dataSource.length - 1 ? 0 : pos + 1);
    // console.log(tag, 'goNext()', pos);
  };

  useEffect(()=> {
    setTimeout(goNext, 2000);
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
    }
  }, []);

  return {
    dataSource, setDataSource,
    pos, setPos,
  }
}

export default useViewModel;
