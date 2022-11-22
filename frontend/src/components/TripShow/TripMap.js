import React, { useEffect, useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import ActivitiesMap from '../Map/Map';

function TripMap ({city, activities}) {
    const history = useHistory();
    
    const [mapLoaded, setMapLoaded] = useState(false);
    const [highlightedActivity,setHighlightedActivity] = useState(null);
    const [bounds, setBounds] = useState(null);





    return (
        <>
            <div className='act-map-container'>
                && <ActivitiesMap  
                city={city}
                activities={activities}
                // mapEventHandlers={mapEventHandlers}
                markerEventHandlers={{
                    click: (activity) => history.push(`//${activity._id}`),
                    mouseover: (activity) => setHighlightedActivity(activity._id),
                    mouseout: () => setHighlightedActivity(null)
                }}
                highlightedActivity={highlightedActivity}
                />
            </div>
        </>
    )
}

export default TripMap;