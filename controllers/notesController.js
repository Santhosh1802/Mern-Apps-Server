import {
  archiveToggleOneNote,
  createOneNote,
  deleteOneNote,
  editOneNote,
  getAllNotesOfUser,
  searchAllMatchedNote,
} from "../service/notesService.js";
import {
  NotesDeleteSchema,
  NotesGetSchema,
  NotesSchema,
  NotesEditSchema,
  NotesSearchSchema
} from "../utils/InputSchema.js";
import { MyResponse } from "../utils/MyResponse.js";
import { status } from "../utils/StatusUtil.js";

/**
 * Create One Note Controller
 * @param {title, content, user_id} req
 * @param {response object} res
 */
export async function createOneNoteController(req, res) {
  const response = new MyResponse();
  const { title, content, user_id } = req.body;
  const { error, value } = NotesSchema.validate(
    { title: title, content: content, user_id: user_id },
    { abortEarly: false }
  );
  if (error) {
    response.pushError(error);
    response.setStatus(status.badrequest);
    return res.json(response);
  }
  await createOneNote(value, response);
  res.json(response);
}

/**
 * Get All Notes of a single user Controller
 * @param {user_id} req 
 * @param {response object} res 
 * @returns 
 */
export async function getAllNotesController(req, res) {
  const response = new MyResponse();
  const { user_id } = req.body;
  const { error, value } = NotesGetSchema.validate(
    { user_id: user_id },
    { abortEarly: false }
  );
  if (error) {
    response.pushError(error);
    response.setStatus(status.badrequest);
    return res.json(response);
  }
  await getAllNotesOfUser(value, response);
  res.json(response);
}

/**
 * Edit one note Controller
 * @param {title,content,user_id,notes_id} req 
 * @param {response object} res 
 * @returns 
 */
export async function editOneNoteController(req, res) {
  const response = new MyResponse();
  const { title, content, user_id, notes_id } = req.body;
  const { error, value } = NotesEditSchema.validate(
    { title: title, content: content, user_id: user_id, notes_id: notes_id },
    { abortEarly: false }
  );
  if (error) {
    response.pushError(error);
    response.setStatus(status.badrequest);
    return res.json(response);
  }
  await editOneNote(value, response);
  res.json(response);
}
/**
 * Delete one note Controller
 * @param {notes_id,user_id} req 
 * @param {response object} res 
 * @returns 
 */
export async function deleteOneNoteController(req, res) {
  const response = new MyResponse();
  const { notes_id, user_id } = req.body;
  const { error, value } = NotesDeleteSchema.validate(
    { user_id: user_id, notes_id: notes_id },
    { abortEarly: false }
  );
  if (error) {
    response.pushError(error);
    response.setStatus(status.badrequest);
    return res.json(response);
  }
  await deleteOneNote(value, response);
  res.json(response);
}
/**
 * Archive Toggle for Note Controller
 * @param {notes_id,user_id} req 
 * @param {response object} res 
 * @returns 
 */
export async function archiveToggleOneNoteController(req, res) {
  const response = new MyResponse();
  const { notes_id, user_id } = req.body;
  const { error, value } = NotesDeleteSchema.validate(
    { user_id: user_id, notes_id: notes_id },
    { abortEarly: false }
  );
  if (error) {
    response.pushError(error);
    response.setStatus(status.badrequest);
    return res.json(response);
  }
  await archiveToggleOneNote(value, response);
  res.json(response);
}
/**
 * Search a word from all note Controller
 * @param {user_id,word} req 
 * @param {response object} res 
 * @returns 
 */
export async function searchFromAllNoteController(req, res) {
  const response = new MyResponse();
  const { user_id, word } = req.body;
  const { error, value } = NotesSearchSchema.validate(
    { user_id: user_id, word: word },
    { abortEarly: false }
  );
  if (error) {
    response.pushError(error);
    response.setStatus(status.badrequest);
    return res.json(response);
  }
  await searchAllMatchedNote(value, response);
  res.json(response);
}
