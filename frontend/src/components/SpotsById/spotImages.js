import React from "react";

function SpotImages ({ spotImages, description }) {
return (
    spotImages.map(image => {
        return <img key = {image.id} src={image.url} alt ={description}></img>})
)
}

export default SpotImages;
