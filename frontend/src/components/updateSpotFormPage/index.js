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
const [toggle, setToggle] = useState(false);
const [backendToggle, setBackendToggle] = useState(false);



if(sessionUser === null && isLoaded) history.push('/');

useEffect(() => {

      //frontend validation checks on input fields

      if(toggle) {
        let newErrors = {};
    if (name === "") newErrors.title="Name is required"
    if (country === "") newErrors.country="Country is required"
    if(state==="") newErrors.state = "State is required";
    if(city==="") newErrors.city = "City is required";
    if(address==="") newErrors.address = "Address is required";
    if(description==="") newErrors.description = "Description is required";
    if(price==="") newErrors.price = "Price is required";
    if (lat === "") newErrors.lat = "Latitude is required";

    if (lng === "") newErrors.lng = "Longitude is required";
    if (description.length < 30 && !newErrors.description)
      newErrors.description = "Description needs a minimun of 30 characters";
    if (description.length > 240 && !newErrors.description)
      newErrors.description = "Description must be below 240 characters";
      if((!(isFinite(lat) && Math.abs(lat) <= 90)) && !newErrors.lat) newErrors.lat = 'Latitude is invalid';
      if((!(isFinite(lng) && Math.abs(lng) <= 180)) && !newErrors.lng) newErrors.lng = 'Longitude is invalid';
    setErrors({...newErrors})
if(Object.values(newErrors).length === 0) {
  setBackendToggle(true)};
    }

  }, [ name, address, city, state, country, description, lat, lng, price, toggle])


const handleSubmit = async (e) => {
  e.preventDefault();
    const spot = {
      name,
      city,
      state,
      country,
      address,
      description,
      price,
      lat,
      lng,
    };

    setToggle(true);
    if(backendToggle) {

      //submit backend requests using thunks, with error catching built into it
      let newErrors = {};
      let newSpot = await dispatch(spotActions.createSpotAction(spot)).catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) newErrors.title = data.errors[0];
        }
      );

      setErrors({...newErrors})
      if ((errors) && (Object.values(newErrors).length > 0)) return errors;
      else return history.push(`/spots/${newSpot.id}`);
};
}





 return (spot && (isLoaded && (
    <div>
         <div id="create-spot-form">
      <h1 className="title">Update your Spot</h1>
      <p id="title-info">Where is your spot located?</p>
      <p id="explain-spot-form">
        Guest's will only get your exact address once they book a reservation
      </p>

      <label id="country-label"> Country</label>
      <label id="errors-country">{errors?.country}</label>
      <input
        id="country-input"
        type="text"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        placeholder="country"
        required
      ></input>

      <label id="address-label"> Street address</label>
      <label id="errors-address">{errors?.address}</label>
      <input
        id="address-input"
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
        required
      ></input>

      <label id="state-label"> State</label>
      <label id="errors-state">{errors?.state}</label>
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
      <label id="errors-city">{errors?.city}</label>
      <input
        id="city-input"
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="City"
        required
      ></input>

      <label id="lat-label">Latitude</label>
      <label id="errors-lat">{errors?.lat}</label>
      <input
        id="lat-input"
        type="text"
        value={lat}
        onChange={(e) => setLat(e.target.value)}
        placeholder="Latitude"
      ></input>
      <p id="lat-lng-comma">,</p>

      <label id="lng-label">Longitude</label>
      <label id="errors-lng">{errors?.lng}</label>
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
      <label className="errors-description">{errors?.description}</label>

      <hr id="line-break-two" />

      <h3 id="title-spot">Create a title for your spot</h3>
      <label className="errors-name">{errors?.title}</label>
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
      <label id="errors-price">{errors?.price}</label>
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
