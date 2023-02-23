import React, { } from 'react';
import collection_1 from '../slide/firstCollection.png'
import collection_2 from '../slide/secondCollection.png'
import collection_3 from '../slide/thirdCollection.png'
import collection_4 from '../slide/fourthCollection.png'
import collection_5 from '../slide/fifthCollection.png'
import collection_6 from '../slide/sixthCollection.png'
import {
  MDBCarousel,
  MDBCarouselItem,
} from 'mdb-react-ui-kit';


export default function Carousel() {
  return (
      <MDBCarousel showControls showIndicators>
        <MDBCarouselItem
          className='w-100 d-block'
          itemId={1}
          src={collection_1}
          alt='firstCollection'>
          <h5>Classic Collections</h5>
        </MDBCarouselItem>

        <MDBCarouselItem
          className='w-100 d-block'
          itemId={2}
          src={collection_2}
          alt='secondCollection' >
          <h5>Adorable</h5>
        </MDBCarouselItem>

        <MDBCarouselItem
          className='w-100 d-block'
          itemId={3}
          src={collection_3}
          alt='thirdCollection' >
          <h5 style={{color: "darkcyan"}}>Casual</h5>
        </MDBCarouselItem>

        <MDBCarouselItem
          className='w-100 d-block'
          itemId={4}
          src={collection_4}
          alt='fouthCollection' >
          <h5 style={{color: "darkcyan"}}>Aficana</h5>
        </MDBCarouselItem>

        <MDBCarouselItem
          className='w-100 d-block'
          itemId={5}
          src={collection_5}
          alt='fifthCollection' >
          <h5>Sophisticated</h5>
        </MDBCarouselItem>
        
        <MDBCarouselItem
          className='w-100 d-block'
          itemId={6}
          src={collection_6}
          alt='sixthCollection' >
          <h5>Flexible</h5>
        </MDBCarouselItem>
      </MDBCarousel>
  );
}