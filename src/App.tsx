import "./App.css";
import { useState } from "react";
import { SearchField } from "./components/SearchfieldComponent";
import { SearchedImage } from "./components/SearchedImage";
import { GalleryImage } from "./components/GalleryImage";

// flickr api key, to be replaced with a valid personal key.
const apiKey = "";

function App() {
  const [searchedPhotos, setSearchedPhotos] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [showGallery, setShowGallery] = useState<boolean>(false);

  // function which is passed down to the child element SearchFieldComponent.
  // if gallery is currently displayed, set it to false to return to search page view, and fetches the data based on the input value which is passed from the component.
  const handleSearch = (inputValue: string): void => {
    if (showGallery) {
      setShowGallery(false);
    }
    fetchImageData(inputValue);
  };

  // function for storing the imageUrl to the useState Gallery with a larger fileSize.
  const handleSetGallery = (photo: any, imageUrl: string): void => {
    const largerImageUrl = imageUrl.replace(/_q(?=.jpg)/g, "_c");
    const photoObject = {
      photo,
      imageUrl: largerImageUrl,
    };
    setGallery([...gallery, photoObject]);
  };

  // function responsible for calling the flickr Api depending on the input search value.
  async function fetchImageData(inputValue: string): Promise<void> {
    try {
      const apiUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&format=json&nojsoncallback=1&text=${inputValue}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const data = await response.json();

      setSearchedPhotos(data.photos.photo);
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  }

  // toggle function for displaying the saved gallery.
  const toggleGallery = (): void => {
    setShowGallery(true);
  };

  // rendered components based on the showGallery state,
  // if true, it renders the galleryImage component with the content in state gallery, 
  // if false it renders the searchedImage component with the content in state searchedPhotos. 

  return (
    <div className="app">
      <header className="appHeader">
        <h1>FLICKR Gallery</h1>
        {!showGallery && (
          <button className="showGalleryButton" onClick={toggleGallery}>
            Show Gallery
          </button>
        )}
      </header>
      <SearchField handleSearch={handleSearch} />
      {showGallery ? (
        <div className="savedGallery">
          {gallery.map((img: any) => (
            <GalleryImage key={img.photo.id} image={img} />
          ))}
        </div>
      ) : (
        <div className="searchedGallery">
          {searchedPhotos.map((photo: any) => (
            <SearchedImage
              key={photo.id}
              photo={photo}
              saveToGallery={handleSetGallery}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
