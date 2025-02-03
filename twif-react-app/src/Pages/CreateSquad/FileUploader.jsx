import React, { useState } from 'react'

export const FileUploader = ({ onFileSelect }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState('/Logotype.png');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setBackgroundImage(URL.createObjectURL(file));
            onFileSelect(file);
        }
    };

    return (
        <div style={{ position: 'relative', width: '164px', height: '164px', margin: '20px auto' }}>
            <label
                htmlFor="file-input"
                style={{
                    cursor: 'pointer',
                    display: 'inline-block',
                    width: '100%',
                    height: '100%',
					borderRadius: '30px',
                    backgroundImage: `url(${backgroundImage})`, 
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                }}
            >
                <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
            </label>
        </div>
    );
};
