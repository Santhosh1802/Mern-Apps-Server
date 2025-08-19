import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
  title: {
    type: String, //notes title may be empty
  },
  content: {
    type: String, //notes content is required without it notes is discarded
    required: true,
  },
  created_by: {
    type: mongoose.Schema.ObjectId, //object id of user who created this notes
    required: true,
    ref: "Users",
  },
  created_on: {
    type: Date, //time when notes is created
    required: true,
  },
  edited_on: {
    type: Date, //time when notes is edited at last
  },
  isArchived: {
    type: Boolean, //boolean variable to make notes as archived one
    default: false,
  },
});

const Notes = mongoose.model("notes", notesSchema);
export default Notes;
