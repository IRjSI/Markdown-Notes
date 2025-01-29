import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "github-markdown-css";
import './markdown.css';
import { useForm } from 'react-hook-form';
import appwriteService from '../../appwrite/config'
import { ID } from 'appwrite';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import Header from './Header/Header';

function Home() {
  
  const { status, userData } = useSelector((state) => state.auth);
  const { register, handleSubmit, watch } = useForm();
  
  const content = watch('content','');
  const title = watch('title','');

  const [notes,setNotes] = useState([]);

  useEffect(() => {
    const allNotes = async () => {
      try {
        const response = await appwriteService.getNotes();
        // console.log(response.documents);
        
        if (response) {
          setNotes(response.documents);
        }
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    }

    allNotes();
  }, [])

  const addNote = async (data) => {
    try {
      data.slug = String(ID.unique());
      await appwriteService.createNote({ ...data });
      setNotes((prevNotes) => [...prevNotes, data])
    } catch (error) {
      console.log("addNote::error::",error);
    }
  }

  return status ? (
    <div className='flex'>

    <div className='m-4 border-e-2 border-[#1f2937]'>
        <div className=''>
          <Link to={`/`}>
            All Notes
          </Link>
        {notes.map((note) => (
            <div key={note.$id} className='p-2 w-48'>
              <Sidebar {...note} />
            </div>
        ))}
        <div className='p-2'>
          <Link to={`/`} className={`text-[#c3cbd9] p-4 my-4 hover:rounded-md hover:cursor-pointer hover:bg-[#1f2937] w-full `}>
            +New Note
          </Link>
        </div>
        </div>
      </div>

    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-gray-100">
    <form onSubmit={handleSubmit(addNote)}>
      
    <div className="flex gap-4">

      <div className="w-[600px] h-[400px] rounded-md bg-gray-800 p-6 focus:outline-none flex flex-col gap-4 shadow-lg">
        <div className="text-3xl font-semibold">
          <input
            type="text"
            placeholder="Title"
            className="bg-transparent focus:outline-none placeholder-gray-400 w-full"
            {...register("title", { required: true })}
            />
          <div className="border-b-2 border-gray-500 mt-2"></div>
        </div>
        <textarea
          placeholder="Type here..."
          className="bg-transparent focus:outline-none placeholder-gray-400 w-full h-full resize-none"
          {...register("content", { required: true })}
          />
      </div>

      <div className="w-[500px] h-[400px] rounded-md bg-gray-800 p-6 shadow-lg overflow-y-auto">
        
        {title ? <div className="text-3xl font-semibold mb-4">{title}</div> : <div className='text-center text-gray-400'>Preview</div>}

        <div className="markdown-body bg-transparent">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>

      </div>
    </div>

    <div className="p-4">
      <button className="bg-purple-500 hover:bg-purple-600 text-black font-semibold px-6 py-2 rounded-md border-2 border-black shadow-md transition-all hover:transition-all">
        Add Note
      </button>
    </div>
    </form>
  </div>
  </div>

  ) : <div className='text-3xl text-center w-full'>Login...</div>
}

export default Home
