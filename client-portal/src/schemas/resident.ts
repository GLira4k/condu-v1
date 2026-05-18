import * as yup from 'yup';

export const residentRegistrationSchema = yup.object({
  full_name: yup
    .string()
    .required('O nome completo é obrigatório')
    .min(3, 'O nome deve ter pelo menos 3 caracteres'),
  
  unit_number: yup
    .string()
    .required('O número da unidade é obrigatório')
    .max(50, 'O número da unidade deve ter no máximo 50 caracteres')
    .matches(/^[0-9]+$/, 'Apenas números são permitidos para a unidade'),
  
  document_code: yup
    .string()
    .required('O código do documento é obrigatório')
    .max(50, 'O código deve ter no máximo 50 caracteres')
    .matches(/^[0-9]+$/, 'Apenas números são permitidos'),
});
