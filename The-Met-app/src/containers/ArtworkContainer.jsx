import React, {useState, useEffect} from 'react'
import ArtList from '../components/ArtList'
import Artwork from '../components/Artwork'


const ArtworkContainer = () => {

    const [artworks, setArtworks] = useState([])
    const [selectedArtworkID, setSelectedArtworkID] = useState(null)

    useEffect(() => {
        getArtwork()
    }, [])

const getArtwork = () => {
    fetch('https://collectionapi.metmuseum.org/public/collection/v1/search?artistOrCulture=true&q=vincent%20van%20gogh')
    .then((res) => res.json())
    .then((artworksData) => {
        const artworksList = artworksData.objectIDs.map((artworkID) => {
            return { id: artworkID }
    })
        setArtworks(artworksList)
    })
    
    .catch((err) => console.error(`Error: ${err}`))
}

    const handleArtworkSelected = (selectedArtworkID) => {
        setSelectedArtworkID(selectedArtworkID)
    }

    return ( 
        <>
            <div className="artwork-container"></div>
                <h1>The Met's Collection</h1>
                <h2>Vincent Van Gogh</h2>
                <ArtList artworks={artworks} onArtworkSelected={handleArtworkSelected} />
                {selectedArtworkID && 
                    (<div className="artwork-box">
                        <Artwork artworkID={selectedArtworkID} />
                    </div>
                )}
        </>
    );
}

export default ArtworkContainer