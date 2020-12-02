import en from './en';
import kd from './kd';
import ar from './ar';

function __(key, lang = null) {
  let source = en;
  const language = lang || 'english';
  if (language.toLowerCase() === 'kurdish') {
    source = kd;
  } else if (language.toLowerCase() === 'arabic') {
    source = ar;
  }

  return source[key] || key;
}

export const ___ = (key, lang) => {
  let source = en;
  lang = lang ? lang : 'english';
  if (lang.toLowerCase() === 'kurdish') {
    source = kd;
  } else if (lang.toLowerCase() === 'arabic') {
    source = ar;
  }
  return source[key] || key;
};

export default __;
