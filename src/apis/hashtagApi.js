import ApiInstance from './ApiInstance';

function getHashtags() {
  return ApiInstance.getRequest('/hashtags');
}

export default {getHashtags};
