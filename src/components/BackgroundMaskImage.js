import styled from "styled-components/native";
import * as Styles from "@/styles";
import Colors from "@/styles/Colors";
import {Platform} from 'react-native';

const BackgroundMaskImage = Platform.OS === 'ios' ? styled.Image`
  ${Styles.background_image};
  background-color: ${Colors.turquoise};
  opacity: 0.8;
` : styled.Image`
  ${Styles.background_image};
  background-color: ${Colors.turquoise};
  opacity: 0.6;
`;

export default BackgroundMaskImage;
