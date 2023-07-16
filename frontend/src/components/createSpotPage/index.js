import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./createSpot.css";

import * as spotActions from "../../store/spots";
import * as spotImageActions from "../../store/spotImages";



function CreateSpotPage({ dark }) {
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
  const [toggle, setToggle] = useState(false);
  const [backendToggle, setBackendToggle] = useState(false);
  const [newSpot, setNewSpot] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  //if there is no user return to homepage
  if (!sessionUser) history.push("/");

  useEffect(() => {
    const inputs = document.getElementsByClassName('darkModeTexts');
    if(document.body.classList.contains('darkMode')){
      console.log(inputs);
      Array.prototype.forEach.call(inputs, (input) => {
        input.classList.add('darkModeInput')
      })
      console.log(inputs);
    }
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
    if (image1 === "") newErrors.image1 = "Preview Image is required";
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
      if (newSpot) {
        let newErrors = {};
        if (image2 !== "" && !image2.endsWith("jpg", "png", ".jpeg"))
          newErrors.image2 = "Image URL must end in .png, .jpg, or .jpeg";
        if (image3 !== "" && !image3.endsWith("jpg", "png", ".jpeg"))
          newErrors.image3 = "Image URL must end in .png, .jpg, or .jpeg";
        if (image4 !== "" && !image4.endsWith("jpg", "png", ".jpeg"))
          newErrors.image4 = "Image URL must end in .png, .jpg, or .jpeg";
        if (image5 !== "" && !image5.endsWith("jpg", "png", ".jpeg"))
          newErrors.image5 = "Image URL must end in .png, .jpg, or .jpeg";
          setErrors({...newErrors})
      }

  }, [ image2, image3, image4, image5, newSpot, name, address, city, state, country, description, image1, lat, lng, price, toggle])








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
        if(newSpot && newSpot?.id) setNewSpot(true);
    if ((!(image1 === "")) && (newSpot?.id)) {
      await dispatch(
        spotImageActions.createSpotImageAction(image1, true, newSpot.id)
      ).catch(async (res) => {
        const data = await res.json();
        if (data) newErrors.image1 = data.errors;
      });
    }
      if (image1 !== "") {
        if (image2 !== "") {
          if (newSpot) {
            await dispatch(
              spotImageActions.createSpotImageAction(image2, false, newSpot.id)
            ).catch(async (res) => {
              const data = await res.json();
              if (data) newErrors.image2 = data.errors;
            });
          }
        }

        if (image3 !== "") {
          if (newSpot) {
            await dispatch(
              spotImageActions.createSpotImageAction(image3, false, newSpot.id)
            ).catch(async (res) => {
              const data = await res.json();
              if (data) newErrors.image3 = data.errors;
            });
          }
        }

        if (image4 !== "") {
          if (newSpot) {
            await dispatch(
              spotImageActions.createSpotImageAction(image4, false, newSpot.id)
            ).catch(async (res) => {
              const data = await res.json();
              if (data) newErrors.image4 = data.errors;
            });
          }
        }

        if (image5 !== "") {
          if (newSpot) {
            await dispatch(
              spotImageActions.createSpotImageAction(image5, false, newSpot.id)
            ).catch(async (res) => {
              const data = await res.json();
              if (data) newErrors.image5 = data.errors;
            });
          }
        }
      }

          setErrors({...newErrors})
      if ((errors) && (Object.values(newErrors).length > 0)) return errors;
      else return history.push(`/spots/${newSpot.id}`);
 }}


const darkMode = ('darkModeTexts')

    return (
      <div id="create-spot-form">
        <h1 className="title">Create a Spot</h1>
        <p id="title-info">Where is your spot located?</p>
        <p id="explain-spot-form">
          Guest's will only get your exact address once they book a reservation
        </p>

        <label id="country-label"> Country</label>
        <label id="errors-country">{errors?.country}</label>
        <input
          id="country-input-create"
          className={darkMode}
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="country"
          required
        ></input>

        <label id="address-label"> Street address</label>
        <label id="errors-address">{errors?.address}</label>
        <input
          id="address-input-create"
          className={darkMode}
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
          required
        ></input>

        <label id="state-label"> State</label>
        <label id="errors-state">{errors?.state}</label>
        <input
          id="state-input-create"
          className={darkMode}
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
          id="city-input-create"
          className={darkMode}
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
          required
        ></input>

        <label id="lat-label">Latitude</label>
        <label id="errors-lat">{errors?.lat}</label>
        <input
          id="lat-input-create"
          className={darkMode}
          type="text"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          placeholder="Latitude"
        ></input>
        <p id="lat-lng-comma">,</p>

        <label id="lng-label">Longitude</label>
        <label id="errors-lng">{errors?.lng}</label>
        <input
          id="lng-input-create"
          className={darkMode}
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
          id="description-input-create"
          className={darkMode}
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
          catch guests attention with a spot title that highlights what makes
          your place special!
        </h5>
        <input
          id="title-input-create"
          className={darkMode}
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
          id="price-input-create"
          className={darkMode}
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
          id="photo-input-1-create"
          className={darkMode}
          type="text"
          value={image1}
          onChange={(e) => setImage1(e.target.value)}
          placeholder="Preview image URL"
          required
        ></input>
        <label id="errors-image1">{errors?.image1}</label>
        <input
          id="photo-input-2-create"
          className={darkMode}
          type="text"
          value={image2}
          onChange={(e) => setImage2(e.target.value)}
          placeholder="Image URL"
        ></input>
        <label id="errors-image2">{errors?.image2}</label>
        <input
          id="photo-input-3-create"
          className={darkMode}
          type="text"
          value={image3}
          onChange={(e) => setImage3(e.target.value)}
          placeholder="Image URL"
        ></input>
        <label id="errors-image3">{errors?.image3}</label>
        <input
          id="photo-input-4-create"
          className={darkMode}
          type="text"
          value={image4}
          onChange={(e) => setImage4(e.target.value)}
          placeholder="Image URL"
        ></input>
        <label id="errors-image4">{errors?.image4}</label>
        <input
          id="photo-input-5-create"
          className={darkMode}
          type="text"
          value={image5}
          onChange={(e) => setImage5(e.target.value)}
          placeholder="Image URL"
        ></input>
        <label id="errors-image5">{errors?.image5}</label>

        <hr id="line-break-five" />

        <button onClick={handleSubmit} id="submit-create-spot">
          Create Spot
        </button>
      </div>
    );

}
export default CreateSpotPage;
