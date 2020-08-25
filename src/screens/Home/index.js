import React from 'react';
import useViewModel from './methods';
import {observer} from 'mobx-react';
import Container from '@/components/Container';
import BackgroundImage from '@/components/BackgroundImage';
import BackgroundMaskImage from '@/components/BackgroundMaskImage';
import Images from "@/styles/Images";

const Home = (props) => {
  const vm = useViewModel(props);

  return (
    <Container>
      <BackgroundImage source={Images.background.mask_bg} resizeMdoe="cover" />
      <BackgroundMaskImage source={Images.background.mask_gradient} resizeMdoe="cover" />
    </Container>
  )
};

export default observer(Home);
