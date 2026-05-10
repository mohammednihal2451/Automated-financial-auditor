import API from './api';

// Upload CSV file
export const uploadCSV = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await API.post('upload-csv/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Upload failed' };
  }
};