import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import * as spotActions from '../../store/spots'
import * as spotImageActions from '../../store/spotImages'
import './createSpot.css'

function CreateSpotPage () {
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [image4, setImage4] = useState('');
    const [image5, setImage5] = useState('');

    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user)

    if(!sessionUser) history.push('/');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const spot = { name, city, state, country, address, description, price, lat, lng}

       const newSpot = await dispatch(spotActions.createSpotAction(spot))
     await dispatch(spotImageActions.createSpotImageAction(image1, true, newSpot.id))

     if(image2 !== '') await dispatch(spotImageActions.createSpotImageAction(image2, newSpot.id))

     if(image3 !== '') await dispatch(spotImageActions.createSpotImageAction(image3, newSpot.id))

     if(image4 !== '') await dispatch(spotImageActions.createSpotImageAction(image4, newSpot.id))

     if(image5 !== '') await dispatch(spotImageActions.createSpotImageAction(image5, newSpot.id))


        history.push(`/spots/${newSpot.id}`);
    }





     return (
        <div id='create-spot-form'>
            <h1 className="title">Create a Spot</h1>
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
}

export default CreateSpotPage;
