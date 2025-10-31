import React, { useState } from 'react';
import Header from './components/Header';
import UserInputForm from './components/UserInputForm';
import OutputDisplay from './components/OutputDisplay';
import Loader from './components/Loader';
import Footer from './components/Footer';
import { generateOlympiadContent } from './services/geminiService';
import type { UserInput, OlympiadResponse } from './types';
import { parseOlympiadResponse } from './utils/parser';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [olympiadResponse, setOlympiadResponse] = useState<OlympiadResponse | null>(null);

  const handleGenerate = async (inputs: UserInput) => {
    setIsLoading(true);
    setError(null);
    setOlympiadResponse(null);
    try {
      const responseText = await generateOlympiadContent(inputs);
      const parsedResponse = parseOlympiadResponse(responseText);
      setOlympiadResponse(parsedResponse);
    } catch (err) {
      setError(err instanceof Error ? `Failed to generate content: ${err.message}` : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-textPrimary">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <UserInputForm onGenerate={handleGenerate} isLoading={isLoading} />
          <div className="mt-10">
            {isLoading && <Loader />}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-md" role="alert">
                <strong className="font-bold">Oops! Something went wrong.</strong>
                <span className="block sm:inline mt-1">{error}</span>
              </div>
            )}
            {olympiadResponse && <OutputDisplay response={olympiadResponse} />}
            {!isLoading && !error && !olympiadResponse && (
               <div className="text-center p-16 bg-surface rounded-xl shadow-md border border-gray-200">
                <h2 className="text-3xl font-bold text-primary mb-3">Welcome to Olympiad Prep Buddy!</h2>
                <p className="text-lg text-textSecondary">Your personalized Olympiad journey starts here. Fill out the form above to begin!</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;