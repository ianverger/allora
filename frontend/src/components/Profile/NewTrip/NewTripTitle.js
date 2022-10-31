import './NewTripForm.css';

const NewTripTitle = ({page, setPage, formData, setFormData, x, setX}) => {

    // const handleSubmit = e => {
    //     // e.preventDefault();
    
    // }

    // const animations = {
    //     initial: { x: x },
    //     transition: { duration: 1 },
    //     animate: { x: 0 }
    // }

    return (
        <>
            <div id="trip-title-form" >
                <button className="ntp-button" onClick={() => {
                    setPage(page + 1);
                    setX(1000);
                }}>
                Next
                </button>
                <input type="text"  
                    value={formData.tripTitle}
                    onChange={(e) => setFormData({ ...formData, tripTitle: e.target.value})}
                    placeholder="Name your trip!"
                    id="ttf-input"
                />
            </div>
        </>
    )
}

export default NewTripTitle;