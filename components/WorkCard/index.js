import React, { useState } from "react";
import Modal from "react-modal";

const WorkCard = ({ img, name, description, onClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true);
    if (onClick) onClick();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className="overflow-hidden rounded-lg p-2 laptop:p-4 first:ml-0 link"
        onClick={handleImageClick}
      >
        <div
          className="relative rounded-lg overflow-hidden transition-all ease-out duration-300 laptop:h-[600px]"
        >
          <img
            alt={name}
            className="w-full object-contain laptop:object-cover laptop:h-full hover:scale-110 transition-all ease-out duration-300"
            src={img}
          />
        </div>
        <h2 className="mt-5 text-3xl font-medium">
          {name ? name : "Project Name"}
        </h2>
        <h3 className="text-xl opacity-50">
          {description ? description : "Description"}
        </h3>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.85)", zIndex: 1000 },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "0px",
            border: "none",
            borderRadius: "10px",
            overflow: "hidden",
            background: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: "90vw",
            maxHeight: "90vh",
          },
        }}
        ariaHideApp={false}
      >
        <div style={{ maxWidth: "90vw", maxHeight: "90vh", overflow: "hidden", borderRadius: "10px" }}>
          <img
            src={img}
            alt={name}
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              width: "auto",
              height: "auto",
              display: "block",
              imageOrientation: "from-image",
            }}
          />
        </div>
      </Modal>
    </>
  );
};

export default WorkCard;
