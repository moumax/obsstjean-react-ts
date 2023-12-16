import { z } from "zod";

const signUpSchema = z.object({
  email: z.string().min(4).email({ message: "L'email doit être valide !" }),
  password: z
    .string()
    .min(8, {
      message: "Le mot de passe doit contenir au moins 8 caractères !",
    }),
  name: z
    .string()
    .min(4, { message: "Le nom doit contenir au moins 4 caractères !" }),
  role: z
    .string()
    .min(4, { message: "Le rôle doit contenir au moins 4 caractères !" }),
});

export default signUpSchema;
