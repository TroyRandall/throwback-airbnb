import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import * as spotActions from "../../store/spots";
import * as spotImageActions from "../../store/spotImages";
import "./createSpot.css";

function CreateSpotPage() {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [image5, setImage5] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  if (!sessionUser) history.push("/");
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


      if(image1 === "") newErrors.image1='Preview Image is required';

      if(newSpot) {
       if (image2 !== "" && (!image2.endsWith("jpg", "png", ".jpeg")))
        newErrors.image2 = "Image URL must end in .png, .jpg, or .jpeg";
       if (image3 !== "" && (!image3.endsWith("jpg", "png", ".jpeg")))
        newErrors.image3 = "Image URL must end in .png, .jpg, or .jpeg";
       if (image4 !== "" && (!image4.endsWith("jpg", "png", ".jpeg")))
        newErrors.image4 = "Image URL must end in .png, .jpg, or .jpeg";
       if (image5 !== "" && (!image5.endsWith("jpg", "png", ".jpeg")))
        newErrors.image5 = "Image URL must end in .png, .jpg, or .jpeg";

      }


        if(lat === "") newErrors.lat='Latitude is required'

        if(lng === "") newErrors.lng='Longitude is required'
    });

    return newErrors;
  };

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
    setErrors({});

    const newSpot = await dispatch(spotActions.createSpotAction(spot)).catch(
      async (res) => {
        const data = await res.json();
        if (data) setErrors({ ...errors, ...data.errors });
      }
    );


    if (!image1 === "") {

      if (newSpot)
        await dispatch(
          spotImageActions.createSpotImageAction(image1, true, newSpot.id)
        ).catch(async (res) => {
          const data = await res.json();
          if (data) setErrors({ ...errors, image1: data.errors });
        });
    }

    if (image2 !== "") {
      if (newSpot) { await dispatch(
            spotImageActions.createSpotImageAction(image2, newSpot.id)
          ).catch(async (res) => {
            const data = await res.json();
            if (data) setErrors({ ...errors, image2: data });
          })}};

    if (image3 !== "") {
        if (newSpot) { await dispatch(
            spotImageActions.createSpotImageAction(image3, newSpot.id)
          ).catch(async (res) => {
            const data = await res.json();
            if (data) setErrors({ ...errors, image3: data });
          })}};

    if (image4 !== "") {
     if(newSpot){
          await dispatch(
            spotImageActions.createSpotImageAction(image4, newSpot.id)
          ).catch(async (res) => {
            const data = await res.json();
            if (data) setErrors({ ...errors, image4: data });
          })}};

    if (image5 !== "") {
        if(newSpot) {
          (await dispatch(
            spotImageActions.createSpotImageAction(image5, newSpot.id)
          ).catch(async (res) => {
            const data = await res.json();
            if (data) setErrors({ ...errors, image5: data });
          }))};

    const allErrors = handleErrors(newSpot);
    if (allErrors !== {}) {
      return allErrors;
    } else if (newSpot) history.push(`/spots/${newSpot.id}`);
  }};

const allErrors = handleErrors();

  return (
    <div id="create-spot-form">
      <h1 className="title">Create a Spot</h1>
      <p id="title-info">Where is your spot located?</p>
      <p id="explain-spot-form">
        Guest's will only get your exact address once they book a reservation
      </p>

      <label id="country-label"> Country</label>
      <label id="errors-country">{allErrors.country}</label>
      <input
        id="country-input"
        type="text"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        placeholder="country"
        required
      ></input>

      <label id="address-label"> Street address</label>
      <label id="errors-address">{allErrors.address}</label>
      <input
        id="address-input"
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
        required
      ></input>

      <label id="state-label"> State</label>
      <label id="errors-state">{allErrors.state}</label>
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
      <label id="errors-city">{allErrors.city}</label>
      <input
        id="city-input"
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="City"
        required
      ></input>

      <label id="lat-label">Latitude</label>
      <label id="errors-lat">{allErrors.lat}</label>
      <input
        id="lat-input"
        type="text"
        value={lat}
        onChange={(e) => setLat(e.target.value)}
        placeholder="Latitude"
      ></input>
      <p id="lat-lng-comma">,</p>

      <label id="lng-label">Longitude</label>
      <label id="errors-lng">{allErrors.lng}</label>
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
      <label className="errors-description">{allErrors.description}</label>

      <hr id="line-break-two" />

      <h3 id="title-spot">Create a title for your spot</h3>
      <label className="errors-name">{allErrors.name}</label>
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
      <label id="errors-price">{allErrors.price}</label>
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

      <h3 id="photo-title">Liven up your spot with photos</h3>
      <h5 id="photo-description">
        submit a link to at least one photo to publish your spot!
      </h5>

      <input
        id="photo-input-1"
        type="text"
        value={image1}
        onChange={(e) => setImage1(e.target.value)}
        placeholder="Preview image URL"
        required
      ></input>
      <label id="errors-image1">{allErrors.image1}</label>
      <input
        id="photo-input-2"
        type="text"
        value={image2}
        onChange={(e) => setImage2(e.target.value)}
        placeholder="Image URL"
      ></input>
      <label id="errors-image2">{allErrors.image2}</label>
      <input
        id="photo-input-3"
        type="text"
        value={image3}
        onChange={(e) => setImage3(e.target.value)}
        placeholder="Image URL"
      ></input>
      <label id="errors-image3">{allErrors.image3}</label>
      <input
        id="photo-input-4"
        type="text"
        value={image4}
        onChange={(e) => setImage4(e.target.value)}
        placeholder="Image URL"
      ></input>
      <label id="errors-image4">{allErrors.image4}</label>
      <input
        id="photo-input-5"
        type="text"
        value={image5}
        onChange={(e) => setImage5(e.target.value)}
        placeholder="Image URL"
      ></input>
      <label id="errors-image5">{allErrors.image5}</label>

      <hr id="line-break-five" />

      <button onClick={handleSubmit} id="submit-create-spot">
        Create Spot
      </button>
    </div>
  );
}

export default CreateSpotPage;
