import React from 'react';
import styled from "styled-components/native";
import * as Styles from "@/styles";
import Colors from "@/styles/Colors";
import Images from "@/styles/Images";

function LogoImage() {
  return (
    <LogoMarkImage source={Images.logo.main} resize={"contain"}/>
  )
}

const LogoMarkImage = styled.Image`
  ${Styles.center};
  background-color: ${Colors.transparent};
  width: 200;
  height: 200;
`;

export default LogoImage;
