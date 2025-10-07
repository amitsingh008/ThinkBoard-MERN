import Navbar from "../components/Navbar";
import {useState} from "react"
import RateLimitedUI from "../components/RateLimitedUI";
import { useEffect } from "react";
import api from "../lib/axios";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";
const HomePage = () => {
 const [isRateLimited,setIsReateLimited]=useState(false);
 const [notes,setNotes] =useState([])
 const [loading,setLoding]=useState(true)

 useEffect(()=>{
    const fetchNotes=async()=>{
        try {
            const res=await api.get("/notes");
            setNotes(res.data)
            setIsReateLimited(false)
        } catch (error) {
            console.log("error fetching notes");
            console.log(error);
            if(error.response?.status===429)
            {
                setIsReateLimited(true)
            }
            else{
                toast.error("failed to load notes")
            }
            
        }
        finally{
            setLoding(false);
        }
    };
    fetchNotes();
 },[]);
  return (
    <div className="min-h-screen">
        <Navbar/>
        {isRateLimited&&<RateLimitedUI/>}
        <div className="max-w-7xl mx-auto p-4 mt-6">
            {loading && <div className="text-center text-primary py-10">Loading notes...</div>}
             {notes.length===0&&!isRateLimited && <NotesNotFound/>}
            {notes.length>0 &&!isRateLimited &&(
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                    {notes.map(note=>(
                        <div key={note._id}>
                           <NoteCard note={note} setNotes={setNotes}/>
                        </div>
                    ))}

                </div>
            )}

        </div>
    </div>
  );
}
export default HomePage;
