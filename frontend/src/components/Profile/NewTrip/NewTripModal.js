import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import CreateNewTripForm from './NewTripForm';
import './NewTripModal.css';

function NewTripModal({userId}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id="new-trip-modal-button" onClick={() => setShowModal(true)}>Plan a New Trip</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <CreateNewTripForm userId={userId}/>
        </Modal>
      )}
    </>
  );
}

export default NewTripModal;