import React from "react";
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

import PreviewUserSpot from '../Spots/previewSpot.js'
import * as sessionActions from '../../store/session.js';

function MyCollection () {
    const dispatch = useDispatch();
    const history = useHistory();
    const[isLoaded, setIsLoaded] = useState(false);
    const sessionUser = useSelector((state) => state.session.user)


    useEffect(() => {
        dispatch(sessionActions.spotsByUser()).then(() => setIsLoaded(true));
      }, [ dispatch])

      if (!sessionUser && isLoaded) history.push('/')

      const spots = useSelector((state) => state.session.owned);

      console.log(spots);
      return isLoaded && (
        <div>
            {(Object.values(spots)).map(spot => {
                return <PreviewUserSpot spot={spot} />
            })}
            
            </div>
      )

}
export default MyCollection;
