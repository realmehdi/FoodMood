import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise((_, reject) => {
    setTimeout(
      () =>
        reject(new Error(`Request took too long! Timeout after ${s} second`)),
      s * 1000
    );
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const getNutritionHTML = async function (url) {
  try {
    const fetchPro = fetch(url, {
      method: 'GET',
      headers: {
        'Content-type': 'text/html',
        Accept: 'text/html',
      },
    });
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.text();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
