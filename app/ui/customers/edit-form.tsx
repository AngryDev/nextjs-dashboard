'use client'

import { CustomerForm } from '@/app/lib/definitions'
import {
  UserCircleIcon,
  AtSymbolIcon,
  PhotoIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Button } from '@/app/ui/button'
import { updateCustomer } from '@/app/lib/actions'
import { useFormState } from 'react-dom'

export default function EditCustomerForm ({
  customer
}: {
  customer: CustomerForm;
}) {
  const initialState = { message: null, errors: {} }
  const updateInvoiceWithId = updateCustomer.bind(null, customer.id)
  const [state, dispatch] = useFormState(updateInvoiceWithId, initialState)
  return (
    <form action={dispatch}>
      <div className='rounded-md bg-gray-50 p-4 md:p-6'>
        {/* Customer Name */}
        <div className='mb-4'>
          <label htmlFor='customer' className='mb-2 block text-sm font-medium'>
            Customer Name
          </label>
          <div className='relative'>
            <input
              id='customer'
              name='name'
              defaultValue={customer.name}
              className='peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
              aria-describedby='name-error'
            />
            <UserCircleIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
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
        {/* Customer Email */}
        <div className='mb-4'>
          <label htmlFor='email' className='mb-2 block text-sm font-medium'>
            Customer Email
          </label>
          <div className='relative'>
            <input
              id='email'
              name='email'
              defaultValue={customer.email}
              className='peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
              aria-describedby='email-error'
            />
            <AtSymbolIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
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

        {/* Customer ImageUrl */}
        <div className='mb-4'>
          <label htmlFor='image' className='mb-2 block text-sm font-medium'>
            Customer Image
          </label>
          <div className='relative'>
            <input
              id='image'
              name='imageUrl'
              defaultValue={customer.image_url}
              className='peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
              aria-describedby='image-error'
            />
            <PhotoIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
          </div>
          <div id='image-error' aria-live='polite' aria-atomic='true'>
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
        <Button type='submit'>Save Customer</Button>
      </div>
    </form>
  )
}
