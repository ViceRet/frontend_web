import '../assets/styles/ObjectsCards.css'
import { useState } from 'react';
import ObjectsButton from './ObjectsButton'

function ObjectsCards({imgSrc, imgSrc2}) {
    const [showImage, setShowImages] = useState(false);
    const toggleImage =() => {
        setShowImages(!showImage);
    }
    return(
        <div className="object">
            <ObjectsButton onClick={toggleImage} showImage={showImage}/>
            <div className="object-continer">

                {showImage && <img src={imgSrc} className='icon-base2' alt='avatar'/> }
                {showImage && <img src={imgSrc2} className='icon-base2' alt='avatar'/> }
                {showImage && <img src={imgSrc} className='icon-base2' alt='avatar'/> }
            </div>


        </div>
    )
}

export default ObjectsCards

