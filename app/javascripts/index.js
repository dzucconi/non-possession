import uniq from 'lodash.uniq';
import params from './lib/params';
import difference from './lib/difference';
import toSentence from './lib/to_sentence';

const PARAMS = params({
  phrase: 'all the letters of the alphabet',
});

const DOM = {
  app: document.getElementById('app'),
};

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

const detect = x => {
  const target = uniq(x.toString().toLowerCase().replace(' ', '').split(''));
  return difference(alphabet, target);
};

const redirect = x =>
  window.location = `${window.location.pathname}?phrase=${encodeURIComponent(x)}`;

export default () => {
  if (window.location.search === '') {
    return redirect(PARAMS.phrase);
  }

  const phrase = PARAMS.phrase || '&hellip;';
  const missing = toSentence(detect(phrase));

  DOM.app.innerHTML = missing.length === 0 ? `
    The phrase
    <span>“<span id='input' contenteditable>${phrase}</span>”</span>
    contains every letter in the alphabet.
  ` :
  `
    The phrase
    <span>“The phrase “<span id='input' contenteditable>${phrase}</span>”
    contains every letter in the alphabet except for ${missing}.”</span>
    contains every letter in the alphabet.
  `;

  DOM.input = document.getElementById('input');

  DOM.input.addEventListener('keydown', e => {
    if (e.which === 13) {
      e.preventDefault();
      return redirect(DOM.input.innerHTML);
    }
  });
};
