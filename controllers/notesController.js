import { NotesSchema } from "../utils/InputSchema.js";
import { MyResponse } from "../utils/MyResponse.js";
import { status } from "../utils/StatusUtil.js";

/**
 * Create One Note 
 * @param {title, content, user_id} req 
 * @param {response object} res 
 */
export async function createOneNoteController(req,res) {
    const response=new MyResponse();
    const{title,content,user_id} = req.body;
    const {error,value}=NotesSchema.validate({title:title,content:content,user_id:user_id},{abortEarly:false});
    if(error){
        response.pushError(error);
        response.setStatus(status.badrequest);
        return;
    }
    res.json(response);
}


export async function getAllNotesController(req,res) {
    const response=new MyResponse();
    res.json(response);
}
export async function editOneNoteController(req,res) {
    const response=new MyResponse();
    res.json(response);
}
export async function deleteOneNoteController(req,res) {
    const response=new MyResponse();
    res.json(response);
}

export async function archiveToggleOneNoteController(req,res){
    const response=new MyResponse();
    res.json(response);
}