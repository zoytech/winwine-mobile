import * as yup from 'yup';
import {LIMIT} from 'src/constants';

const createCardDeckValidationSchema = yup.object().shape({
  cardDeckName: yup
    .string()
    .required('Bạn cần phải nhập tên bộ bài')
    .max(
      LIMIT?.CARD_DECK_NAME,
      ({max}) => `Tên bộ bài không được vượt quá ${max} kí tự.`,
    ),
  cardDeckDescription: yup
    .string()
    .max(
      LIMIT?.CARD_DECK_DESCRIPTION,
      ({max}) => `Mô tả bộ bài không được vượt quá ${max} kí tự.`,
    ),
});
export default createCardDeckValidationSchema;
