import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { createActivity } from '../../store/activities';
import { getCoords } from '../../util/util';
import { Modal } from '../../context/Modal';
import './AddActivityModal.css';

function AddActivityModal({tripId, userId, currentDate}) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [activityDate, setActivityDate] = useState(`${currentDate}`);
  

  
  const handleSubmit = async (e) => {
      e.preventDefault();
      const { lat, lng } = await getCoords(title);
      const activity = {
          title, 
          description, 
          activityDate,
          latitude: lat,
          longitude: lng,
          trip: tripId, 
          creator: userId
      }
      dispatch(createActivity(activity));
      setShowModal(false);
      
  }

  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      <button 
        id='add-new-activity' onClick={() => setShowModal(true)}>Add an activity</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <form id="new-activity-form" onSubmit={handleSubmit}>
              <input type="text"
                value={activityDate}
                onChange={(e) => setActivityDate(e.target.value)}
                placeholder="Date test"
              />
              <input type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Try something like Eiffel Tower..."
              />
              <input type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
                placeholder="How about a little description?"
              />
  
            <button id="nasb" type='submit' className='add-activity-submit'>Add this activity!</button>
        </form>
        </Modal>
      )}
    </>
  );
}

export default AddActivityModal;