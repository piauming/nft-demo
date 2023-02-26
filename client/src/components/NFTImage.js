import React, { useState, useEffect } from "react";
import './NFTImage.css';

const NFTImage = ({ tokenUri }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        console.log("useEffect tokenUri");
        setIsLoading(true);

        fetch(tokenUri)
            .then(response => {
                return response.json();
            }).then(data => {
                console.log("data", data);
                setImageSrc(data.image);
            }).catch((e) => {
                setImageSrc(null);
            }).finally((e) => {
                setIsLoading(false);
            });

    }, [tokenUri]);


    return (
        <div style={{ marginTop: 20 }}>
            {(!imageSrc) &&
                <div className="image-placeholder">
                    NFT Image will be displayed here
                </div>
            }

            {(!isLoading && imageSrc) &&
                <div>
                    <img style={{ width: '100%' }} src={imageSrc} alt="nft image" />
                </div>
            }
        </div>
    );
}

export default NFTImage;