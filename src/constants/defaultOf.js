import cardDeckImg from 'src/assets/images/preview-package/member1.jpg';
import avatarImg from 'src/assets/images/preview-package/user.png';

const defaultOf = {
  initDataLength: 0,
};

const defaultOfDeck = {
  TITLE: 'Bộ bài nặc danh',
  IMAGE: cardDeckImg,
  TAG: 'normal',
  DESCRIPTION:
    'alo con oaihf jahf ia fhaj uafujh jhaj afjhjafj alo con oaihf jahf ia fhaj uafujh jhaj afjhjafj',
  LIKES: 0,
};
const defaultOfCard = {
  EMPTY: ['Bộ bài chưa có câu hỏi'],
  SERVER: ['Mất kết nối'],
};
const defaultOfUser = {
  AVATAR: avatarImg,
  NAME: 'Người dùng ẩn danh',
};

export {defaultOf, defaultOfDeck, defaultOfUser, defaultOfCard};
