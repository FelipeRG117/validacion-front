"use client"

import { formSchema } from "@/schemas/formSchemaZod"
import { AppError } from "@/types/AppError"
import { handleZodError } from "@/utils/handleZodError"
import React, { useCallback, useMemo, useState } from "react"
import { z } from "zod"

export const useForm = <T extends z.ZodTypeAny> (schema: T) => {

type FormDataSchema = z.infer<T>

    const [errors, setErrors] = useState<AppError[]>([])
      const [formData, setFormData] = useState<Partial<FormDataSchema>>({})


    ///ordenamiento de errores
      const errorByFiled = useMemo(() => {
            return errors.reduce((acc, error) => {
                if (!error.field) return acc;
                if (!acc[error.field]) acc[error.field] = []
                acc[error.field].push(error)
                return acc;
            }, {} as Record<string, AppError[]>)
        }, [errors])
    
    //funcion que valida y actualiza errroes 
const validate = useCallback((data: Partial<FormDataSchema> )=>{
//aqui va a caldiar cada que cambie el valor de form data 
try {
    //aqui vamos a hacer uso de formShcema 
    const formDataValidation = schema.safeParse(data)
if(!formDataValidation.success){
    //copmo sucedio un error vamos a guardarlo en errors 
    const errorTranform = handleZodError(formDataValidation.error)
    console.log("esto es errors antes de ser tranformado",errorTranform)
    setErrors(errorTranform)
    return {success: false, errors: errorTranform}
}
//como si es exitoso lo guardamos en el set de formdata
setErrors([])
return {success: true, data: formDataValidation.data}
} catch (error) {
    console.log(error)
}


}, [formSchema])
  //sto esta pensado para validar los datos una  vez cambiados por handleChange 

//funcion que maneja cambios en inputs con validacion adicional //si aqui es una funcion que atrapa el event y destructura para tomar el valor proveniente y de  ahi validar el tipo y de ahi valdiar con las fucnines correspondientes, los errores se manejaran direcatemnte aqui en el hook ya que pertencen aqui 
const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>, validationOnChange = false)=>{
    //esto esta pensado para que pueda mandar los datos actualizados a los estados 
    try {
        const {name, type, value } = event.target
        //ya tengo los valroes ahora  vamos a validar de que cumplan con el esquema 
        const valueTranform = type === "number"? Number(value) || 0: value
        const newDataForm = {...formData, [name]: valueTranform}
        setFormData(newDataForm)
//aqui vamos a hacer una validacion adicional en caso de que se elija una validacion por cambio 
        if(validationOnChange) validate(newDataForm)

    } catch (error) {
        console.log(error)
    }
}, [formData, validate])

  return (
    {errorByFiled, handleChange, validate, formData}
  )
}
