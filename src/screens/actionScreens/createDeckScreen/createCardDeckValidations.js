import * as yup from 'yup';

const createCardDeckValidationSchema = yup.object().shape({
  cardDeckName: yup.string().required('Bạn cần phải nhập tên bộ bài'),
});
export default createCardDeckValidationSchema;
