import React from "react";

// component for the images displayed of the searched results.

export const SearchedImage: React.FC<{ photo: any; saveToGallery: (photo: any, imageUrl: string) => void }> = ({ photo, saveToGallery }) => {
  const imageUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg`;

  return (
    <div className="photoItem">
      <img src={imageUrl} alt={photo.title} />
      <button onClick={() => saveToGallery(photo, imageUrl)}>
        Save to gallery
      </button>
    </div>
  );
};
