import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

/* Esquema para validación */
const schema = yup.object({
  username: yup
    .string()
    .required('El nombre es obligatorio'),
  password: yup
    .string()
    .min(6, 'La contaseña debe tener minimo 6 caracteres')
    .required('La contraseña es obligatoria'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
    .required('La contraseña es obligatoria')
})

export const BasicForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type='text' {...register('username')} placeholder='Usuario' />
      {errors.username && <p>{errors.username.message}</p>}
      <input type='password' {...register('password')} placeholder='Contraseña' />
      {errors.password && <p>{errors.password.message}</p>}
      <input type='password' {...register('confirmPassword')} placeholder='Confirma contraseña' />
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      <button type='submit'>Enviar</button>
    </form>
  )
}
