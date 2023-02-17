import {api} from 'src/constants';

const PREFIX_URL = `${api?.HOST}/${api?.PATH}`;

async function requestToServer({url, method = 'GET', body, headers = {}}) {
  const bodyString = JSON.stringify(body);
  let json;

  console.log(
    '%c ' +
      method.toUpperCase() +
      ' - ' +
      url.substring(PREFIX_URL.length, url.length),
    'color: #0086b3; font-weight: bold',
    body ? body : '',
  );

  const response = await fetch(url, {
    method,
    body: bodyString,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });

  if (response.ok) {
    try {
      json = await response.json();
    } catch (e) {
      return '';
    }
    return json;
  }

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

function promiseWithTimeout(data, timeout = 1000) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, timeout);
  });
}

function getRequest(endPoint, config = {}) {
  const {params = {}} = config;
  const searchParams = new URLSearchParams(params).toString();
  return requestToServer({
    url: `${PREFIX_URL}${endPoint}?${searchParams}`,
    method: 'GET',
    body: undefined,
  });
}

function postRequest(endPoint, config = {}) {
  const {params = {}, body} = config;
  const searchParams = params ? new URLSearchParams(params).toString() : '';
  return requestToServer({
    url: `${PREFIX_URL}${endPoint}?${searchParams}`,
    method: 'POST',
    body,
  });
}

export default {promiseWithTimeout, postRequest, getRequest};
