import React from 'react';
import {observer} from 'mobx-react';
import Container from '@/components/Container';
import {StyleSheet, View, ScrollView, Text, Platform} from 'react-native';
import __ from '@/assets/lang';
import BoardWithHeader from "@/components/Panel/BoardWithHeader";
import useViewModel from './methods';
import Space from '@/components/Space';
import {scale} from '@/styles/Sizes';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";

const ViewDoctor = (props) => {
  const vm = useViewModel(props);

  return (
    <Container>
      <BoardWithHeader title={__('terms_and_conditions')}>
        <ScrollView style={styles.container}>
          <Text style={styles.content}>
            {vm.content}
          </Text>
          <Space height={hp('15%')} />
        </ScrollView>
      </BoardWithHeader>
    </Container>
  )
};

const styles = StyleSheet.create({
  container: {
    width: wp('90%'),
    padding: hp('2%'),
    marginVertical: hp('2%'),
  },
  content: {
    fontSize: hp('2.4%'),
  }
});

export default observer(ViewDoctor);
