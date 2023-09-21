import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface DriveContentProps {
  accessToken: string;
}

const DriveContent: React.FC<DriveContentProps> = ({ accessToken }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get('https://www.googleapis.com/drive/v3/files', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setFiles(response.data.files);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    if (accessToken) {
      fetchFiles();
    }
  }, [accessToken]);

  return (
    <div>
      <h2>Google Drive Files</h2>
      <ul>
        {files.map((file: any) => (
          <li key={file.id}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DriveContent;
