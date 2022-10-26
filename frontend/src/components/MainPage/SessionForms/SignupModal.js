
import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import SignupForm from './SignupForm';
import './SignupModal.css';

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

 console.log('test')


  return (
    <>
      <button id="signup-modal-button" onClick={() => setShowModal(true)}>Start travelling with your friends</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;