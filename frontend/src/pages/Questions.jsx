import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Questions = () => {
  const [data, setData] = useState(null);
  const [showModel, setShowModel] = useState(false);
  const [showteacherModel, setShowteacherModel] = useState(false);
  const [render, setRender] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [comments, setComments] = useState({});
  const userId = localStorage.getItem('id');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/questions', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    };
    fetchData();
  }, [render]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/users/user/${userId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();
        setUserProfile(result);
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    };
    fetchData();
  }, []);

  const handleComment = async (questionId, e) => {
    e.preventDefault();

    const comment = comments[questionId]; // Get the comment for the specific question

    if (!comment || comment === '') {
      return;
    }

    const bodyData = {
      question: questionId,
      content: comment,
      author: userId,
    };

    try {
      const response = await fetch('http://localhost:5000/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      console.log('result: ', result);

      setRender(!render);
      // Clear the comment field after submission
      setComments((prevComments) => ({
        ...prevComments,
        [questionId]: '',
      }));
    } catch (error) {
      console.error('Error posting data:', error);
      throw error;
    }
  };

  const handleCreateQuestion = () => {
    if (userId == null || userId == undefined) {
      navigate('/user');
    } else {
      if (userProfile?.role == 'student') {
        setShowModel(!showModel);
      } else {
        setShowteacherModel(!showteacherModel);
      }
    }
  };

  return (
    <div class='bg-white sm:px-6 px-4 py-10 font-[sans-serif]'>
      <div class='max-w-xl mx-auto'>
        <div>
          <div className='flex items-center justify-between'>
            <h2 class='text-3xl font-extrabold text-[#333] inline-block'>
              Questions
            </h2>
            <button
              onClick={handleCreateQuestion}
              className='flex items-center justify-end bg-blue-700 text-white transition-all ease px-3 py-1 rounded-full ml-auto mr-0'
            >
              create question
            </button>
          </div>
          <p class='text-gray-400 text-sm mt-4'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
            accumsan, nunc et tempus blandit, metus mi consectetur felis turpis
            vitae ligula.
          </p>
        </div>
        <hr class='my-10' />
        <div class='grid gap-4'>
          {data &&
            data.map((items, i) => (
              <div key={i} className='w-full border-b-2 pb-4'>
                <div
                  onClick={() =>
                    navigate('/question-details', { state: { data: items } })
                  }
                  className='cursor-pointer rounded overflow-hidden group'
                >
                  <div>
                    <div className='flex items-center gap-3'>
                      <p className='text-xs text-gray-400'>
                        BY: {items?.author?.username}
                      </p>
                      <span className='text-sm block text-gray-400'>
                        {items?.createdAt?.split('T')[0]}
                      </span>
                    </div>
                    <h3 className='text-xl font-bold text-[#333] group-hover:text-blue-500 transition-all'>
                      {items?.title}
                    </h3>
                    <div className='mt-6'>
                      <p className='text-gray-400 text-sm'>{items?.content}</p>
                    </div>
                  </div>
                </div>
                <div className='w-full group'>
                  {items?.correctAnswer && (
                    <>
                      <p className='text-lg text-gray-500 py-2'>
                        Correct Answer
                      </p>
                      <div className='ml-4 '>
                        <p className='text-xs text-gray-400'>
                          BY: {items?.correctAnswer?.auther?.username}
                        </p>
                        <p className='text-gray-400 ml-2'>
                          {items?.correctAnswer?.content}
                        </p>
                      </div>
                      <button className='font-bold cursor-pointer text-[#333] group-hover:text-blue-500 transition-all py-3'>
                        See all answers...
                      </button>
                    </>
                  )}
                </div>
                <div className='w-full group'>
                  <p className='text-lg text-gray-500 py-2'>Comments</p>
                  <div className='w-full'>
                    <textarea
                      onChange={(e) =>
                        setComments({
                          ...comments,
                          [items._id]: e.target.value,
                        })
                      }
                      value={comments[items._id] || ''}
                      rows={2}
                      className='w-full border outline-0 px-3 py-1 rounded-xl'
                      placeholder='write comment...'
                    />
                    <button
                      onClick={(event) => handleComment(items._id, event)}
                      className='flex items-center justify-end bg-blue-700 text-white px-3 py-1 rounded-full ml-auto mr-0'
                    >
                      submit
                    </button>
                  </div>
                  {items?.comments?.length > 0 && (
                    <>
                      <div className='ml-4 '>
                        <p className='text-xs text-gray-400'>
                          BY: {items?.comments[0]?.auther?.username}
                        </p>
                        <p className='text-gray-400 ml-2'>
                          {items?.comments[0]?.content}
                        </p>
                      </div>
                      <button className='font-bold cursor-pointer text-[#333] group-hover:text-blue-500 transition-all py-3'>
                        See all...
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
      {showModel && (
        <Model
          handleShowModel={handleCreateQuestion}
          userProfile={userProfile}
          render={render}
          setRender={setRender}
        />
      )}
      {showteacherModel && (
        <TeacherModel handleShowModel={handleCreateQuestion} />
      )}
    </div>
  );
};

const Model = ({ handleShowModel, userProfile, setRender, render }) => {
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const author = localStorage.getItem('id');
  const handlecreateQuestion = async (e) => {
    e.preventDefault();
    const data = {
      title: title,
      content: content,
      author: author,
      isAnonymous: userProfile?.username == 'Anonymous' ? true : false,
    };
    try {
      const response = await fetch('http://localhost:5000/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      console.log('result: ', result);
      setRender(!render);
      handleShowModel();
    } catch (error) {
      console.error('Error posting data:', error);
      throw error;
    }
  };
  return (
    <div class='fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]'>
      <form
        onSubmit={handlecreateQuestion}
        class='w-full max-w-lg bg-white shadow-lg rounded-md p-8 relative'
      >
        <svg
          onClick={handleShowModel}
          xmlns='http://www.w3.org/2000/svg'
          class='w-3.5 cursor-pointer shrink-0 fill-gray-800 hover:fill-red-500 float-right'
          viewBox='0 0 320.591 320.591'
        >
          <path
            d='M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z'
            data-original='#000000'
          ></path>
          <path
            d='M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z'
            data-original='#000000'
          ></path>
        </svg>
        <div class='my-8'>
          <h4 class='text-2xl text-center text-gray-800 font-bold'>
            Create a Question
          </h4>
          <label class='text-sm text-gray-700 mt-2'>Question Title</label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type='text'
            placeholder='Enter Question Title'
            class='px-4 py-2.5 mb-4 bg-[#f0f1f2] text-gray-800 w-full text-sm focus:bg-transparent outline-blue-600 rounded-md'
          />
          <label class='text-sm text-gray-700 '>Question Description</label>
          <textarea
            onChange={(e) => setContent(e.target.value)}
            value={content}
            type='text'
            rows={4}
            placeholder='Enter Question details'
            class='px-4 py-2.5 bg-[#f0f1f2] text-gray-800 w-full text-sm focus:bg-transparent outline-blue-600 rounded-md'
          />
        </div>
        <button
          type='submit'
          class='px-5 py-2.5 w-full rounded-md text-white text-sm outline-none bg-blue-600 hover:bg-blue-700'
        >
          Create
        </button>
      </form>
    </div>
  );
};
const TeacherModel = ({ handleShowModel }) => {
  return (
    <div class='fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]'>
      <form class='w-full max-w-lg bg-white shadow-lg rounded-md p-8 relative'>
        <svg
          onClick={handleShowModel}
          xmlns='http://www.w3.org/2000/svg'
          class='w-3.5 cursor-pointer shrink-0 fill-gray-800 hover:fill-red-500 float-right'
          viewBox='0 0 320.591 320.591'
        >
          <path
            d='M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z'
            data-original='#000000'
          ></path>
          <path
            d='M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z'
            data-original='#000000'
          ></path>
        </svg>
        <div class='my-8'>
          <h4 class='text-2xl text-center text-gray-800 font-bold'>
            Teacher Can't Create Questions
          </h4>
        </div>
        <button
          type='button'
          onClick={handleShowModel}
          class='px-5 py-2.5 w-full rounded-md text-white text-sm outline-none bg-blue-600 hover:bg-blue-700'
        >
          Okay
        </button>
      </form>
    </div>
  );
};

export default Questions;
