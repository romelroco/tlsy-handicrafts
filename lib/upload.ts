import { supabase } from './supabase';

export const uploadImage = async (file: File): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('products')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('products').getPublicUrl(filePath);
    return data.publicUrl;
  } catch (error) {
    console.error('Upload error:', error);
    return null;
  }
};

export const deleteImage = async (url: string): Promise<boolean> => {
  try {
    const path = url.split('/products/').pop();
    if (!path) return false;

    const { error } = await supabase.storage.from('products').remove([path]);
    return !error;
  } catch (error) {
    return false;
  }
};
