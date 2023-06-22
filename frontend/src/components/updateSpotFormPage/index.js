import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import * as spotActions from '../../store/spots.js'
import './updateSpot.css'


function UpdateSpotPage  ()  {


const dispatch = useDispatch();
const history = useHistory();
const spotId = useParams();
const[isLoaded, setIsLoaded] = useState(false);
const sessionUser = useSelector((state) => state.session.user)
const spot = useSelector((state) => state.spots[spotId.id]);

    useEffect(() => {
        if(spotId) dispatch(spotActions.spotsById(spotId.id)).then(() => setIsLoaded(true));
      }, [dispatch, spotId]);


const [country, setCountry] = useState(spot ? spot.country : '');
const [state, setState] = useState(spot ? spot.state : '');
const [city, setCity] = useState(spot ? spot.city : '');
const [address, setAddress] = useState(spot ? spot.address : '');
const [lat, setLat] = useState(spot ? spot.lat : '');
const [lng, setLng] = useState(spot ? spot.lng : '');
const [name, setName] = useState(spot ? spot.name : '');
const [description, setDescription] = useState(spot ? spot.description: '');
const [price, setPrice] = useState(spot ? spot.price : '');
const [errors, setErrors] = useState({});

console.log(spot);



if(sessionUser === null && isLoaded) history.push('/');
const handleErrors = (newSpot) => {
    let newErrors = {};
    Object.values(errors).forEach((error) => {
      if (error.includes("Name")) newErrors.name = error;
      else if (error.includes("State")) newErrors.state = error;
      else if (error.includes("Country")) newErrors.country = error;
      else if (error.includes("City")) newErrors.city = error;
      else if (error.includes("address")) newErrors.address = error;
      else if (error.includes("Description")) newErrors.description = error;
      else if (error.includes("Price")) newErrors.price = error;
      else if (error.includes("Invalid") && newErrors.lat)
        newErrors.lng = error;
      else if (error.includes("Invalid")) newErrors.lat = error;

        if(lat === "") newErrors.lat='Latitude is required'

        if(lng === "") newErrors.lng='Longitude is required'
    });
      if((description.length < 30) && (!newErrors.description)) newErrors.description = 'Description must be at least 30 characters';
    return newErrors;
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    const id = spotId.id;
    const updateSpot = { id, name, city, state, country, address, description, price, lat, lng}

    setErrors({})
   const newSpot = await dispatch(spotActions.updateSpotAction(updateSpot)).catch(
    async (res) => {
      const data = await res.json();
      if (data) setErrors({ ...errors, ...data.errors });
    }
  );

  const allErrors = handleErrors(newSpot);
  if (Object.values(allErrors).length > 0) return allErrors;
   else if (newSpot) return history.push(`/spots/${newSpot.id}`);
};



const allErrors=handleErrors();


 return (spot && (isLoaded && (
    <div>
         <div id="create-spot-form">
      <h1 className="title">Update your Spot</h1>
      <p id="title-info">Where is your spot located?</p>
      <p id="explain-spot-form">
        Guest's will only get your exact address once they book a reservation
      </p>

      <label id="country-label"> Country</label>
      <label id="errors-country">{(allErrors==={}) ||  allErrors.country}</label>
      <input
        id="country-input"
        type="text"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        placeholder="country"
        required
      ></input>

      <label id="address-label"> Street address</label>
      <label id="errors-address">{(allErrors==={}) || allErrors.address}</label>
      <input
        id="address-input"
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
        required
      ></input>

      <label id="state-label"> State</label>
      <label id="errors-state">{(allErrors==={}) || allErrors.state}</label>
      <input
        id="state-input"
        type="text"
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder="State"
        required
      ></input>
      <p id="state-city-comma">,</p>

      <label id="city-label"> City</label>
      <label id="errors-city">{(allErrors==={}) || allErrors.city}</label>
      <input
        id="city-input"
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="City"
        required
      ></input>

      <label id="lat-label">Latitude</label>
      <label id="errors-lat">{(allErrors==={}) || allErrors.lat}</label>
      <input
        id="lat-input"
        type="text"
        value={lat}
        onChange={(e) => setLat(e.target.value)}
        placeholder="Latitude"
      ></input>
      <p id="lat-lng-comma">,</p>

      <label id="lng-label">Longitude</label>
      <label id="errors-lng">{(allErrors==={}) || allErrors.lng}</label>
      <input
        id="lng-input"
        type="text"
        value={lng}
        onChange={(e) => setLng(e.target.value)}
        placeholder="Longitude"
      ></input>
      <hr id="line-break-one" />

      <h3 id="description-title">Describe your place to guests</h3>
      <h5 id="description">
        Mention the best features about your space, any special amenities like
        fast wifi and parking, and what you love about the neighborhood!
      </h5>

      <textarea
        id="description-input"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="please write atleast 30 characters"
        required
      ></textarea>
      <label className="errors-description">{(allErrors==={}) || allErrors.description}</label>

      <hr id="line-break-two" />

      <h3 id="title-spot">Create a title for your spot</h3>
      <label className="errors-name">{(allErrors==={}) || allErrors.name}</label>
      <h5 id="title-description">
        catch guests attention with a spot title that highlights what makes your
        place special!
      </h5>
      <input
        id="title-input"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name of Your Spot"
        required
      ></input>

      <hr id="line-break-three" />

      <h3 id="price-title">Set a base price for your spot</h3>
      <label id="errors-price">{(allErrors==={}) || allErrors.price}</label>
      <h5 id="price-description">
        competetive pricing can help your listing stand out and rank better in
        search results
      </h5>
      <p id="Money-sign">💲</p>
      <input
        id="price-input"
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price per night($)"
        required
      ></input>

      <hr id="line-break-four" />

        <button id='submit-update-spot' onClick={handleSubmit}>Update Spot</button>
    </div>
    </div>
 )))
};

export default UpdateSpotPage;
