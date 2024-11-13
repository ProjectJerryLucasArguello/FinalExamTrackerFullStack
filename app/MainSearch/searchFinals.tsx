"use client";

import React, { useState } from 'react';
import axios from 'axios';

//List My inputs and outputs
type Parameter = {
  Exam_Component_ID: string;
  class: string;
  class_level: string;
};

type ExamResult = {
  Exam_Component_ID: number;
  Title: string;
  Date_of_Test: string;
  Time_of_Test: string;
  Building: string;
  Room: string;
  Instructor: string;
  class: string;
  class_level: string;
  message?: string;  // Optional message property for no results
};

//We are need of loop as user may need to input more parameters
const SearchFinals: React.FC = () => {
  const [parameters, setParameters] = useState<Parameter[]>([
    { Exam_Component_ID: '', class: '', class_level: '' },
  ]);

  {/*Results are stored in a list, while email is an input*/}
  const [results, setResults] = useState<ExamResult[]>([]);
  const [email, setEmail] = useState('');

  const addParameter = () =>
    setParameters([...parameters, { Exam_Component_ID: '', class: '', class_level: '' }]);

  {/*This updates one of the parameters say the users changes their input */}

  const handleInputChange = (index: number, field: keyof Parameter, value: string) => {
    const newParameters = [...parameters];
    newParameters[index][field] = value;
    setParameters(newParameters);
  };

  const searchDatabase = async () => {
    // Filter out empty parameters before sending the search request
    const filledParameters = parameters.filter(
      (param) => param.Exam_Component_ID && param.class && param.class_level
    );
  
    if (filledParameters.length === 0) {
      console.error('No complete parameters to search.');
      return;
    }
  
    try {
      const response = await axios.post<ExamResult[]>('http://localhost:5000/get_exam_info', filledParameters);
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

  /*const sendEmail = async () => {
    try {
      const response = await axios.post('http://localhost:5000/send_exam_info', {
        email,
        exam_info: results,
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Error sending email:', error);
    }*/

      const sendEmail = async () => {
        try {
          // Filter out any incomplete results
          if (!email) {
            alert("Please enter a valid email address.");
            return;
          }

          //Conditional statments in case the information of the final exam room does not provide the specific information
          const filledResults = results.map((result) => ({
            Exam_Component_ID: result.Exam_Component_ID,
            Title: result.Title || "No Title Available",
            Date_of_Test: result.Date_of_Test || "Date Not Set",
            Time_of_Test: result.Time_of_Test || "Time Not Set",
            Building: result.Building || "Building Information Unavailable",
            Room: result.Room || "Room Information Unavailable",
            Instructor: result.Instructor || "Instructor Not Assigned",
            class: result.class || "Class Name Missing",
            class_level: result.class_level || "Class Level Missing"
          }));
      
          /*if (filledResults.length === 0) {
            alert("No complete results available to send.");
            return;
          }*/
      
          // Log data for debugging
          console.log("Sending email with data:", { email, exam_info: filledResults });

          const response = await axios.post('http://localhost:5000/send_exam_info', {
            email,
            exam_info: filledResults,
          });
      
          alert(response.data.message);
        } catch (error) {
          console.error('Error sending email:', error);
          alert("An error occurred while sending the email. Please try again.");
        }
      };

  return (
    <div className="container">
      {/* Header and Parameter Input */}
      <div className="flex justify-center mt-4 overflow-x-auto">
        <div className="features-container flex border border-black bg-red-600 text-black px-4 py-2 rounded-t-md min-w-max">
        <h2 className="text-center mx-10 font-bold">Exam Component ID</h2>
        <h2 className="text-center mx-10 font-bold">Class Name</h2>
        <h2 className="text-center mx-10 font-bold">Class Level</h2>
      </div>
    </div>

      {/**Enable for mobile responsiveness opting for a scorll bar with the table overflows */}
      <div className="flex justify-center mt-2 overflow-x-auto">
        <div className="Insert-Para flex flex-col border border-black p-4 rounded-b-md min-w-max">
          {parameters.map((param, index) => (
            <div key={index} className="flex justify-between items-center border-b border-black py-2">
              <input
                type="text"
                placeholder="Exam Component ID"
                value={param.Exam_Component_ID}
                onChange={(e) => handleInputChange(index, 'Exam_Component_ID', e.target.value)}
                className="border border-black px-2 py-1 mx-2"
              />
              <input
                type="text"
                placeholder="Class Name"
                value={param.class}
                onChange={(e) => handleInputChange(index, 'class', e.target.value)}
                className="border border-black px-2 py-1 mx-2"
              />
              <input
                type="text"
                placeholder="Class Level"
                value={param.class_level}
                onChange={(e) => handleInputChange(index, 'class_level', e.target.value)}
                className="border border-black px-2 py-1 mx-2"
              />
            </div>
          ))}
        </div>
      </div>

      <div className='button-choices flex justify-center mt-2 space-x-8'>
        <button onClick={addParameter} className="bg-red-500 text-black px-4 py-2 rounded">
          Add Parameter
        </button>
        <button onClick={searchDatabase} className="bg-red-500 text-black px-4 py-2 rounded">
          Search
        </button>
      </div>

      {/* Results Display */}
      <div className="flex flex-col items-center mt-4 space-y-4">
        {results.length > 0 && results[0].message ? (
          <div className="text-red-600 text-center">
            {results[0].message}
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="border border-black min-w-full">
              <thead className='border border-black bg-red-600 text-black px-4 py-2 '>
                <tr>
                  <th className="px-4 py-2">Exam Component ID</th>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Date of Test</th>
                  <th className="px-4 py-2">Time of Test</th>
                  <th className="px-4 py-2">Building</th>
                  <th className="px-4 py-2">Room</th>
                  <th className="px-4 py-2">Instructor</th>
                  <th className="px-4 py-2">Class</th>
                  <th className="px-4 py-2">Class Level</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{result.Exam_Component_ID}</td>
                    <td className="px-4 py-2">{result.Title}</td>
                    <td className="px-4 py-2">{result.Date_of_Test}</td>
                    <td className="px-4 py-2">{result.Time_of_Test}</td>
                    <td className="px-4 py-2">{result.Building}</td>
                    <td className="px-4 py-2">{result.Room}</td>
                    <td className="px-4 py-2">{result.Instructor}</td>
                    <td className="px-4 py-2">{result.class}</td>
                    <td className="px-4 py-2">{result.class_level}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex flex-col items-center space-y-2">
          <input
            type="email"
            placeholder="Enter email to send results"
            value={email}
            onChange={handleEmailChange}
            className="border border-black px-2 py-1 mx-2"
          />
          <button onClick={sendEmail} className="bg-red-500 text-white px-4 py-2 rounded">
            Send Results to Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFinals;
