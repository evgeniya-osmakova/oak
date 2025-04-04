import React, { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Card } from '../Card/Card';
import { companyStore } from '../../../stores/CompanyStore';
import { Button } from '../../common/Button/Button'

import './Photos.sass';

export const Photos = observer(() => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            await companyStore.uploadImage(file);
        } catch (error) {
            console.error('Failed to upload photo:', error);
        }

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleDeleteClick = async (imageName: string) => {
        try {
            await companyStore.deleteImage(imageName);
        } catch (error) {
            console.error('Failed to delete photo:', error);
        }
    };

    return (
        <Card
            title="Photos"
            icon="photo"
            iconTitle="Add"
            onClick={handleUploadClick}
        >
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: 'none' }}
            />

            <div className="photos__grid">
                {companyStore.allPhotos.map((photo) => (
                    <div
                        className="photos__item"
                        key={photo.filepath}
                    >
                        <img
                            className="photos__image"
                            src={photo.filepath}
                            alt={photo.name}
                        />

                        <Button
                            className="photos__delete-button "
                            variant="filled"
                            onClick={() => handleDeleteClick(photo.name)}
                            iconName="delete"
                            iconSize={16}
                            smallButton
                        />
                    </div>
                ))}
            </div>
        </Card>
    );
});
