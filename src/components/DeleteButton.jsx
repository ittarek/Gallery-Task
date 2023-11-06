

const DeleteButton = ({ selectedImages, onDeleteSelected }) => {
  return (
    <div className="my-4">
      <button
        onClick={onDeleteSelected}
        disabled={selectedImages.length === 0}
        className={` text-red-600 font-bold  ${
          selectedImages.length === 0 ? "cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <span className="hover:underline">Delete Files</span>
      </button>
    </div>
  );
};

export default DeleteButton;
