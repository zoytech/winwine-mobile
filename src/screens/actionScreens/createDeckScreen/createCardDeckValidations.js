import * as yup from 'yup';
import {limit} from 'src/constants';

const createCardDeckValidationSchema = yup.object().shape({
  cardDeckName: yup
    .string()
    .required('Bạn cần phải nhập tên bộ bài')
    .max(
      limit?.cardDeckName,
      ({max}) => `Tên bộ bài không được vượt quá ${max} kí tự.`,
    ),
  cardDeckDescription: yup
    .string()
    .max(
      limit?.cardDeckDescription,
      ({max}) => `Mô tả bộ bài không được vượt quá ${max} kí tự.`,
    ),
});
export default createCardDeckValidationSchema;
