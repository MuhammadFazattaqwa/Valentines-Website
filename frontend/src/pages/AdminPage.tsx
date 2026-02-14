import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { Surprise, Reply, Gallery, QuizQuestion } from '../types';

const AdminPage = () => {
  const storageBucket = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET || 'valentine-gallery';
  const [surprises, setSurprises] = useState<Surprise[]>([]);
  const [selectedSurprise, setSelectedSurprise] = useState<string | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [gallery, setGallery] = useState<Gallery[]>([]);
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'replies' | 'gallery' | 'quiz'>('replies');
  const [realtimeStatus, setRealtimeStatus] = useState<'connected' | 'connecting' | 'disconnected'>('disconnected');
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [quizSubmitting, setQuizSubmitting] = useState(false);
  const [quizFormError, setQuizFormError] = useState('');
  const [quizForm, setQuizForm] = useState({
    question: '',
    options: ['', '', '', ''],
    answerIndex: 0,
  });

  useEffect(() => {
    fetchSurprises();
  }, []);

  useEffect(() => {
    if (!selectedSurprise) {
      return;
    }

    fetchReplies(selectedSurprise);
    fetchGallery(selectedSurprise);
    fetchQuiz(selectedSurprise);
  }, [selectedSurprise]);

  useEffect(() => {
    if (!selectedSurprise) {
      setRealtimeStatus('disconnected');
      return;
    }

    setRealtimeStatus('connecting');

    const surpriseFilter = `surprise_id=eq.${selectedSurprise}`;
    const channel = supabase
      .channel(`admin-live-${selectedSurprise}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'gallery',
          filter: surpriseFilter,
        },
        (payload) => {
          if (payload.eventType === 'DELETE') {
            const deletedId = String(payload.old.id ?? '');
            if (!deletedId) {
              return;
            }

            setGallery((current) => current.filter((item) => item.id !== deletedId));
            return;
          }

          const changedRow = payload.new as Gallery;
          setGallery((current) => {
            const index = current.findIndex((item) => item.id === changedRow.id);
            if (index === -1) {
              return [changedRow, ...current];
            }

            const updated = [...current];
            updated[index] = changedRow;
            return updated;
          });
        },
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'quiz_questions',
          filter: surpriseFilter,
        },
        (payload) => {
          if (payload.eventType === 'DELETE') {
            const deletedId = String(payload.old.id ?? '');
            if (!deletedId) {
              return;
            }

            setQuiz((current) => current.filter((item) => item.id !== deletedId));
            return;
          }

          const changedRow = payload.new as QuizQuestion;
          setQuiz((current) => {
            const index = current.findIndex((item) => item.id === changedRow.id);
            if (index === -1) {
              return [changedRow, ...current];
            }

            const updated = [...current];
            updated[index] = changedRow;
            return updated;
          });
        },
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setRealtimeStatus('connected');
          return;
        }

        if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' || status === 'CLOSED') {
          setRealtimeStatus('disconnected');
        }
      });

    return () => {
      setRealtimeStatus('disconnected');
      void supabase.removeChannel(channel);
    };
  }, [selectedSurprise]);

  useEffect(() => {
    if (!showQuizModal) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowQuizModal(false);
        setQuizFormError('');
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [showQuizModal]);

  const fetchSurprises = async () => {
    const { data, error } = await supabase
      .from('surprises')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setSurprises(data);
    }

    setLoading(false);
  };

  const fetchReplies = async (surpriseId: string) => {
    const { data } = await supabase
      .from('replies')
      .select('*')
      .eq('surprise_id', surpriseId)
      .order('created_at', { ascending: false });

    if (data) {
      setReplies(data);
    }
  };

  const fetchGallery = async (surpriseId: string) => {
    const { data } = await supabase
      .from('gallery')
      .select('*')
      .eq('surprise_id', surpriseId)
      .order('created_at', { ascending: false });

    if (data) {
      setGallery(data);
    }
  };

  const fetchQuiz = async (surpriseId: string) => {
    const { data } = await supabase
      .from('quiz_questions')
      .select('*')
      .eq('surprise_id', surpriseId)
      .order('created_at', { ascending: false });

    if (data) {
      setQuiz(data);
    }
  };

  const deleteGallery = async (id: string) => {
    if (!confirm('Hapus foto ini?')) {
      return;
    }

    const { error } = await supabase.from('gallery').delete().eq('id', id);
    if (error) {
      alert(`Gagal hapus foto: ${error.message}`);
      return;
    }

    if (selectedSurprise) {
      fetchGallery(selectedSurprise);
    }
  };

  const deleteQuiz = async (id: string) => {
    if (!confirm('Hapus pertanyaan ini?')) {
      return;
    }

    const { error } = await supabase.from('quiz_questions').delete().eq('id', id);
    if (error) {
      alert(`Gagal hapus pertanyaan: ${error.message}`);
      return;
    }

    if (selectedSurprise) {
      fetchQuiz(selectedSurprise);
    }
  };

  const addGallery = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file || !selectedSurprise) {
        return;
      }

      const caption = prompt('Caption:');
      if (!caption) {
        return;
      }

      const fileName = `${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from(storageBucket)
        .upload(fileName, file);

      if (uploadError) {
        const message = uploadError.message.toLowerCase();
        if (message.includes('bucket not found')) {
          alert(
            `Upload gagal: bucket "${storageBucket}" tidak ditemukan. Buat bucket tersebut di Supabase Storage, atau sesuaikan VITE_SUPABASE_STORAGE_BUCKET di frontend/.env.`,
          );
          return;
        }
        alert(`Upload gagal: ${uploadError.message}`);
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from(storageBucket).getPublicUrl(fileName);

      const { error: insertError } = await supabase.from('gallery').insert([
        {
          surprise_id: selectedSurprise,
          image_url: publicUrl,
          caption,
        },
      ]);

      if (insertError) {
        alert(`Gagal simpan ke database: ${insertError.message}`);
        return;
      }

      fetchGallery(selectedSurprise);
    };

    input.click();
  };

  const openQuizModal = () => {
    if (!selectedSurprise) {
      return;
    }

    setQuizForm({
      question: '',
      options: ['', '', '', ''],
      answerIndex: 0,
    });
    setQuizFormError('');
    setShowQuizModal(true);
  };

  const updateQuizOption = (index: number, value: string) => {
    setQuizForm((current) => {
      const nextOptions = [...current.options];
      nextOptions[index] = value;
      return { ...current, options: nextOptions };
    });
  };

  const submitQuiz = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedSurprise) {
      setQuizFormError('Pilih surprise terlebih dulu.');
      return;
    }

    const question = quizForm.question.trim();
    const options = quizForm.options.map((option) => option.trim());
    if (!question || options.some((option) => !option)) {
      setQuizFormError('Pertanyaan dan semua opsi wajib diisi.');
      return;
    }

    setQuizSubmitting(true);
    setQuizFormError('');

    const { error } = await supabase.from('quiz_questions').insert([
      {
        surprise_id: selectedSurprise,
        question,
        options,
        answer_index: quizForm.answerIndex,
      },
    ]);

    setQuizSubmitting(false);

    if (error) {
      setQuizFormError(`Gagal simpan quiz: ${error.message}`);
      return;
    }

    setShowQuizModal(false);
    fetchQuiz(selectedSurprise);
  };

  const copyLink = (code: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/s/${code}`);
    alert('Link copied!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <h1 className="text-4xl font-bold text-gradient mb-2">Admin Dashboard 💖</h1>
          <p className="text-gray-600">Manage surprises, photos, and quiz</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-4">All Surprises</h2>
            <div className="space-y-4">
              {surprises.map((surprise) => (
                <div
                  key={surprise.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    selectedSurprise === surprise.id
                      ? 'border-valentine-rose bg-valentine-light'
                      : 'border-gray-200 hover:border-valentine-pink'
                  }`}
                  onClick={() => setSelectedSurprise(surprise.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg">{surprise.recipient_name}</h3>
                      <p className="text-sm text-gray-500">Code: {surprise.code}</p>
                    </div>
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        copyLink(surprise.code);
                      }}
                      className="bg-valentine-rose text-white px-3 py-1 rounded text-sm hover:bg-valentine-red"
                    >
                      Copy Link
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{surprise.message}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            {selectedSurprise ? (
              <>
                <div className="mb-6 border-b">
                  <div className="mb-2 flex items-center justify-between pb-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
                      Live sync: {realtimeStatus}
                    </p>
                    <span
                      className={`inline-flex h-2.5 w-2.5 rounded-full ${
                        realtimeStatus === 'connected'
                          ? 'bg-green-500'
                          : realtimeStatus === 'connecting'
                          ? 'bg-yellow-400'
                          : 'bg-gray-400'
                      }`}
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveTab('replies')}
                      className={`px-4 py-2 font-medium ${
                        activeTab === 'replies'
                          ? 'text-valentine-rose border-b-2 border-valentine-rose'
                          : 'text-gray-500'
                      }`}
                    >
                      💌 Replies
                    </button>
                    <button
                      onClick={() => setActiveTab('gallery')}
                      className={`px-4 py-2 font-medium ${
                        activeTab === 'gallery'
                          ? 'text-valentine-rose border-b-2 border-valentine-rose'
                          : 'text-gray-500'
                      }`}
                    >
                      📸 Gallery
                    </button>
                    <button
                      onClick={() => setActiveTab('quiz')}
                      className={`px-4 py-2 font-medium ${
                        activeTab === 'quiz'
                          ? 'text-valentine-rose border-b-2 border-valentine-rose'
                          : 'text-gray-500'
                      }`}
                    >
                      🎯 Quiz
                    </button>
                  </div>
                </div>

                {activeTab === 'replies' && (
                  <div className="space-y-4">
                    {replies.length > 0 ? (
                      replies.map((reply) => (
                        <div key={reply.id} className="p-4 rounded-lg bg-valentine-light border border-valentine-pink">
                          <div className="flex justify-between mb-2">
                            <h3 className="font-bold">{reply.sender_name}</h3>
                            <span className="text-xs text-gray-500">
                              {new Date(reply.created_at!).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-gray-700">{reply.message}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-8">No replies yet 💌</p>
                    )}
                  </div>
                )}

                {activeTab === 'gallery' && (
                  <div>
                    <div className="flex justify-between mb-4">
                      <h3 className="text-lg font-bold">Photos ({gallery.length})</h3>
                      <button
                        onClick={addGallery}
                        className="bg-valentine-rose text-white px-4 py-2 rounded hover:bg-valentine-red flex items-center gap-2"
                      >
                        📤 Upload Photo
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {gallery.map((item) => (
                        <div key={item.id} className="relative group">
                          <img
                            src={item.image_url}
                            alt={item.caption}
                            className="w-full h-40 object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                            <button
                              onClick={() => deleteGallery(item.id)}
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                              🗑️ Delete
                            </button>
                          </div>
                          <p className="text-sm mt-2 text-gray-600">{item.caption}</p>
                        </div>
                      ))}
                    </div>
                    {gallery.length === 0 && (
                      <p className="text-gray-500 text-center py-8">No photos yet. Click Upload Photo to add! 📸</p>
                    )}
                  </div>
                )}

                {activeTab === 'quiz' && (
                  <div>
                    <div className="flex justify-between mb-4">
                      <h3 className="text-lg font-bold">Questions ({quiz.length})</h3>
                      <button
                        onClick={openQuizModal}
                        className="bg-valentine-rose text-white px-4 py-2 rounded hover:bg-valentine-red"
                      >
                        + Add Question
                      </button>
                    </div>
                    <div className="space-y-4">
                      {quiz.map((question, index) => (
                        <div key={question.id} className="p-4 border rounded-lg">
                          <div className="flex justify-between mb-2">
                            <h4 className="font-bold">
                              Q{index + 1}: {question.question}
                            </h4>
                            <button
                              onClick={() => deleteQuiz(question.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              🗑️
                            </button>
                          </div>
                          <div className="space-y-1">
                            {question.options.map((option, optionIndex) => (
                              <div
                                key={optionIndex}
                                className={`p-2 rounded ${
                                  optionIndex === question.answer_index
                                    ? 'bg-green-100 text-green-800 font-medium'
                                    : 'bg-gray-50'
                                }`}
                              >
                                {String.fromCharCode(65 + optionIndex)}. {option}
                                {optionIndex === question.answer_index && ' ✓'}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <p className="text-gray-500 text-center py-8">Select a surprise to manage</p>
            )}
          </motion.div>
        </div>
      </div>

      {showQuizModal && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
          onClick={() => {
            if (quizSubmitting) return;
            setShowQuizModal(false);
            setQuizFormError('');
          }}
        >
          <motion.div
            className="w-full max-w-2xl rounded-2xl border border-valentine-pink/40 bg-white p-6 shadow-2xl md:p-7"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold text-slate-800">Tambah Pertanyaan Quiz</h3>
                <p className="mt-1 text-sm text-slate-500">Isi semua field lalu pilih jawaban benar.</p>
              </div>
              <button
                type="button"
                className="rounded-full border border-slate-300 px-3 py-1 text-sm text-slate-600 hover:bg-slate-100"
                onClick={() => {
                  if (quizSubmitting) return;
                  setShowQuizModal(false);
                  setQuizFormError('');
                }}
              >
                Tutup
              </button>
            </div>

            <form className="space-y-4" onSubmit={submitQuiz}>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="quiz-question">
                  Pertanyaan
                </label>
                <input
                  id="quiz-question"
                  type="text"
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-valentine-rose focus:ring-2 focus:ring-valentine-pink/40"
                  value={quizForm.question}
                  onChange={(event) =>
                    setQuizForm((current) => ({ ...current, question: event.target.value }))
                  }
                  placeholder="Contoh: Makanan favorit kita?"
                  disabled={quizSubmitting}
                />
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {quizForm.options.map((option, index) => (
                  <div key={index}>
                    <label
                      className="mb-1 block text-sm font-medium text-slate-700"
                      htmlFor={`quiz-option-${index}`}
                    >
                      Opsi {String.fromCharCode(65 + index)}
                    </label>
                    <input
                      id={`quiz-option-${index}`}
                      type="text"
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-valentine-rose focus:ring-2 focus:ring-valentine-pink/40"
                      value={option}
                      onChange={(event) => updateQuizOption(index, event.target.value)}
                      placeholder={`Isi opsi ${String.fromCharCode(65 + index)}`}
                      disabled={quizSubmitting}
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="quiz-answer">
                  Jawaban Benar
                </label>
                <select
                  id="quiz-answer"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-valentine-rose focus:ring-2 focus:ring-valentine-pink/40"
                  value={quizForm.answerIndex}
                  onChange={(event) =>
                    setQuizForm((current) => ({
                      ...current,
                      answerIndex: Number.parseInt(event.target.value, 10),
                    }))
                  }
                  disabled={quizSubmitting}
                >
                  <option value={0}>A</option>
                  <option value={1}>B</option>
                  <option value={2}>C</option>
                  <option value={3}>D</option>
                </select>
              </div>

              {quizFormError && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {quizFormError}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                  onClick={() => {
                    if (quizSubmitting) return;
                    setShowQuizModal(false);
                    setQuizFormError('');
                  }}
                  disabled={quizSubmitting}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-valentine-rose px-4 py-2 text-sm font-semibold text-white hover:bg-valentine-red disabled:opacity-60"
                  disabled={quizSubmitting}
                >
                  {quizSubmitting ? 'Menyimpan...' : 'Simpan Pertanyaan'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
