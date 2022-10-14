import questionsMockData from './mockData/questions.json';
import questionHomeScreenMockData from './mockData/questionHomeScreen.json';

function promiseWithTimeout(data, timeout = 1000) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, timeout);
  });
}

function getQuestionPackagesList() {
  return promiseWithTimeout(questionsMockData);
}

function getQuestionHomeScreenList() {
  return promiseWithTimeout(questionHomeScreenMockData);
}

export default {getQuestionPackagesList, getQuestionHomeScreenList};
