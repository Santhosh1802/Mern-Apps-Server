import Notes from "../models/notesModel.js";
import { formatDate, now } from "../utils/dateUtil.js";
import { status } from "../utils/StatusUtil.js";

export async function createOneNote(data, response) {
  const newNote = new Notes({
    title: data.title,
    content: data.content,
    created_by: data.user_id,
    created_on: formatDate(),
    edited_on: formatDate(),
    isArchived: false,
  });
  await newNote.save();
  response.setMessage("Note Created");
  response.setStatus(status.created);
  return;
}
export async function editOneNote(data, response) {
  const note = await Notes.findOne({
    _id: data.notes_id,
    created_by: data.user_id,
  });
  if (!note) {
    response.setMessage("Note not found");
    response.setStatus(status.conflict);
    return;
  }
  await Notes.updateOne(
    { _id: data.notes_id },
    { title: data.title, content: data.content, edited_on: formatDate() }
  );
  response.setMessage("Note Updated");
  response.setStatus(status.ok);
  return;
}
export async function getAllNotesOfUser(data, response) {
  const notes = await Notes.find({ created_by: data.user_id });
  if (!notes) {
    response.setMessage("No Notes Found");
    response.setStatus(status.nocontent);
    return;
  }
  response.setMessage("Notes Found");
  response.setData(notes);
  response.setStatus(status.ok);
  return;
}
export async function deleteOneNote(data, response) {
  const note = await Notes.findOne({
    _id: data.notes_id,
    created_by: data.user_id,
  });
  if (!note) {
    response.setMessage("Note not found");
    response.setStatus(status.conflict);
    return;
  }
  await Notes.deleteOne({ _id: data.notes_id });
  response.setMessage("Note deleted");
  response.setStatus(status.ok);
  return;
}
export async function archiveToggleOneNote(data, response) {
  const note = await Notes.findOne({
    _id: data.notes_id,
    created_by: data.user_id,
  });
  if (!note) {
    response.setMessage("Note not found");
    response.setStatus(status.conflict);
    return;
  }
  if (note.isArchived === false) {
    await Notes.updateOne({ _id: data.notes_id }, { isArchived: true });
    response.setMessage("Note is now archived");
  } else if (note.isArchived === true) {
    await Notes.updateOne({ _id: data.notes_id }, { isArchived: false });
    response.setMessage("Note is now not archived");
  }
  response.setStatus(status.ok);
  return;
}
export async function searchAllMatchedNote(data, response) {
  const notes = await Notes.find({
  created_by: data.user_id,
  $or: [
    { title:   { $regex: data.word, $options: "i" } },
    { content: { $regex: data.word, $options: "i" } }
  ]
});
  if(!notes){
    response.setMessage("No Notes Found for the given query");
    response.setStatus(status.nocontent);
    return;
  }
  response.setMessage("Some Notes found");
  response.setData(notes);
  response.setStatus(status.ok);
  return;
}
