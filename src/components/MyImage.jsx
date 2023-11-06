
import "./MyImage.css";
import { useEffect, useState } from "react";
import Sortable from "sortablejs";
import image1 from "../../public/images/image-1.webp";
import image2 from "../../public/images/image-10.jpeg";
import image3 from "../../public/images/image-11.jpeg";
import image4 from "../../public/images/image-2.webp";
import image5 from "../../public/images/image-3.webp";
import image6 from "../../public/images/image-4.webp";
import image7 from "../../public/images/image-5.webp";
import image8 from "../../public/images/image-6.webp";
import image9 from "../../public/images/image-7.webp";
import DeleteButton from "./DeleteButton";


const MyImage = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [images, setImages] = useState([
    { id: "image1", src: image1, isFeature: false },
    { id: "image2", src: image2, isFeature: true },
    { id: "image3", src: image3, isFeature: false },
    { id: "image4", src: image4, isFeature: false },
    { id: "image5", src: image5, isFeature: false },
    { id: "image6", src: image6, isFeature: false },
    { id: "image7", src: image7, isFeature: false },
    { id: "image8", src: image8, isFeature: false },
    { id: "image9", src: image9, isFeature: false },
  ]);

  useEffect(() => {
    const dragAndDropItems = document.getElementById("gallery");
    const sortable = new Sortable(dragAndDropItems, {
      animation: 350,
      chosenClass: "team-member-chosen",
      dragClass: "team-member-drag",
      onEnd: event => {
        const { oldIndex, newIndex } = event;
        const reorderedImages = [...images];
        const [movedImage] = reorderedImages.splice(oldIndex, 1);
        reorderedImages.splice(newIndex, 0, movedImage);
        setImages(reorderedImages);
      },
    });

    const firstImage = document.getElementById("image1");
    sortable.option("handle", firstImage);

    return () => {
      sortable.destroy();
    };
  }, [images]);

  const handleImageSelection = imageId => {
    const newSelectedImages = selectedImages.includes(imageId)
      ? selectedImages.filter(id => id !== imageId)
      : [...selectedImages, imageId];
    setSelectedImages(newSelectedImages);
  };
  const handleDeleteSelected = () => {
    const updatedImages = images.filter(
      image => !selectedImages.includes(image.id)
    );
    setImages(updatedImages);
    setSelectedImages([]);
  };
  const handleAddImage = e => {
    // console.log("handleAddImage triggered"); 

    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        const newImage = {
          id: `image${images.length + 1}`,
          src: e.target.result,
          isFeature: false,
        };
        setImages([...images, newImage]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold flex justify-center items-center gap-2">
          <input
            type="checkbox"
            size={30}
            className="   text-white "
            checked={selectedImages.length > 0}
          />
          <span>
            {" "}
            {selectedImages.length > 0
              ? `${selectedImages.length} Selected Image`
              : "Gallery"}
          </span>
        </h2>
        <DeleteButton
          selectedImages={selectedImages}
          onDeleteSelected={handleDeleteSelected}
        />
      </div>
      <div id="gallery" className="grid grid-cols-5 gap-2 grid-flow-row  my-11">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`image-container  rounded-md border border-1 border-[#C9CBCF] hover:brightness-50 transition duration-500  cursor-pointer    ${
              index <= 0 ? "row-start-1 row-end-3 col-start-1 col-end-3" : ""
            } ${selectedImages.includes(image.id) ? "selected" : ""}`}
          >
            <label>
              <input
                type="checkbox"
                size={30}
                className="checkbox  z-10 hover:visible text-white "
                checked={selectedImages.includes(image.id)}
                onChange={() => handleImageSelection(image.id)}
              />
              <img className="" src={image.src} alt="" />
            </label>
          </div>
        ))}

        <label
          htmlFor="image-upload"
          className="border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center  lg:mt-16">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="2rem"
              viewBox="0 0 512 512"
            >
              <path d="M448 80c8.8 0 16 7.2 16 16V415.8l-5-6.5-136-176c-4.5-5.9-11.6-9.3-19-9.3s-14.4 3.4-19 9.3L202 340.7l-30.5-42.7C167 291.7 159.8 288 152 288s-15 3.7-19.5 10.1l-80 112L48 416.3l0-.3V96c0-8.8 7.2-16 16-16H448zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" />
            </svg>
            <p className="mb-2 mt-6 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Add Image</span>
            </p>
          </div>
          <input
            id="image-upload"
            accept="image/*"
            type="file"
            onChange={handleAddImage}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
};

export default MyImage;
