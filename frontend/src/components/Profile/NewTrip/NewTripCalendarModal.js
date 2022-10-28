import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import NewTripCalendar from './NewTripCalendar';
import './NewTripModal.css';

function NewTripCalendarModal({setDates}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id="new-trip-cal-modal-button" onClick={() => setShowModal(true)}>When we goin?</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <NewTripCalendar setDates={setDates}/>
        </Modal>
      )}
    </>
  );
}

export default NewTripCalendarModal;