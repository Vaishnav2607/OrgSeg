import React, { useState } from 'react';
import { HashLoader } from 'react-spinners';
import DoctorCard from '../components/DoctorCard';

const ChatPage = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [appDoc, setAppDoc] = useState('');
  const [nearbyDoctors, setNearbyDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const template = "You are a medical practitioner and an expert in analyzing medical-related questions working for a very reputed hospital. You will be provided with text and you need to identify the anomalies, any disease or health issues. You need to generate the result in a detailed manner. Write all the findings, next steps, recommendations, etc. You only need to respond if the text is related to a human body and health issues. You must have to answer but also write a disclaimer saying that 'Consult with a Doctor before making any decisions'. Remember, if certain aspects are not clear from the text, it's okay to state 'Unable to determine based on the provided text.' Now analyze the text and answer the above questions in the same structured manner defined above. If you are doubtful ask more questions relevantly.";
  const [chat_history, setChat_history] = useState([{ role: 'system', content: template }]);
  const [location, setLocation] = useState('');

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedChatHistory = [...chat_history, { role: 'user', content: prompt }];
      setChat_history(updatedChatHistory);

      const response = await fetch('http://localhost:5000/process_text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, chat_history: updatedChatHistory, location }),
      });

      const data = await response.json();

      if (response.ok) {
        setResponse(data.llm_res);
        setAppDoc(data.app_doc);
        setNearbyDoctors(data.nearby_doctors || []);
        setChat_history([...updatedChatHistory, { role: 'assistant', content: data.llm_res }]);
      } else {
        setResponse('An error occurred while processing your request.');
      }
    } catch (error) {
      console.error('Error:', error);
      setResponse('An error occurred while processing your request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="bg-white rounded-lg shadow-lg p-0 w-full max-w-115xl">
    <div className="bg-gradient-to-br from-green-200 to-blue-900 flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Ask a Question</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="prompt" className="block text-gray-700 font-bold mb-2">
            Question:
          </label>
          <textarea
            value={prompt}
            onChange={handlePromptChange}
            placeholder="Enter your question..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-green-500"
          ></textarea>
          <div className="mb-4">
            <label htmlFor="location" className="block text-gray-700 font-bold mb-2">
              Location:
            </label>
            <textarea
              id="location"
              value={location}
              onChange={handleLocationChange}
              placeholder="Enter your Address"
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            />
          </div>
          {!loading && (
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:bg-green-700"
            >
              Submit
            </button>
          )}
        </form>
        {loading && (
          <div className="flex justify-center mt-4">
            <HashLoader color="#43A047" size={50} />
          </div>
        )}
        {response && !loading && (
          <div className="mt-8 border border-gray-300 rounded-md p-4">
            <h2 className="text-xl font-bold mb-2">Response:</h2>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{response}</pre>
          </div>
        )}
        {appDoc && !loading && (
          <div className="mt-8 border border-gray-300 rounded-md p-4">
            <h2 className="text-xl font-bold mb-2">Doctor to Consult:</h2>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{appDoc}</pre>
          </div>
        )}
        {nearbyDoctors.length > 0 && !loading && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Nearby Doctors:</h2>
            <div className="flex flex-wrap justify-center">
              {nearbyDoctors.map((doctor, index) => (
                <DoctorCard key={index} doctor={doctor} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    // </div>
  );
};

export default ChatPage;