import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';


function useViewModel(props) {
  const tag = 'Screens::ViewDoctor::ImageSlider';
  const nav = useNavigation(props);

  const [dataSource, setDataSource] = useState([]);
  const [pos, setPos] = useState(0);
  const [timeoutGoNext, setTimeoutGoNext] = useState(null);

  const goNext = () => {
    setPos(pos === dataSource.length - 1 ? 0 : pos + 1);
    // console.log(tag, 'goNext()', pos);
  };

  useEffect(() => {
    let isMounted = true;
    const _todo = () => {
      if (isMounted) {
        const timout = setTimeout(goNext, 2000);
        setTimeoutGoNext(timout);
      }
    };

    _todo();

    return () => {
      isMounted = false;
      if (timeoutGoNext != null) {
        clearTimeout(timeoutGoNext);
      }
    }

  }, [pos]);

  useEffect(() => {
    let isMounted = true; // flg for mounting

    const _todo = () => {
      if (isMounted) {
        let initDataSource = [];
        props.images.map((item, index) => {
          initDataSource.push({
            // title: 'Title ' + index,
            // caption: 'Caption ' + index,
            url: item,
          })
        });
        setDataSource(initDataSource);
      }
    };

    _todo();

    // Component Unmount, same as componentWillUnmount
    return () => {
      isMounted = false;
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
