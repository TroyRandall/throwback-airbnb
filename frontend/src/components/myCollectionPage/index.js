import React from "react";
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

import PreviewUserSpot from './previewUserSpot.js'
import * as currentActions from '../../store/current.js';

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
        <div>
            {spots.map(spot => {
                return <PreviewUserSpot  key={spot.id} spot={spot} />
            })}

            </div>
      )

}
export default MyCollection;
