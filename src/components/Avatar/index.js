import React from 'react';
import styled from 'styled-components/native';
import Images from '@/styles/Images';
import Sizes from '@/styles/Sizes';

const Avatar = ({style, onPress, size, source}) => {
  const _size = size || Sizes.avatar;
  return (
    <Container style={style} onPress={onPress} size={_size}>
      <Image
        source={source}
        size={_size}
        defaultSource={Images.placeholder.avatarDefault}
        resizeMode={'cover'}
      />
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => props.size}px;
  overflow: hidden;
  background-color: grey;
`;

const Image = styled.Image`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => props.size / 2}px;
  overflow: hidden;
`;

export default Avatar;
