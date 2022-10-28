
function NewTripTitle ({tripTitle, setTripTitle, setShowModal}) {

    // const handleSubmit = e => {
    //     // e.preventDefault();
    
    // }

    return (
        <>
            <div id="trip-title-form" >
                <input type="text"  
                        value={tripTitle}
                        onChange={(e) => setTripTitle(e.target.value)}
                        placeholder="Trip Title"
                        className="inputs"
                        />
                <button onClick={() => setShowModal(false)}>Submit</button>
            </div>
        </>
    )
}

export default NewTripTitle;