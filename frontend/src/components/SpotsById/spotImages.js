import React from "react";

import './spotsById.css';


function SpotImages ({ spotImages, description }) {




return (

    spotImages.map(image => {
                if(image.preview === true){

            return <img key={image.id} src={image.url} id='preview-image' alt={description}></img>
        }
        return <img key = {image.id} src={image.url} alt={(image.url === 'https://reprospecialty.com/wp-content/themes/apexclinic/images/no-image/No-Image-Found-400x264.png') ? 'no image provided' : description} id={('image') + image.id} className='no-image'></img>;



}));
}

export default SpotImages;
