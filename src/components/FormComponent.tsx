"use client"
import { useForm } from '@/hooks/useForm'
import { formSchema } from '@/schemas/formSchemaZod'
import React from 'react'
import { ShowErrrorsComponent } from './ShowErrrorsComponent'

export default function FormComponent() {

const {errorByFiled, validate, handleChange, formData} = useForm(formSchema)


const handleSubmit = (event: React.FormEvent)=>{
try {
    event.preventDefault()
const validationData = validate(formData)
if(!validationData?.success)return ;

alert(JSON.stringify(validationData.data, null, 2))

} catch (error) {
    console.log(error)
}
}

  return (
    <div>
        <form action="" onSubmit={handleSubmit} method="get" noValidate>
           <div>{/* este campo es de name */}
           <input onChange={((e)=> handleChange(e))} type="text" name="name" value={formData.name || ""}  placeholder='Nombre completo' id="" />
        <ShowErrrorsComponent fieldName='name' errorByFiled={errorByFiled} />
           </div>

           <div>{/* este campo de email */}
           <input onChange={((e)=> handleChange(e))} type="email" name="email" value={formData.email || ""}  placeholder='Email' id="" />
        <ShowErrrorsComponent fieldName='email' errorByFiled={errorByFiled} />
           </div>

           <div>{/* este campo de  age */}
           <input onChange={((e)=> handleChange(e))} type="number" name="age" value={formData.age || ""}  placeholder='Edad' id="" />
        <ShowErrrorsComponent fieldName='age' errorByFiled={errorByFiled} />
           </div>
           <button type="submit">Enviar</button>
        </form>
    </div>
  )
}
