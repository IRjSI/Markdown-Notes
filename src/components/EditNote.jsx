import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "github-markdown-css";
import './markdown.css';
import { useForm } from "react-hook-form";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";

const EditNote = () => {
    const [note, setNote] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { status, userData } = useSelector((state) => state.auth);
    const [notes, setNotes] = useState([]);
    const { slug } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, watch, setValue } = useForm({
        defaultValues: {
            title: '',
            content: '',
        },
    });
    let content = watch('content',note?.content || '');
    let title = watch('title',note?.title || '');

    useEffect(() => {
        const allNotes = async () => {
          try {
            const response = await appwriteService.getNotes();
            
            if (response) {
              setNotes(response.documents);
            }
          } catch (error) {
            console.error("Failed to fetch notes:", error);
          } finally {
            setIsLoading(false);
          }
        }
    
        if (status) allNotes();
    }, [status])

    useEffect(() => {
        if (slug) {
            appwriteService.getNote(slug).then((note) => {
                if (note) {
                    setNote(note);
                    setValue('title', note.title);
                    setValue('content', note.content);
                }
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    if (!status) {
      return <Login />; // Redirect to login if not authenticated
    }
    
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#fafafa]"></div>
        </div>
      );
    }

    const editNote = async (data) => {
        try {
          await appwriteService.updateNote(slug,{...data});
          setNotes((prevNotes) => (prevNotes.map((note) => (
            note.slug === data.slug ? { ...note, ...data } : note
          ))))
        } catch (error) {
          console.log("editNote::error::",error);
        }
    }

    const deleteNote = async () => {
      try {
        await appwriteService.deleteNote(slug)
        navigate('/')
      } catch (error) {
        console.log('deleteNote error');
      }
    }

    return (
        <div className='flex'>

        <div className='m-4 border-e-[1.5px] border-[#27272a]'>
            <div className=''>
            <Link to={`/`}>
              All Notes
            </Link>
            {notes.map((note) => (
              note.userID === userData?.userData?.$id ? <div key={note.$id} className='p-2 w-48'>
                <Sidebar {...note} />
              </div> : null
            ))}
            <div className='p-2'>
              <Link to={`/`} className={`text-[#bbbbbb] p-4 my-4 hover:rounded-md hover:cursor-pointer hover:bg-[#27272a] w-full `}>
                +New Note
              </Link>
            </div>
            </div>
        </div>

        <div className="flex flex-col justify-center items-center">

            <div className="flex flex-col justify-center items-center min-h-screen bg-[#09090b] text-[#fafafa]">
                <form onSubmit={handleSubmit(editNote)}>
                  
                <div className="flex gap-4">
            
                  <div className="w-[700px] h-[500px] rounded-lg border-[1.5px] border-[#27272a] bg-[#09090b] p-6 focus:outline-none flex flex-col gap-4 shadow-lg">
                    <div className="text-3xl font-semibold">
                      <input
                        type="text"
                        placeholder="Title"
                        className="bg-transparent focus:outline-none placeholder-[#bbbbbb] w-full"
                        {...register("title", { required: true })}
                        />
                      <div className="border-b-[1.5px] border-[#27272a] mt-2"></div>
                    </div>
                    <textarea
                      placeholder="Type here..."
                      className="bg-transparent focus:outline-none placeholder-[#bbbbbb] w-full h-full resize-none"
                      {...register("content", { required: true })}
                      />
                  </div>
            
                  <div className="w-[550px] h-[500px] rounded-lg border-[1.5px] border-[#27272a] bg-[#09090b] p-6 shadow-lg overflow-y-auto">
                    
                    {title ? <div className="text-3xl font-semibold mb-4 text-[#fafafa]">{title}</div> : <div className='text-center text-[#bbbbbb]'>Preview</div>}
            
                    <div className="markdown-body bg-transparent text-[#fafafa]">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
                    </div>
            
                  </div>
                </div>
            
                <div className="p-4">
                  <button className="bg-[#fafafa] hover:bg-[#e1e1e1] text-black font-semibold px-6 py-2 rounded-md border-2 border-black shadow-md transition-all hover:transition-all">
                    Save Changes
                  </button>
                <button type="button" onClick={deleteNote} className="ml-4 bg-red-600 hover:bg-red-700 text-black font-semibold px-6 py-2 rounded-md border-2 border-black shadow-md transition-all hover:transition-all">
                    Delete Note
                </button>
                </div>
                </form>
              </div>
        </div>
    </div>
    );
}

export default EditNote
