import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gallery } from '../types';

interface GalleryPageProps {
  onNext: () => void;
  gallery: Gallery[];
}

const GalleryPage = ({ onNext, gallery }: GalleryPageProps) => {
  const [selectedImage, setSelectedImage] = useState<Gallery | null>(null);

  return (
    <div className="page-wrap">
      <motion.div
        className="page-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-7 text-center">
          <span className="section-chip mb-4">Memory Lane</span>
          <h2 className="title-gradient text-4xl font-extrabold md:text-5xl">Galeri Kenangan 📸</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 md:text-base">
            Kumpulan momen manis yang bisa kamu buka satu per satu.
          </p>
        </div>

        {gallery.length ? (
          <>
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((item, index) => (
                <motion.button
                  key={item.id}
                  type="button"
                  className="group relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/70 bg-white/65 text-left shadow-[0_24px_44px_-30px_rgba(136,24,74,0.8)]"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -4 }}
                  onClick={() => setSelectedImage(item)}
                >
                  <img
                    src={item.image_url}
                    alt={item.caption}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-4 pb-4 pt-8">
                    <p className="text-sm font-medium text-white line-clamp-2">{item.caption}</p>
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="text-center">
              <button onClick={onNext} className="primary-btn" type="button">
                Lanjut 💕
              </button>
            </div>
          </>
        ) : (
          <div className="glass-card mx-auto max-w-xl p-8 text-center">
            <p className="text-lg font-semibold text-slate-700">Belum ada foto di galeri ini.</p>
            <button onClick={onNext} className="outline-btn mt-5" type="button">
              Lanjut
            </button>
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="glass-card w-full max-w-4xl overflow-hidden p-3"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={selectedImage.image_url}
                alt={selectedImage.caption}
                className="max-h-[65vh] w-full rounded-2xl object-contain bg-black/20"
              />
              <div className="flex items-center justify-between gap-4 px-2 pb-2 pt-4">
                <p className="text-sm font-medium text-slate-700 sm:text-base">{selectedImage.caption}</p>
                <button
                  type="button"
                  className="outline-btn px-5 py-2 text-sm"
                  onClick={() => setSelectedImage(null)}
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;
