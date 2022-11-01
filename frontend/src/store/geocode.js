import Geocode from "react-geocode";
Geocode.setApiKey(process.env.REACT_APP_MAPS_API_KEY);

export const findLatandLng = place => async dispatch => {
    const response = await Geocode.fromAddress(place);
    const data = await response.json();
    dispatch(findLatandLng(data));
    return response;
};