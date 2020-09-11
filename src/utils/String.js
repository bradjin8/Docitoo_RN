import numbro from 'numbro';
const tag = 'Util::String';
export const formatInteger = (value) => {
  // console.log(tag, 'formatInteger() - in', value);
  const ret = numbro(parseInt(value)).format({
    thousandSeparated: true,
    mantissa: 0 // number of decimals displayed
  });
  // console.log(tag, 'formatInteger() - out', ret);
  return ret;
};

export const formatHour = (hour) => {
  let AMPM = 'AM';
  hour = parseInt(hour);
  if (hour / 12 >= 1) {
    AMPM = 'PM';
    hour -= 12;
  }

  if (parseInt(hour) === 0) {
    hour = 12;
  }

  return `${hour} ${AMPM}`;
};

export const capitalizeString = (string) => {
  if (!string || string.length < 1) {
    return "";
  }
  return string[0].toUpperCase() + string.slice(1);
};
