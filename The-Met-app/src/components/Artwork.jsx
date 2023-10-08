import React, {useState, useEffect} from 'react'


const Artwork = ({ artworkID }) => {
    const [pieceOfArt, setPieceOfArt] = useState(null)

    useEffect(() => {
        getPieceOfArt()
    }, [artworkID])

    const getPieceOfArt = () => {
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${artworkID}`)
        .then((res) => res.json())
        .then((data) => setPieceOfArt(data))
        .catch((err) => console.error(`Error: ${err}`))
    };

    if (pieceOfArt == null) {
        return <p>Loading...</p>
    }

    const artImage = pieceOfArt.primaryImage
    const displayImageOrNot = artImage ? <img src={artImage} /> : <p>No Image Available</p>
    const artTitle = pieceOfArt.title
    
    return (
        <>
        <div>
            <h3>Title: {artTitle}</h3>
            <h4>Year: {pieceOfArt.objectDate}</h4>
            <div className="artwork-image">{displayImageOrNot}</div>
            <br/>
            <a href={pieceOfArt.objectURL}>See Museum's Page for {artTitle} </a>
            <p><b>Where to find it in the museum: {pieceOfArt.department}</b></p>
        </div>
        </>
    );
};

export default Artwork;