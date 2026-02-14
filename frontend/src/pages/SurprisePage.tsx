import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSurprise } from '../hooks/useSurprise';
import LandingPage from './LandingPage';
import MessagePage from './MessagePage';
import GalleryPage from './GalleryPage';
import QuizPage from './QuizPage';
import FinalPage from './FinalPage';
import ProgressIndicator from '../components/ProgressIndicator';
import MusicToggle from '../components/MusicToggle';

const SurprisePage = () => {
  const { code } = useParams<{ code: string }>();
  const [step, setStep] = useState(0);
  const { data, isLoading, error } = useSurprise(code || '');

  if (isLoading) {
    return (
      <div className="page-wrap flex items-center justify-center">
        <div className="page-content max-w-sm">
          <div className="glass-card p-8 text-center">
            <p className="mb-3 text-5xl">💖</p>
            <p className="text-lg font-semibold text-slate-700">Loading surprise...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="page-wrap flex items-center justify-center">
        <div className="page-content max-w-md">
          <div className="glass-card p-8 text-center">
            <p className="mb-3 text-5xl">💔</p>
            <h2 className="mb-2 text-2xl font-bold text-slate-800">Surprise tidak ditemukan</h2>
            <p className="text-sm text-slate-600">
              Cek kembali link yang kamu gunakan, lalu coba buka lagi.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const totalSteps = 5;

  return (
    <>
      <ProgressIndicator currentStep={step + 1} totalSteps={totalSteps} />
      <MusicToggle />

      {step === 0 && <LandingPage onNext={() => setStep(1)} recipientName={data.surprise.recipient_name} />}

      {step === 1 && <MessagePage onNext={() => setStep(2)} message={data.surprise.message} />}

      {step === 2 && <GalleryPage onNext={() => setStep(3)} gallery={data.gallery} />}

      {step === 3 && <QuizPage onNext={() => setStep(4)} quiz={data.quiz} />}

      {step === 4 && <FinalPage surpriseId={data.surprise.id} />}
    </>
  );
};

export default SurprisePage;
