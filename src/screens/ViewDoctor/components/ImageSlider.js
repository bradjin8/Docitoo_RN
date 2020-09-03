import React from 'react';
import {observer} from 'mobx-react';
import Slideshow from 'react-native-image-slider-show';
import {StyleSheet} from 'react-native';
import useViewModel from './ImageSliderMethods';
import {scale, windowHeight} from '@/styles/Sizes';

const ImageSlider = (props) => {
  const vm = useViewModel(props);

  return (
    <Slideshow
      dataSource={vm.dataSource}
      position={vm.pos}
      onPositionChanged={(position) => {console.log(position); vm.setPos(position)}}
      containerStyle={styles.container}
      titleStyle={styles.title}
      captionStyle={styles.caption}
      overlay={false}
      height={windowHeight / 4}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 30 * scale,
  },
  title: {

  },
  caption: {

  }
});

export default observer(ImageSlider);
