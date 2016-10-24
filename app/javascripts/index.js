const DOM = {
  app: document.getElementById('app'),
};

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

const uniq = xs =>
  [...new Set(xs)];

const difference = (a, b) =>
  a.filter(x => b.indexOf(x) < 0);

const detect = x => {
  const target = uniq(x.toLowerCase().replace(' ', '').split(''));
  return difference(alphabet, target);
};

const toSentence = xs =>
  xs.join(', ').replace(/,\s([^,]+)$/, ', and $1');

export default () => {
  if (window.location.search === '') {
    window.location = `${window.location.pathname}?phrase=all%20the%20letters%20of%20the%20alphabet`;
  }

  const phrase = decodeURIComponent(window.location.search.split('phrase=').pop()) || 'all the letters of the alphabet';
  const missing = toSentence(detect(phrase));

  DOM.app.innerHTML = `
    The phrase <span>“The phrase “${phrase}” contains every letter in the alphabet except for ${missing}.”</span> contains every letter in the alphabet.
  `;
};
