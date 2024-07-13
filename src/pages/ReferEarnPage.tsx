import { useState } from "react";
import HeroSection from "../components/HeroSection";
import ReferralFormModal from "../components/ReferralFormModal";

const ReferEarnPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <div>
      <HeroSection onReferNow={handleOpenModal} />
      <ReferralFormModal open={modalOpen} handleClose={handleCloseModal} />

      <div className={`astronaut-background`}>
        <div className="astronaut">
          <div className="head"></div>
          <div className="arm arm-left"></div>
          <div className="arm arm-right"></div>
          <div className="body">
            <div className="panel"></div>
          </div>
          <div className="leg leg-left"></div>
          <div className="leg leg-right"></div>
          <div className="schoolbag"></div>
        </div>
      </div>
    </div>
  );
};

export default ReferEarnPage;
