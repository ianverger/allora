import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddNewActivity from './ActivityForm';
// import './NewTripModal.css';

function AddActivityModal({tripId, userId}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id='add-new-activity' onClick={() => setShowModal(true)}>Add an activity</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <AddNewActivity
              tripId={tripId}
              userId={userId}
            />
        </Modal>
      )}
    </>
  );
}

export default AddActivityModal;