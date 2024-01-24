'use server'
import { z } from 'zod'
import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { signIn } from '@/auth'
import { AuthError } from 'next-auth'

export async function authenticate (
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.'
        default:
          return 'Something went wrong.'
      }
    }
    throw error
  }
}

export type State = {
  errors?: {
    name?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  id: z.string(),
  name: z.string({
    invalid_type_error: 'Please select a customer.'
  }),
  amount: z.coerce.number({
    invalid_type_error: 'Please put an number amount.'
  }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.'
  }),
  date: z.string()
})

const CreateInvoice = FormSchema.omit({ id: true, date: true })

const FormSchemaCustomer = z.object({
  id: z.string(),
  name: z.string({
    invalid_type_error: 'Please enter First Name and Last Name of a Customer.'
  }),
  email: z.string({
    invalid_type_error: 'Please enter an email address.'
  }),
  image_url: z.string({
    invalid_type_error: 'Please provide a valid URL for the image.'
  })
})

const CreateCustomer = FormSchemaCustomer.omit({ id: true})

export type CustomerState = {
  errors?: {
    name?: string[];
    email?: string[];
    image_url?: string[];
  };
  message?: string | null;
};

// export async function createInvoice (prevState: State, formData: FormData)
export async function createCustomer (prevState: CustomerState, formData: FormData) {
  const validatedFields = CreateCustomer.safeParse({
    // name: 'John Doe',
    // email: 'john@example.com',
    // image_url: '/customers/delba-de-oliveira.png'
    name: formData.get('name'),
    email: formData.get('email'),
    image_url: formData.get('imageUrl')
  })

  // console.log(formData)

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors
    return {
      errors,
      message: 'Missing Fields. Failed to Create Customer.'
    }
  }

    // Prepare data for insertion into the database
  const { name, email, image_url } = validatedFields.data

    // Insert data into the database
    try {
      await sql`
      INSERT INTO customers (name, email, image_url)
      VALUES (${name}, ${email}, ${image_url});
    `

    } catch (error) {
      return {
        message: 'Database Error: Failed to Create a Customer de eme.'
      }
    }
      // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/customers')
  redirect('/dashboard/customers')

}

export async function createInvoice (prevState: State, formData: FormData) {
  const validatedFields = CreateInvoice.safeParse({
    name: formData.get('name'),
    amount: formData.get('amount'),
    status: formData.get('status')
  })

  console.log(validatedFields)

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.'
    }
  }

  // Prepare data for insertion into the database
  const { name, amount, status } = validatedFields.data
  const amountInCents = amount * 100
  const date = new Date().toISOString().split('T')[0]

  // Insert data into the database
  try {
    await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${name}, ${amountInCents}, ${status}, ${date})
  `

  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.'
    }
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/invoices')
  redirect('/dashboard/invoices')
}

const UpdateInvoice = FormSchema.omit({ id: true, date: true })
const UpdateCustomer = FormSchemaCustomer.omit({ id: true })

export async function updateInvoice (
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    name: formData.get('name'),
    amount: formData.get('amount'),
    status: formData.get('status')
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.'
    }
  }

  const { name, amount, status } = validatedFields.data
  const amountInCents = amount * 100

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${name}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' }
  }

  revalidatePath('/dashboard/invoices')
  redirect('/dashboard/invoices')
}

export async function updateCustomer (
  id: string,
  prevState: CustomerState,
  formData: FormData,
) {
  const validatedFields = UpdateCustomer.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    image_url: formData.get('imageUrl')
  })

  console.log(validatedFields)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Customer.'
    }
  }

  const { name, email, image_url } = validatedFields.data

  try {
    await sql`
      UPDATE customers
      SET name = ${name}, email = ${email}, image_url = ${image_url}
      WHERE id = ${id}
    `
  } catch (error) {
    return { message: 'Database Error: Failed to Update Customer.' }
  }

  revalidatePath('/dashboard/customers')
  redirect('/dashboard/customers')
}

export async function deleteInvoice (id: string){
// throw new Error('Failed to Delete Invoice')
try {
  await sql`DELETE FROM invoices WHERE id = ${id}`
  revalidatePath('/dashboard/invoices')

} catch (error) {
  return { message: 'Database Error: Failed to Delete Invoice.' }
}

}

export async function deleteCustomer (id: string){
  // throw new Error('Failed to Delete Invoice')
  try {
    await sql`DELETE FROM customers WHERE id = ${id}`
    revalidatePath('/dashboard/customers')

  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' }
  }

  }
