import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'

const User = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('teacher');
  const [username, setUsername] = useState(null);
  const navigate = useNavigate()

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  const registerUser = async (e) => {
    e.preventDefault()
    const data = {
        role:selectedItem,
        username:username==null||username==''? 'Anonymous':username
    }
    try {
      const response = await fetch('http://localhost:5000/api/users/user', {
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
      localStorage.setItem('id',result?._id)
      // result;
      navigate('/')
    } catch (error) {
      console.error('Error posting data:', error);
      throw error;
    }
  };

  return (
    <div class='bg-gray-50 font-[sans-serif]'>
      <div class='min-h-screen flex flex-col items-center justify-center py-6 px-4'>
        <div class='max-w-md w-full'>
          <div class='p-8 rounded-2xl bg-white shadow'>
            <h2 class='text-gray-800 text-center text-2xl font-bold'>
              Welcome
            </h2>
            <form class='mt-8 space-y-4' onSubmit={registerUser}>
              <div className='relative inline-block w-full'>
                <label class='text-gray-800 text-sm mb-2 block'>
                  Are you Teacher or Student
                </label>
                <button
                  type='button'
                  id='dropdownToggle'
                  className='px-5 py-2.5 w-full flex items-center justify-between text-start border border-gray-300 rounded-md text-gray-800 text-sm outline-none bg-white hover:bg-gray-50'
                  onClick={toggleDropdown}
                >
                  {selectedItem}
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-3 fill-gray-500 inline ml-3'
                    viewBox='0 0 24 24'
                  >
                    <path
                      fillRule='evenodd'
                      d='M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>

                {isOpen && (
                  <ul
                    id='dropdownMenu'
                    className='absolute shadow-[0_8px_19px_-7px_rgba(6,81,237,0.2)] bg-white py-2 z-[1000] min-w-full w-max divide-y max-h-96 overflow-auto'
                  >
                    <li
                      className='py-3 px-5 hover:bg-gray-50 text-gray-800 text-sm cursor-pointer'
                      onClick={() => handleItemClick('teacher')}
                    >
                      teacher
                    </li>
                    <li
                      className='py-3 px-5 hover:bg-gray-50 text-gray-800 text-sm cursor-pointer'
                      onClick={() => handleItemClick('student')}
                    >
                      student
                    </li>
                  </ul>
                )}
              </div>
              <div>
                <label class='text-gray-800 text-sm mb-2 block'>
                  User name ( Optional )
                </label>
                <div class='relative flex items-center'>
                  <input
                    name='username'
                    type='text'
                    class='w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600'
                    placeholder='Enter user name'
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                  />
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='#bbb'
                    stroke='#bbb'
                    class='w-4 h-4 absolute right-4'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      cx='10'
                      cy='7'
                      r='6'
                      data-original='#000000'
                    ></circle>
                    <path
                      d='M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z'
                      data-original='#000000'
                    ></path>
                  </svg>
                </div>
              </div>

              <div class='!mt-8'>
                <button
                  type='submit'
                  class='w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none'
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
