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
