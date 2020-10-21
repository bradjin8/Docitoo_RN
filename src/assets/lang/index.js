import en from './en';

function __(key) {
  let source = en;

  return source[key] || key;
}

export default __;
