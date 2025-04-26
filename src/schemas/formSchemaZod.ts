import { z } from "zod";

export const formSchema = z.object({
        name: z.string().min(3, "necestia minimo 3 letras").max(90, "Oficialmente superaste el nombre mas largo del mundo, osea debe ser mas corto culiao").nonempty("no lo puedes dejar vacio"),
        email: z.string().email("el email no cumple las caracteristicas").nonempty("no dejes el campo vacio"),
        age: z.number().int().gte(18, "neceistas ser mayor de edad").lte(140, "la edad debe ser real")
    })