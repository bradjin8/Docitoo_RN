import en from './en';
import kd from './kd';
import ar from './ar';

function __(key, lang) {
  let source = en;
  const language = lang || 'english';
  if (language.toLowerCase() === 'kurdish') {
    source = kd;
  } else if (language.toLowerCase() === 'arabic') {
    source = ar;
  }

  return source[key] || key;
}

export default __;
