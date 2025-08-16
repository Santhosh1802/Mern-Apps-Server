import Joi from "joi";

export const EmailSchema = Joi.string().email().required().label("Email");
export const NameSchema = Joi.string().min(3).max(14).required().label("Name");
export const PasswordSchema = Joi.string()
  .min(6)
  .max(14)
  .required()
  .label("Password");
export const ClientIdSchema=Joi.string().label("ClientId");
export const CredentialSchema=Joi.string().label("Credential");
export const selectedBySchema=Joi.string().label("Selected_By");

export const RegisterSchema = Joi.object({
  name: NameSchema,
  email: EmailSchema,
  password: PasswordSchema,
});

export const LoginSchema=Joi.object({
  email:EmailSchema,
  password:PasswordSchema,
})

export const GoogleSchema=Joi.object({
  clientId:ClientIdSchema,
  credential:CredentialSchema,
  selected_by:selectedBySchema,
})
