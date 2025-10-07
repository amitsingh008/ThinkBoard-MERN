import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import path from "path"

import notesRoutes from "./routes/notesRoutes.js";
import {connectDB} from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";



dotenv.config();

const app=express();
const PORT=process.env.PORT || 5001
const __dirname=path.resolve();

// middleware
if(process.env.NODE_ENV !=="production"){
  app.use(cors(
   {
     origin:"http://localhost:5173"
   }
));
}
app.use(express.json());  //this middleware will parese json bodies: req.body
// app.use((req, res, next) => {
//   console.log(`Request received: ${req.method} ${req.url}`);
//   next();
// });
app.use(rateLimiter);

app.use("/api/notes",notesRoutes);


// app.get("/api/notes",(req,res)=>{
//     // delete a note
//     res.send("you are live");
// });

// app.post("/api/notes",(req,res)=>{
//     res.status(201).json({message:"post created successfully!"})
// });
// app.put("/api/notes/:id",(req,res)=>{
//     res.status(200).json({message:"your post is updated"})
// });

// app.delete("/app/notes/:id",(req,res)=>{
//     res.status(200).json({message:"Note deleted successfully"})
// })

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")));

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
});
}
connectDB().then(()=>{
    app.listen(5001,()=>{
    console.log("server started on port:",PORT)
});
});



//mongodb+srv://amitsingh80855_db_user:GeWcMcl8xg0eZVfy@cluster0.2bh7v44.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0