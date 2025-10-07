import Note from "../../models/Note.js";

export async function getAllNotes(req,res){
    try{
        const notes=await Note.find().sort({createdAt:-1});
        res.status(200).json(notes)
    }
    catch(error){
        console.error("error in get allNotes controller",error)
        res.status(500).json({message:"Internal server error"})
    }
};
export async function getNodeById(req,res) {
  try{
    const note=await Note.findById(req.params.id);
    if(!note) return res.status(404).json({message:"note not found!"});
    res.json(note);
  } 
  catch(err){
    console.error("Error in getAllNotes controller",err);
    res.status(500).json({message:"Interal server error"});

  }   
}
export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json({ message: "Note created successfully" });
  } catch (err) {
    console.error("Error in createNote controller", err);
    res.status(400).json({ message: "Note validation failed", error: err.message });
  }
}

export async function updateNote(req,res){
    try{
        const {title,content}=req.body;
       const updatedNote= await Note.findByIdAndUpdate(
        req.params.id,
        {title,content},
        {
         new:true,
        });
        res.status(200).json({message:"note updated success fully"});
        if(!updateNote) return res.status(404).json({message: "note not found"});
    }
    catch(err){
       console.error("Error in updateNote controller",err);
       res.status(500).json({message:"Internal server error"});
    }
};

export async function deleteNote(req,res){
    try{
        const {title,content}=req.body;
        const deleteNote=await Note.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"your note is deleted"});
        if(!deleteNote) return res.status(404).json({message:"note not found"});
    }
    catch(err){
         console.error("error in deleted controller",err);
         res.status(500).json({message:"Internal server error"});
    }
};