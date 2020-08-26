import en from './en';

function __(key) {
  let source = en;

  return source[key];
}

export default __;
