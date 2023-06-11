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


    useEffect(() => {
        dispatch(currentActions.spotsByUser()).then(() => setIsLoaded(true));
      }, [ dispatch])

      if (!sessionUser && isLoaded) history.push('/')

      const spots = useSelector((state) => state.current.current);


      return isLoaded && (
        <div className='user-spots-container'>
            {spots.map(spot => {

               return ( <div id='collection-container'>
                 <PreviewUserSpot  key={spot.id} spot={spot} />
                <UpdateSpotButton spotId={spot.id} />
                <DeleteSpotButton key={spot.id} id={spot.id}/>
                </div>)
            })}

            </div>
      )

}
export default MyCollection;
