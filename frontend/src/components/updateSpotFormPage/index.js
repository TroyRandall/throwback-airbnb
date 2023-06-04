import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import * as spotActions from '../../store/spots.js'



function UpdateSpotPage  ()  {
const dispatch = useDispatch();
const history = useHistory();
const spotId = useParams();
const[isLoaded, setIsLoaded] = useState(false);
const sessionUser = useSelector((state) => state.session.user)

    useEffect(() => {
        dispatch(spotActions.spotsById(spotId)).then(() => setIsLoaded(true));
      }, [spotId, dispatch]);

const spot = useSelector((state) => state.spots.spot);

const [country, setCountry] = useState(spot.country);
const [state, setState] = useState(spot.state);
const [city, setCity] = useState(spot.city);
const [address, setAddress] = useState(spot.address);
const [lat, setLat] = useState(spot.lat);
const [lng, setLng] = useState(spot.lng);
const [name, setName] = useState(spot.name);
const [description, setDescription] = useState(spot.description);
const [price, setPrice] = useState(spot.price);
const [image1, setImage1] = useState(spot.SpotImages[0].url);
const [image2, setImage2] = useState(spot.SpotImages[1].url || '');
const [image3, setImage3] = useState(spot.SpotImages[2].url || '');
const [image4, setImage4] = useState(spot.SpotImages[3].url || '');
const [image5, setImage5] = useState(spot.SpotImages[4].url || '');



if(sessionUser === null && isLoaded) history.push('/');

const handleSubmit = async (e) => {
    e.preventDefault();
    const updateSpot = { name, city, state, country, address, description, price, lat, lng}

   const newSpot = await dispatch(spotActions.updateSpotAction(updateSpot))

 await dispatch(spotActions.updateSpotAction(image1, true, newSpot.id))

 if(image2 !== '') await dispatch(spotActions.updateSpotAction(image2, newSpot))

 if(image3 !== '') await dispatch(spotActions.updateSpotAction(image3, newSpot))

 if(image4 !== '') await dispatch(spotActions.updateSpotAction(image4, newSpot))

 if(image5 !== '') await dispatch(spotActions.updateSpotAction(image5, newSpot))


    history.push(`/spots/${newSpot.id}`);
}





 return  isLoaded && (
    <div>
        <h1 className="title">Update your Spot</h1>
        <h3>Where is your spot located?</h3>
        <h5>Guest's will only get your exact address once they have booked a reservation</h5>

        <label> country</label>
        <input
        type='text'
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        placeholder='country'
        required >
        </input>

        <label> Address</label>
        <input
        type='text'
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder='Address'
        required >
        </input>

        <label> State</label>
        <input
        type='text'
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder='State'
        required >
        </input>

        <label> city</label>
        <input
        type='text'
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder='City'
        required >
        </input>

        <label>Latitude</label>
        <input
        type='text'
        value = {lat}
        onChange={(e) => setLat(e.target.value)}
        placeholder='Latitude'
        ></input>

        <label>Longitude</label>
        <input
        type='text'
        value={lng}
        onChange={(e) => setLng(e.target.value)}
        placeholder='Longitude'
        ></input>
        <hr/>

        <h3>Describe your place to guests</h3>
        <h5>Mention the best features about your space, any special amenities like fast wifi and parking, and what you love about the neighborhood!</h5>

        <label>Description</label>
        <input
            type='textarea'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='please write atleast 30 characters'
            required
        >
        </input>

        <hr/>

        <h3>Create a title for your spot</h3>
        <h5>catch guests attention with a spot title that highlights what makes your place special!</h5>
        <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Title'
        required>
        </input>

        <hr/>

        <h3>Set a base price for your spot</h3>
        <h5>competetive pricing can help your listing stand out and rank better in search results</h5>
        <input
        type='text'
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder='Price per night($)'
        required
        ></input>

        <hr/>

        <h3>Liven up your spot with photos</h3>
        <h5>submit at least one photo to publish your spot!</h5>

        <input
        type='text'
        value={image1}
        onChange={(e) => setImage1(e.target.value)}
        placeholder='Preview image URL'
        required
        ></input>
        <input
        type='text'
        value={image2}
        onChange={(e) => setImage2(e.target.value)}
        placeholder='Image URL'
        ></input>
                    <input
        type='text'
        value={image3}
        onChange={(e) => setImage3(e.target.value)}
        placeholder='Image URL'
        ></input>
                    <input
        type='text'
        value={image4}
        onChange={(e) => setImage4(e.target.value)}
        placeholder='Image URL'
        ></input>
                    <input
        type='text'
        value={image5}
        onChange={(e) => setImage5( e.target.value)}
        placeholder='Image URL'
        ></input>
        <button onClick={handleSubmit}>submit</button>
    </div>
 )
};

export default UpdateSpotPage;
