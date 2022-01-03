import yup from '../../config/yup';

export const userCreateSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  nickname: yup.string(),
});

export const userAuthSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});
