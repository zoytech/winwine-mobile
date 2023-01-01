import {api} from 'src/constants';

async function requestToServer({url, body = {}, method = 'GET', headers = {}}) {
  const bodyString = JSON.stringify(body);
  let json;

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

function getRequest(endPoint, {params}) {
  const searchParams = new URLSearchParams(params).toString();
  return requestToServer({
    url: `${api?.HOST}/${api?.PATH}/${endPoint}?${searchParams}`,
    method: 'GET',
  });
}

function postRequest(endPoint, {params, body}) {
  const searchParams = params ? new URLSearchParams(params).toString() : '';
  return requestToServer({
    url: `${api?.HOST}/${api?.PATH}/${endPoint}?${searchParams}`,
    method: 'POST',
    body,
  });
}

export default {promiseWithTimeout, postRequest, getRequest};
