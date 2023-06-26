import React from "react";
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

import PreviewUserSpot from './previewUserSpot.js'
import * as currentActions from '../../store/current.js';
import './myCollection.css';
import UpdateSpotButton from "../../components/updateSpotButton";
import DeleteSpotButton from "../../components/deleteSpotButton";

function MyCollection () {
    const dispatch = useDispatch();
    const history = useHistory();
    const[isLoaded, setIsLoaded] = useState(false);
    const sessionUser = useSelector((state) => state.session.user)
    const spots = useSelector((state) => state.spots)



    useEffect(() => {
        dispatch(currentActions.spotsByUser()).then(() => setIsLoaded(true));
      }, [ dispatch, spots])

      if (!sessionUser && isLoaded) history.push('/')

      const userSpots = useSelector((state) => state.current.current);


      return isLoaded && (
        <div className='user-spots-container'>
            {userSpots.map(spot => {

               return ( <div key={spot.id} id='collection-container'>
                 <PreviewUserSpot  key={spot.id} spot={spot} />
                <UpdateSpotButton key={spot.id+50} spotId={spot.id} />
                <DeleteSpotButton key={spot.id+100} id={spot.id}/>
                </div>)
            })}

            </div>
      )

}
export default MyCollection;
