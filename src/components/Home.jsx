import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "github-markdown-css";
import './markdown.css';
import { useForm } from 'react-hook-form';
import appwriteService from '../appwrite/config';
import { ID } from 'appwrite';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import LandingPage from './LandingPage';
import { FaBars, FaTimes } from 'react-icons/fa';

function Home() {
  const { status, userData } = useSelector((state) => state.auth);
  const id = userData?.userData?.$id;
  console.log(id);
  
  
  const [isDisabled, setIsDisabled] = useState(false);
  const [btnText, setBtnText] = useState('Add Note');
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

  const { register, handleSubmit, watch } = useForm();
  const content = watch('content', '');
  const title = watch('title', '');

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
    };

    if (status) allNotes();
  }, [status]);

  if (!status) {
    return <LandingPage />; 
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
      const response = await appwriteService.createNote({ ...data, userID: id });
      if (response) {
        setNotes((prevNotes) => [...prevNotes, response]);
        setIsDisabled(true);
        setBtnText('Added!');
      }
    } catch (error) {
      console.log("addNote::error::", error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className='flex flex-col md:flex-row min-h-screen bg-[#09090b] text-[#fafafa]'>
      <div className="md:hidden p-4">
        <button
          onClick={toggleSidebar}
          className="text-[#fafafa] focus:outline-none"
        >
          {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      <div
        className={`fixed md:relative inset-y-0 left-0 w-48 bg-[#09090b] transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-50 sm:z-10  md:border-e-[1.5px] md:border-[#27272a] p-4`}
      >
        <div className='mb-4'>
          <Link to={`/`} className="block mb-4">
            All Notes
          </Link>
          <Link to={`/edit-note/87654242424`} className={`text-[#fafafa] p-1 pl-2 hover:rounded-md hover:cursor-pointer hover:bg-[#27272a] w-full truncate`}>
            Sample Note
          </Link>
          {notes.map((note) =>
            note.userID === id ? (
              <div key={note.$id} className='p-2'>
                <Sidebar {...note} />
              </div>
            ) : null
          )}
          <div className='p-2'>
            <Link to={`/`} className="text-[#bbbbbb] p-3 my-4 hover:rounded-md hover:cursor-pointer hover:bg-[#27272a] w-full block">
              +New Note
            </Link>
          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      <div className="flex-1 p-4">
        <form onSubmit={handleSubmit(addNote)} className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">

            <div className="w-full md:w-1/2 h-[500px] rounded-lg border-[1.5px] border-[#27272a] bg-[#09090b] p-6 focus:outline-none flex flex-col gap-4 shadow-lg">
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

            <div className="w-full md:w-1/2 h-[500px] rounded-lg border-[1.5px] border-[#27272a] bg-[#09090b] p-6 shadow-lg overflow-y-auto">
              {title ? (
                <div className="text-3xl font-semibold mb-4 text-[#fafafa]">{title}</div>
              ) : (
                <div className='text-center text-[#bbbbbb]'>Preview</div>
              )}
              <div className="markdown-body bg-transparent text-[#fafafa]">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
              </div>
            </div>
          </div>

          <div className="p-4">
            <button
              disabled={isDisabled}
              className={`bg-[#fafafa] hover:bg-[#e1e1e1] text-black font-semibold px-6 py-2 rounded-md border-2 border-black shadow-md transition-all hover:transition-all ${
                isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              {btnText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;