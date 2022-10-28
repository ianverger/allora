import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import NewTripSearch from './NewTripSearch';
// import './NewTripModal.css';

function NewTripSearchModal({city, setCity}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id="new-trip-search-modal-button" onClick={() => setShowModal(true)}>Where to?</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <NewTripSearch setCity={setCity} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default NewTripSearchModal;