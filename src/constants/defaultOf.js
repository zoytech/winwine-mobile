import cardDeckImg from 'src/assets/images/preview-package/member1.jpg';
import avatarImg from 'src/assets/images/preview-package/user.png';

const defaultOf = {
  initDataLength: 0,
};

const DECK = {
  NAME: 'Bộ bài khuyết danh',
  TAG: ['#ChưaPhânLoại'],
  IMAGE: cardDeckImg,
  NUMBER_OF_CARDS: 0,
};
const CARD = {
  EMPTY: ['Bộ bài chưa có câu hỏi'],
  SERVER: ['Mất kết nối'],
};
const OWNER = {
  AVATAR: avatarImg,
  NAME: 'Người bạn ẩn danh',
};

export {defaultOf, DECK, CARD, OWNER};
