import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

type FormValues = {
  username: string
  email: string
  channel: string
}
export const YoutubeForm = () => {
  const form = useForm<FormValues>() //accepts an exceptional object as an argument

  const { register, control, handleSubmit, formState } = form
  const { errors } = formState

  // const {name, ref, onChange, onBlur} = register('username')

  const onSubmit = (data: FormValues) => {
    console.log('Form Submitted', data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className='form-control'>
          <label htmlFor='username'>Username</label>
          {/* <input type='text' id='username' name={name} ref={ref} onChange={onChange} onBlur={onBlur}  /> */}

          <input
            type='text'
            id='username'
            {...register('username', {
              required: {
                value: true,
                message: 'Username is required',
              },
            })}
          />
          <p className='error'>{errors.username?.message}</p>
        </div>

        <div className='form-control'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            {...register('email', {
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-A0-9-]+)*$/,
                message: 'Invalid email format',
              },
              // validate: (fieldValue) => {
              //   return (
              //     fieldValue !== 'admin@example.com' ||
              //     'Enter a different email address'
              //   )
              // },

              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== 'admin@example.com' ||
                    'Enter a different email address'
                  )
                },
                notBlackListed: (fieldValue) => {
                  return (
                    !fieldValue.endsWith('baddomain.com') ||
                    'this domain is not supported'
                  )
                },
              },
            })}
          />
          <p className='error'>{errors.email?.message}</p>
        </div>

        <div className='form-control'>
          <label htmlFor='channel'>Channel</label>
          <input
            type='text'
            id='channel'
            {...register('channel', {
              required: {
                value: true,
                message: 'Channel is required',
              },
            })}
          />
          <p className='error'>{errors.channel?.message}</p>
        </div>

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  )
}
