import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { uploadImage, fetchImages } from '../services/api';
import { toast } from 'react-hot-toast';
import { LogOut, Loader2 } from 'lucide-react';

const Dashboard = () => {
  const [token, setToken] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<any[]>([]);
  const [effects, setEffects] = useState<string[]>([]);
  const [resizeWidth, setResizeWidth] = useState('300');
  const [resizeHeight, setResizeHeight] = useState('300');
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      router.push('/');
      return;
    }
    setToken(storedToken);
    fetchImages(storedToken).then(setImages);
  }, [router]);

  const handleEffectChange = (effect: string) => {
    setEffects((prev) =>
      prev.includes(effect) ? prev.filter((e) => e !== effect) : [...prev, effect]
    );
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Selecciona una imagen primero');
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('effects', JSON.stringify(effects));
    if (effects.includes('resize')) {
      formData.append('resizeWidth', resizeWidth);
      formData.append('resizeHeight', resizeHeight);
    }

    try {
      const res = await uploadImage(token, formData);
      toast.success('Imagen subida con éxito');
      const updated = await fetchImages(token);
      setImages(updated);
      setFile(null);
      setEffects([]);
    } catch {
      toast.error('Error al subir la imagen');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-10">
      <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>

      {/* Formulario de subida */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Subir una imagen</h3>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-4"
        />

        <div className="mb-4 space-y-2">
          <label className="block">
            <input
              type="checkbox"
              checked={effects.includes('resize')}
              onChange={() => handleEffectChange('resize')}
              className="mr-2"
            />
            Redimensionar
          </label>
          {effects.includes('resize') && (
            <div className="ml-4 flex gap-4">
              <input
                type="number"
                placeholder="Ancho"
                value={resizeWidth}
                onChange={(e) => setResizeWidth(e.target.value)}
                className="border rounded p-1 w-24"
              />
              <input
                type="number"
                placeholder="Alto"
                value={resizeHeight}
                onChange={(e) => setResizeHeight(e.target.value)}
                className="border rounded p-1 w-24"
              />
            </div>
          )}
          <label className="block">
            <input
              type="checkbox"
              checked={effects.includes('greyscale')}
              onChange={() => handleEffectChange('greyscale')}
              className="mr-2"
            />
            Escala de grises
          </label>
          <label className="block">
            <input
              type="checkbox"
              checked={effects.includes('quality')}
              onChange={() => handleEffectChange('quality')}
              className="mr-2"
            />
            Comprimir calidad (80%)
          </label>
        </div>

        <button
          onClick={handleUpload}
          disabled={isUploading}
          className={`flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 ${
            isUploading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isUploading && <Loader2 className="animate-spin w-4 h-4" />}
          {isUploading ? 'Subiendo...' : 'Subir imagen'}
        </button>
      </div>

      {/* Galería */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Mis imágenes</h3>
        {images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((img) => (
              <div
                key={img._id}
                className="bg-white border rounded-lg shadow-md p-4 hover:shadow-lg transition"
              >
                <img
                  src={`http://localhost:5050/${img.processedPath}`}
                  alt={img.originalName}
                  className="w-full h-auto rounded"
                />
                <p className="mt-2 text-sm font-medium text-gray-800">{img.originalName}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {img.transformations.map((t: string, idx: number) => (
                    <span
                      key={idx}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No hay imágenes aún.</p>
        )}
      </div>

      {/* Botón flotante logout */}
      <button
        onClick={() => {
          localStorage.removeItem('token');
          router.push('/');
        }}
        className="fixed bottom-6 right-6 bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transition"
        title="Cerrar sesión"
      >
        <LogOut className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Dashboard;
