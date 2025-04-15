import { z } from "zod";

export const formSchema = z.object({
        name: z.string().min(3, "necestia minimo 3 letras"),
        email: z.string().email(),
        age: z.number().int().gte(18, "neceistas ser mayor de edad")
    })