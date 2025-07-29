import { ArrowRight } from 'lucide-react';

export default function SubmitButton({ isLoading, onClick, label = "Submit" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading}
      className="w-full bg-gradient-to-r from-blue-700 to-blue-800 text-white font-semibold py-4 px-6 rounded-2xl hover:from-blue-800 hover:to-blue focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg flex items-center justify-center space-x-2"
    >
      {isLoading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
      ) : (
        <>
          <span>{label}</span>
          <ArrowRight className="h-5 w-5" />
        </>
      )}
    </button>
  );
}