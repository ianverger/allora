import Geocode from "react-geocode";
Geocode.setApiKey(process.env.REACT_APP_MAPS_API_KEY);

export const getCoords = async (place) => {
    try {
        const res = await Geocode.fromAddress(place);
        const { lat, lng } = res.results[0].geometry.location;
        return ({ lat, lng });
    } catch (error) {
        console.error(error);
    }
}