import React, { useState, useEffect } from "react";
import Modal from "react-modal";
// import popup from "../../assets/images/popup.png";
import CancelIcon from "@mui/icons-material/Cancel";
Modal.setAppElement("#root"); // Thiết lập phần tử gốc của ứng dụng React

const PopupModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(true); // Mở modal khi component được mount
    }, []);

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Thông báo sale"
            style={{
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: 9999,
                },
                content: {
                    position: "relative",
                    zIndex: 9999,
                    top: "50%",
                    left: "50%",
                    right: "auto",
                    bottom: "auto",
                    width: "33%",
                    padding: "0",
                    marginRight: "-50%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                },
            }}
        >
            <img
                src="https://yt3.googleusercontent.com/ytc/AIdro_mh4UFWsvr-LsbQmqTzsZH3FvbvtF4DnDiEEMix3Q2xTYQ=s900-c-k-c0x00ffffff-no-rj"
                alt="Popup Sale"
                className="popup-image"
                style={{ width: "100%", height: "auto" }}
            />
            <button onClick={closeModal} style={{ position: "absolute", top: 0, right: 0 }}>
                <CancelIcon sx={{ fontSize: 30 }} />
            </button>
        </Modal>
    );
};

export default PopupModal;
