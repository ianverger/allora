import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import NewTripTitle from './NewTripTitle';
import './NewTripModal.css';

function NewTripTitleModal({tripTitle, setTripTitle}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id="new-trip-title-modal-button" onClick={() => setShowModal(true)}>Trip Title</button>
   
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <NewTripTitle setShowModal={setShowModal} tripTitle={tripTitle} setTripTitle={setTripTitle}/>
        </Modal>
      )}
    </>
  );
}

export default NewTripTitleModal