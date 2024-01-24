import Form from '@/app/ui/customers/edit-form'
import Breadcrumbs from '@/app/ui/customers/breadcrumbs'
import { fetchCustomersById } from '@/app/lib/data'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Edit Customers'
}


export default async function Page ({ params }: { params: { id: string } }) {
  // console.log(id)
  const id = params.id
  const customer = await Promise.all([
    fetchCustomersById(id)
  ])

  if (!customer) {
    notFound()
  }

  // customerForm.name = customer.name

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Customers', href: '/dashboard/customers' },
          {
            label: 'Edit Customer',
            href: `/dashboard/customers/${id}/edit`,
            active: true
          }
        ]}
      />
      <Form customer={customer[0]} />
    </main>
  )
}
