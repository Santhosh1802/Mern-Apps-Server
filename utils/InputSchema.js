import Joi from "joi";

//these schema are used by the objects in the exportable schema
const EmailSchema = Joi.string().email().required().label("Email");
const NameSchema = Joi.string().min(3).max(14).required().label("Name");
const PasswordSchema = Joi.string().min(6).max(14).required().label("Password");
const ClientIdSchema = Joi.string().label("ClientId");
const CredentialSchema = Joi.string().label("Credential");
const selectedBySchema = Joi.string().label("Selected_By");
const notesTitleSchema = Joi.string().max(50).label("Notes Title");
const contentSchema = Joi.string()
  .min(1)
  .max(20000)
  .required()
  .label("Content");
const userIdSchema = Joi.string().required().label("User Id");
const notesIdSchema = Joi.string().required().label("Notes Id");
const searchSchema = Joi.string().required().label("Search Word");

//used to validate user registration process
export const RegisterSchema = Joi.object({
  name: NameSchema,
  email: EmailSchema,
  password: PasswordSchema,
});

//used to validate user login process
export const LoginSchema = Joi.object({
  email: EmailSchema,
  password: PasswordSchema,
});

//used to validate user login through google process
export const GoogleSchema = Joi.object({
  clientId: ClientIdSchema,
  credential: CredentialSchema,
  selected_by: selectedBySchema,
});

//used to validate notes
export const NotesSchema = Joi.object({
  title: notesTitleSchema,
  content: contentSchema,
  user_id: userIdSchema,
});

//used to validate user_id for getting related notes of an user
export const NotesGetSchema = Joi.object({
  user_id: userIdSchema,
});

//used to validate the edit of a note
export const NotesEditSchema = Joi.object({
  title: notesTitleSchema,
  content: contentSchema,
  user_id: userIdSchema,
  notes_id: notesIdSchema,
});

//used to validate the delete of a note
export const NotesDeleteSchema = Joi.object({
  notes_id: notesIdSchema,
  user_id: userIdSchema,
});

//used to validate the search of the notes
export const NotesSearchSchema = Joi.object({
  user_id:userIdSchema,
  word: searchSchema,
});
