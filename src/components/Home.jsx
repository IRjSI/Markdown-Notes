import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "github-markdown-css";
import './markdown.css';
import { useForm } from 'react-hook-form';
import appwriteService from '../appwrite/config'
import { ID } from 'appwrite';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import Login from './Login';
import LandingPage from './LandingPage';

function Home() {
  
  const { status, userData } = useSelector((state) => state.auth);
  const id = userData?.userData?.$id;
  const id2 = userData?.$id;
  
  const { register, handleSubmit, watch } = useForm();
  
  const content = watch('content','');
  const title = watch('title','');

  const [notes,setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const allNotes = async () => {
      try {
        const response = await appwriteService.getNotes([]);
        
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

  if (!status) {
    return <LandingPage />; // Redirect to login if not authenticated
  }
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#fafafa]"></div>
      </div>
    );
  }
  
  const addNote = async (data) => {
    try {
      data.slug = String(ID.unique());
      const response = await appwriteService.createNote({ ...data, userID:id || id2 });
      if (response) setNotes((prevNotes) => [...prevNotes, response])
    } catch (error) {
      console.log("addNote::error::",error);
    }
  }
  
  return (
    <div className='flex'>

    <div className='m-4 border-e-[1.5px] border-[#27272a]'>
        <div className='mb-4'>
          <Link to={`/`}>
            All Notes
          </Link>
          {notes.map((note) =>
            note.userID === id || id2 ? (
              <div key={note.$id} className='p-2 w-48'>
                <Sidebar {...note} />
              </div>
            ) : null
          )}
        <div className='p-2'>
          <Link to={`/`} className={`text-[#bbbbbb] p-4 my-4 hover:rounded-md hover:cursor-pointer hover:bg-[#27272a] w-full `}>
            +New Note
          </Link>
        </div>
        </div>
      </div>

    <div className="flex flex-col justify-center items-center max-h-screen bg-[#09090b] mt-12 text-[#fafafa]">
    <form onSubmit={handleSubmit(addNote)}>
      
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
        Add Note
      </button>
    </div>
    </form>
  </div>
  </div>

  )
}

export default Home
