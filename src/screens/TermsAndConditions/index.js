import React from 'react';
import {observer} from 'mobx-react';
import Container from '@/components/Container';
import {StyleSheet, View, ScrollView, Text, Platform} from 'react-native';
import __ from '@/assets/lang';
import BoardWithHeader from "@/components/Panel/BoardWithHeader";
import useViewModel from './methods';
import Space from '@/components/Space';
import {scale} from '@/styles/Sizes';

const ViewDoctor = (props) => {
  const vm = useViewModel(props);

  return (
    <Container>
      <BoardWithHeader title={__('terms_and_conditions')}>
        <ScrollView style={styles.container}>
          <Text style={styles.content}>
            {vm.content}
          </Text>
          <Space height={150 * scale} />
        </ScrollView>
      </BoardWithHeader>
    </Container>
  )
};

const styles = StyleSheet.create({
  container: {
    padding: 20 * scale,
    marginVertical: 20 * scale,
  },
  content: {
    fontSize: 22 * scale,
  }
});

export default observer(ViewDoctor);
