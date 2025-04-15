"use client"

import { AppError } from "@/types/AppError"
import { useMemo, useState } from "react"



export const useHandleErrors = () => {
    const [errors, setErrors] = useState<AppError[]>([])

  const errorByFiled = useMemo(() => {
        return errors.reduce((acc, error) => {
            if (!error.field) return acc;
            if (!acc[error.field]) acc[error.field] = []
            acc[error.field].push(error)
            return acc;
        }, {} as Record<string, AppError[]>)
    }, [errors])


  return (
    {errorByFiled, setErrors}
  )
}
