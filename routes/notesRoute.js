import express from "express";
import {
  archiveToggleOneNoteController,
  createOneNoteController,
  deleteOneNoteController,
  editOneNoteController,
  getAllNotesController,
  searchFromAllNoteController,
} from "../controllers/notesController.js";

const notesRouter = express.Router();
//Routes of notes start with /notes
notesRouter.post("/notes/add-one-note", createOneNoteController);
notesRouter.get("/notes/get-all-notes", getAllNotesController);
notesRouter.put("/notes/edit-one-note", editOneNoteController);
notesRouter.delete("/notes/delete-one-note", deleteOneNoteController);
notesRouter.put(
  "/notes/archive-toggle-one-note",
  archiveToggleOneNoteController
);
notesRouter.post("/notes/search-notes", searchFromAllNoteController);

export default notesRouter;
