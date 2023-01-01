import {api} from 'src/constants';

const PREFIX_URL = `${api?.HOST}/${api?.PATH}`;

async function requestToServer({url, body = {}, method = 'GET', headers = {}}) {
  const bodyString = JSON.stringify(body);
  let json;

  console.log(
    '%c ' + method.toUpperCase() + ' - ' + url.substring(0, PREFIX_URL.length),
    'color: #0086b3; font-weight: bold',
    body,
  );

  const response = await fetch(url, {
    method,
    body: bodyString,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });
  if (!response.ok) {
    let message = `Failed api request to ${url}`;
    try {
      const responseText = await response.text();
      if (responseText) {
        message += responseText;
      }
    } catch (e) {
      throw new Error(`Api request to ${url}: ${message} ${response.status}`);
    }
  }
  try {
    json = await response.json();
  } catch (e) {
    return '';
  }
  return json;
}

function promiseWithTimeout(data, timeout = 1000) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, timeout);
  });
}

function getRequest(endPoint, {params = {}}) {
  console.log('getRequest', endPoint);
  const searchParams = new URLSearchParams(params).toString();
  return requestToServer({
    url: `${PREFIX_URL}${endPoint}?${searchParams}`,
    method: 'GET',
  });
}

function postRequest(endPoint, {params = {}, body}) {
  const searchParams = params ? new URLSearchParams(params).toString() : '';
  return requestToServer({
    url: `${PREFIX_URL}${endPoint}?${searchParams}`,
    method: 'POST',
    body,
  });
}

export default {promiseWithTimeout, postRequest, getRequest};
