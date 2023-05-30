/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import Confetti from 'react-confetti';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, removeContact, updateContact } from 'redux/slices/contactSlice';

const Contacts: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateIndex, setUpdateIndex] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  //setting up the different packages for rendering contact info
  //using react hook for getting the data from user
  //confetti for visually cool looking as i got less time for design i come up with this idea
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  //dependency for react hook form

  const togglePopup = () => {
    setIsOpen(!isOpen);
    setIsUpdate(false);
  };
  //popup modal for form
  const countriesData = useSelector((state: any) => state.contact.list);
  const dispatch = useDispatch();
  console.log(countriesData);
  const onSubmit = (data: any) => {
    if (isUpdate) {
      let requiredData = [...countriesData];
      // store data in redux
      if (updateIndex) requiredData[updateIndex] = data;
      dispatch(updateContact(requiredData));
      console.log(requiredData, 'form data');
      setShowConfetti(true);
      setIsUpdate(false);
      setUpdateIndex(null);
      togglePopup();
      //conditional rendering for open and close modal and submit the form
      return;
    }
    dispatch(addContact([...countriesData, data]));
    setShowConfetti(true);
    togglePopup();
  };
  const onUpdate = (index: any, value: any) => {
    //while update the value the old stored value should bind into the existing form
    console.log(index);
    togglePopup();
    reset(value);
    setIsUpdate(true);
    setUpdateIndex(index);
    //index for tracking which card should update
  };
  const onDelete = (index: any) => {
    console.log(index);
    let newData = countriesData;
    // deleting the exist data from redux using filter to find the index number and delete the data
    //don't mind for the any keyword as it is for data type bypass method that i learnt from WorkBench
    newData = newData.filter((x: any, i: any) => i != index);
    console.log(newData);
    dispatch(removeContact(newData));
    //Finally removed
  };

  return (
    <>
      {!countriesData.length && (
        //initial design to show user you can add your contact over here by clicking the create contact button
        <div className="flex items-center justify-center">
          <div className="text-2xl h-48 w-full md:w-1/2 lg:w-1/3 bg-gray-200 shadow-lg flex flex-col items-center justify-center p-4">
            <p className="text-center mb-4">
              No Contacts Found <br />
              Please add Contact from <br />
              Create Contact Button
            </p>
          </div>
        </div>
      )}

      <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {countriesData?.map((item: any, index: any) => {
          return (
            <div key={index} className="rounded overflow-hidden shadow-lg glass-box">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Name:</div>
                {/* bind those name into card */}
                <p className="text-gray-700 text-base">{`${item.firstName} ${item.lastName}`}</p>
              </div>
              <div className="flex justify-center mb-2 mt-4 space-x-6 md:mt-6">
                <button
                  onClick={() => {
                    onUpdate(index, item);
                    //calling update function to keep track of the on click function and the index number to delate the particular data
                  }}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    onDelete(index);
                    //tacking index number to delete the data
                  }}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center items-center">
        <button
          className="inline-flex items-center justify-center w-80 h-12 px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={togglePopup}
        >
          Create Contact
        </button>
      </div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 w-full">
          <div className="bg-white relative p-4 rounded-lg w-full max-w-xl">
            <button
              type="button"
              className="bg-white absolute top-0 right-0 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setIsOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* react hook form data collector */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                  First Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="First name goes here"
                  {...register('firstName', { required: true })}
                  //destructuring register object to store the data
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Last Name goes here"
                  {...register('lastName', { required: true })}
                  //destructuring register object to store the data
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                >
                  Save Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showConfetti && (
        //now here is the logic of when to open the confetti pack
        <div className="fixed inset-0 flex items-center justify-center">
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={1000}
            //1000 dust is too much i guess
            onConfettiComplete={() => setShowConfetti(false)}
          />
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-4 rounded-lg">
              <h2 className="text-7xl text-stone-200">Congratulations!</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Contacts;
