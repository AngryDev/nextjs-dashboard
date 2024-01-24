'use client'
import Link from 'next/link'
import { UserCircleIcon, AtSymbolIcon, PhotoIcon } from '@heroicons/react/24/outline'
import { Button } from '@/app/ui/button'
import { createCustomer } from '@/app/lib/actions'
import { useFormState } from 'react-dom'


export default function Form () {
  const initialState = { message: null, errors: {} }
  const [state, dispatch] = useFormState(createCustomer, initialState)

  // console.log(state)

  return (
    <form action={dispatch}>
      <div className='rounded-md bg-gray-50 p-4 md:p-6'>
        {/* Customer Name */}

        <div className='mb-4'>
          <label htmlFor='name' className='mb-2 block text-sm font-medium'>
            Name
          </label>
          <div className='relative'>
            <UserCircleIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
              <input
                id='name'
                type='text'
                name='name'
                className='peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
                defaultValue=''
                aria-describedby='name-error'
              />
          </div>
          <div id='name-error' aria-live='polite' aria-atomic='true'>
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className='mt-2 text-sm text-red-500' key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className='mb-4'>
          <label htmlFor='email' className='mb-2 block text-sm font-medium'>
            Email
          </label>
          <div className='relative'>
            <AtSymbolIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
              <input
                id='email'
                type='text'
                name='email'
                className='peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
                defaultValue=''
                aria-describedby='customer-error'
              />
          </div>
          <div id='email-error' aria-live='polite' aria-atomic='true'>
            {state.errors?.email &&
              state.errors.email.map((error: string) => (
                <p className='mt-2 text-sm text-red-500' key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className='mb-4'>
          <label htmlFor='imageUrl' className='mb-2 block text-sm font-medium'>
            Url
          </label>
          <div className='relative'>
            <PhotoIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
              <input
                id='imageUrl'
                type='text'
                name='imageUrl'
                className='peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
                defaultValue=''
                aria-describedby='imageUrl-error'
              />
          </div>
          <div id='imageUrl-error' aria-live='polite' aria-atomic='true'>
            {state.errors?.image_url &&
              state.errors.image_url.map((error: string) => (
                <p className='mt-2 text-sm text-red-500' key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>


      </div>
      <div className='mt-6 flex justify-end gap-4'>
        <Link
          href='/dashboard/customers'
          className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'
        >
          Cancel
        </Link>
        <Button type='submit'>Create Customer</Button>
      </div>
    </form>
  )
}
