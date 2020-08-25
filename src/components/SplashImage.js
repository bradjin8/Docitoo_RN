import React from 'react';
import Images from '@/styles/Images';
import BackgroundImage from './BackgroundImage';

function SplashImage() {

  return (
    <BackgroundImage source={Images.background.splashBg} resizeMdoe="cover" />
  );
}


export default SplashImage;
