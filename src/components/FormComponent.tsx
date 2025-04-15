"use client"
import React, { useMemo, useState } from 'react'
import { handleZodError } from '@/utils/handleZodError'
import { useHandleErrors } from '@/hooks/useHandleErrors'
import { ShowErrrorsComponent } from './ShowErrrorsComponent'
import { formSchema } from '@/schemas/formSchemaZod'


export const FormComponent = () => {
     
    const {errorByFiled, setErrors} = useHandleErrors()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        age: 0
    })
  
    const handleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const { value, type, name } = event.target
            const numericValue = Number(value)
            const valueTranform = type === "number" ? (isNaN(numericValue) ? 0 : numericValue) : value
            setFormData({ ...formData, [name]: valueTranform })

        } catch (error) {
            console.log(error)
        }
    }

    //necesito un button y validor los datos con zod
    const handleSendDataForm = (event: React.FormEvent) => {
        try {
            event.preventDefault()
            setErrors([])
            const resultSendData = formSchema.safeParse(formData)
            if (!resultSendData.success) {
                const errorTransform = handleZodError(resultSendData.error)
                setErrors(errorTransform)
                return console.log("hubo un error")
            }
            
            console.log(resultSendData.data)
            const dataInJson = JSON.stringify(resultSendData.data, null, 2)
            alert(dataInJson)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <form action="" method="get" className="form-container">

                <div  className="form-group">{/* seccion de name  */}
                    <input type="text" value={formData.name} name="name" onChange={handleValue} placeholder='Nombre' id="" />
                    <ShowErrrorsComponent fieldName="name" errorByFiled={errorByFiled} />
                </div>

                <div  className="form-group">{/* seccion de email */}
                    <input type="email" name="email" value={formData.email} onChange={handleValue} placeholder='Email' id="" />
                    <ShowErrrorsComponent fieldName="email" errorByFiled={errorByFiled} />
                </div>

                <div  className="form-group">{/* seccion de age */}
                    <input type="number" name="age" value={formData.age} onChange={handleValue} placeholder='Edad' id="" />
                    <ShowErrrorsComponent fieldName="age" errorByFiled={errorByFiled} />
                </div>

                <button onClick={handleSendDataForm} type="submit">Enviar</button>
            </form>
        </div>
    )
}
