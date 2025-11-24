import { createClient } from '@supabase/supabase-js';
import { File } from 'expo-file-system';
import { decode } from 'base64-arraybuffer';

import AsyncStorage from '@react-native-async-storage/async-storage';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

interface Fichada {
  tipo: string;
  modalidad: string;
  latitud: number;
  longitud: number;
  foto: string;
}

export const insertarFichada = async (fichada: Fichada, userId: string) => {
  const fotoUri = fichada.foto;

  const timestamp = buildTimestamp();
  const path = `fichadas/${userId}/${timestamp}.jpg`;
  const contentType = 'image/jpeg';

  console.log('fotoUri =>', fotoUri);

  const file = new File(fotoUri);
  console.log('exists =>', file.exists);
  if (!file.exists) {
    console.log('El archivo no existe');
    return;
  }

  const base64 = await file.base64();
  console.log('base64 length =>', base64.length);

  const arrayBuffer = decode(base64);

  const { error: errorBucket } = await supabase.storage
    .from('fichadas')
    .upload(path, arrayBuffer, { contentType });

  console.log('Resultado de la subida al bucket:', errorBucket);

  if (errorBucket) {
    console.error('Error uploading photo:', errorBucket);
    return errorBucket;
  }

  //supabase.storage.from('fichadas').createSignedUrl(path, 60);

  const { error } = await supabase.from('fichadas').insert([
    {
      tipo: fichada.tipo,
      modalidad: fichada.modalidad,
      latitud: fichada.latitud,
      longitud: fichada.longitud,
      foto: path,
    },
  ]);

  if (error) {
    console.error('Error inserting fichada:', error);
    return error;
  }

  console.log('Fichada insertada:', fichada);
  return error;
};

const buildTimestamp = () => {
  const now = new Date();

  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0'); // 01-12
  const dd = String(now.getDate()).padStart(2, '0'); // 01-31

  const hh = String(now.getHours()).padStart(2, '0'); // 00-23
  const mi = String(now.getMinutes()).padStart(2, '0'); // 00-59
  const ss = String(now.getSeconds()).padStart(2, '0'); // 00-59

  // Queda algo tipo 2025-11-24_15-30-12
  return `${yyyy}-${mm}-${dd}_${hh}-${mi}-${ss}`;
};
