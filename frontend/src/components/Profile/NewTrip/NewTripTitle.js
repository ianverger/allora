import './NewTripTitle.css';

function NewTripTitle ({tripTitle, setTripTitle, setShowModal}) {

    // const handleSubmit = e => {
    //     // e.preventDefault();
    
    // }

    return (
        <>
            <div id="trip-title-form" >
                <h2>Name your trip!</h2>
                <input type="text"  
                        value={tripTitle}
                        onChange={(e) => setTripTitle(e.target.value)}
                        placeholder="Trip Title"
                        className="inputs"
                        />
                <button id="ttf-button" onClick={() => setShowModal(false)}>Submit</button>
            </div>
        </>
    )
}

export default NewTripTitle;