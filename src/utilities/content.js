let cache = {};
let requested = {};

const url = alias =>
  `${origin()}/${alias}.json`;

const json = async url => 
  await fetch(url).then(a => a.json());

const wait = time => 
  new Promise(a => setTimeout(a, time));

const origin = () =>
  (import.meta.env.DEV) 
  ? 'http://localhost:3000' 
  : 'https://alexandermonachino.com/pre-rendering-re-rendering';

export const content = async alias => {
  // if content for this alias has not yet been requested...
  if (!requested[alias]) {
    // mark this alias as requested
    requested[alias] = true;
    // fetch content for this alias, and add to cache
    cache[alias] = await json(url(alias));
    // return cached content
    return cache[alias];
  }
  // otherwise, if content for this alias has not yet been cached...
  else if (!cache[alias])
    // wait 100ms, then retry this function
    return wait(100).then(() => content(alias));
  // otherwise, return cached content
  else return cache[alias];
};