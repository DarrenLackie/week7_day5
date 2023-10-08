import React, { useState, useEffect } from 'react'
import "../index.css"

const ArtList = ({ artworks, onArtworkSelected }) => {
    const [artworkDetails, setArtworkDetails] = useState([])

    useEffect(() => {

    Promise.all(
        artworks.map((artwork) => 
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${artwork.id}`)
        .then((res) => res.json())
    ))
        .then((artworkDetails) => setArtworkDetails(artworkDetails))
        .catch((err) => console.error(`Error: ${err}`))
    }, [artworks])

    const handleChange = (event) => {
        const selectedArtworkTitle = event.target.value
        const selectedArtwork = artworkDetails.find((artwork) => artwork.title === selectedArtworkTitle)
    
        if (selectedArtwork) {
            onArtworkSelected(selectedArtwork.objectID)
        }
    };

    return (
    <>
        <select className="select" defaultValue="Choose an artwork" onChange={handleChange}>
            <option value="Choose an artwork" disabled>Choose an artwork</option>
            {artworkDetails.map((artwork) => (
            <option className="artwork-option" key={artwork.objectID}>{artwork.title}</option>
        ))}
        </select>
    </>
    )
}

export default ArtList