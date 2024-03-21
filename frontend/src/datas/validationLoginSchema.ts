import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().min(4).email({ message: "L'email doit être valide !" }),
  password: z.string().min(8, {
    message: 'Le mot de passe doit contenir au moins 8 caractères !'
  })
})

export default loginSchema
