"use client"

import { AppError } from "@/types/AppError";


interface props {
    fieldName: string;
    errorByFiled: Record<string, AppError[]>;
}

export const ShowErrrorsComponent = ({fieldName, errorByFiled}: props) => {

    const SEVERITY_WEIGHT = {
        high: 3,
        medium: 2,
        low: 1
    } as const;

    
   const getErrorForField = (): AppError[] => {
        return errorByFiled[fieldName]?.sort((a, b) =>
            SEVERITY_WEIGHT[b.severity] - SEVERITY_WEIGHT[a.severity]
        ) || []
    }


    const errors = getErrorForField();

  return (
    
   <>
    {errors.map((error, index) => ((
        <div  className={`p-2`} key={index}>
            <p>{error.message}</p>
        </div>
    )))}  
   </>
    

  )
}
