import React from "react";

// component for the saved images displayed in the gallery page

export const GalleryImage: React.FC<{ image: any }> = ({ image }) => {
  return (
    <div className="photoItemSaved">
      <img src={image.imageUrl} alt={image.photo.title} />
    </div>
  );
};
