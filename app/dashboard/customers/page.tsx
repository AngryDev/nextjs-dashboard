import Search from '@/app/ui/search'
import Table from '@/app/ui/customers/table'
import { CreateCustomer } from '@/app/ui/customers/buttons'
import { lusitana } from '@/app/ui/fonts'
import { TableRowSkeleton } from '@/app/ui/skeletons'
import { Suspense } from 'react'
import Pagination from '@/app/ui/customers/pagination'
import { fetchCustomersPages } from '@/app/lib/data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Customers'
}

export default async function Page ({
  searchParams
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1

  const totalPages = await fetchCustomersPages()
  return (
    <div className='w-full'>
      <div className='flex w-full items-center justify-between'>
        <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
        <CreateCustomer />
      </div>
      <div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
        <Search placeholder='Busqueda de clientes...' />
        <Pagination totalPages={totalPages} />
      </div>
      <Suspense key={query + currentPage} fallback={<TableRowSkeleton />}>
        <Table  query={query} currentPage={currentPage}  />
      </Suspense>
      <div className='mt-5 flex w-full justify-center'>
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}
