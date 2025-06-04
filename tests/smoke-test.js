// tests/smoke-test.js
const fetch = require('node-fetch');

const urls = [
  'https://filminisme.azurewebsites.net/',
  'https://filminisme.azurewebsites.net/login',
  'https://filminisme.azurewebsites.net/register',
  'https://filminisme.azurewebsites.net/watchlist',
];

(async () => {
  try {
    for (const url of urls) {
      const res = await fetch(url);
      console.log(`${url} => ${res.status}`);
      if (!res.ok) throw new Error(` ${url} failed`);
    }
    console.log(' Smoke test passed');
    process.exit(0);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
})();