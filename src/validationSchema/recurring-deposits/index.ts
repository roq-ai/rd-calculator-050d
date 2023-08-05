import * as yup from 'yup';

export const recurringDepositValidationSchema = yup.object().shape({
  amount: yup.number().integer().required(),
  frequency: yup.string().required(),
  start_date: yup.date().required(),
  end_date: yup.date().required(),
  organization_id: yup.string().nullable(),
});
