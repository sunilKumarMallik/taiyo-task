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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const togglePopup = () => {
    setIsOpen(!isOpen);
    setIsUpdate(false);
  };
  const countriesData = useSelector((state: any) => state.contact.list);
  const dispatch = useDispatch();
  console.log(countriesData);
  const onSubmit = (data: any) => {
    if (isUpdate) {
      let requiredData = [...countriesData];
      if (updateIndex) requiredData[updateIndex] = data;
      dispatch(updateContact(requiredData));
      console.log(requiredData, 'form data');
      setShowConfetti(true);
      setIsUpdate(false);
      setUpdateIndex(null);
      togglePopup();
      return;
    }
    dispatch(addContact([...countriesData, data]));
    setShowConfetti(true);
    togglePopup();
  };
  const onUpdate = (index: any, value: any) => {
    console.log(index);
    togglePopup();
    reset(value);
    setIsUpdate(true);
    setUpdateIndex(index);
  };
  const onDelete = (index: any) => {
    console.log(index);
    let newData = countriesData;
    newData = newData.filter((x: any, i: any) => i != index);
    console.log(newData);
    dispatch(removeContact(newData));
  };

  return (
    <>
      {!countriesData.length && (
        <div className="flex items-center justify-center">
          <div className="text-2xl h-48 w-1/4 bg-gray-200 shadow-lg flex items-center justify-center">
            No Contacts Found <br />
            Please add Contact from <br />
            Create Contact Button
          </div>
        </div>
      )}

      <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {countriesData?.map((item: any, index: any) => {
          return (
            <div key={index} className="rounded overflow-hidden shadow-lg glass-box">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Name:</div>
                <p className="text-gray-700 text-base">{`${item.firstName} ${item.lastName}`}</p>
              </div>
              <div className="flex justify-center mb-2 mt-4 space-x-6 md:mt-6">
                <button
                  onClick={() => {
                    onUpdate(index, item);
                  }}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    onDelete(index);
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
          <div className="bg-white p-4 rounded-lg w-full max-w-xl">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                  First Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="First name goes here"
                  {...register('firstName', { required: true })}
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
        <div className="fixed inset-0 flex items-center justify-center">
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={1000}
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
