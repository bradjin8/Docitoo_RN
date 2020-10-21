import React from 'react';
import useViewModel from './methods';
import {observer} from 'mobx-react';
import Container from '@/components/Container';
import {StyleSheet, TouchableHighlight, View, Text, TouchableOpacity, Image, Platform} from 'react-native';
import __ from '@/assets/lang';
import BoardWithHeaderRightButton from '@/components/Panel/BoardWithHeaderRightButton';
import ImageButton from '@/components/Button/ImageButton';
import Space from '@/components/Space';
import Images from '@/styles/Images';
import * as StringUtil from '@/utils/String';
import BookingList from '@/components/List/BookingList';
import SearchBookingsModal from './components/SearchBookingsModal';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";
import MapView from 'react-native-maps';
import Loading from '@/components/Loading';

const styles = StyleSheet.create({
  resultCount: {
    fontWeight: 'bold',
    fontSize: wp('4%')
  },
  searchButton: {
    zIndex: 30,
    position: 'absolute',
    bottom: hp('3%'),
    right: wp('5%'),
  },
  searchButtonImage: {
    width: wp('15%'),
    height: wp('15%'),
  }
});

const tag = 'DBookings::View';

const Bookings = (props) => {
  const vm = useViewModel(props);

  return (
    <Container>
      {(vm.d_data.isPrcessing || vm.data.isProcesing || vm.isLoading) ?
        <Loading/>
        :
        <BoardWithHeaderRightButton title={__('bookings')} buttonCaption={__('sort')}
                                    onPressRightButton={() => {
                                      vm.onPressSort(vm.bookings)
                                    }}
                                    onSwipeUp={vm.fetchBookings}
        >
          <Text style={styles.resultCount}>
            {StringUtil.formatInteger(vm.bookings.length) + ' ' + __('results_found')}
          </Text>
          <Space height={hp('1%')}/>
          <BookingList bookings={vm.bookings} onPressBooking={vm.onPressBooking}/>
        </BoardWithHeaderRightButton>

      }
      {/*<ImageButton image={Images.button.search} onPress={vm.onPressSearch} style={styles.searchButton}
                   imageStyle={styles.searchButtonImage}/>*/}
      <SearchBookingsModal isVisible={vm.searchVisible} onPressClose={vm.onPressSearch} onPressOK={vm.applyFilter}/>
    </Container>
  )
};

export default observer(Bookings);
