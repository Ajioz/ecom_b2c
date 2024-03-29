import React, { useState } from 'react';
import { 
  MDBFooter, 
  MDBContainer, 
  MDBRow, 
  MDBCol, 
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBIcon } from 'mdb-react-ui-kit';
import { Link } from "react-router-dom";
import { Contact } from './homeComponents/Contact';

export default function Footer() {

  const [topRightModal, setTopRightModal] = useState(false);
  const toggleShow = () => setTopRightModal(!topRightModal);

  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted' >
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href='https://www.facebook.com/profile.php?id=100090154294939&mibextid=ZbWKwL' className='me-4 text-reset' target="_blank"  rel="noreferrer">
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href='https://instagram.com/hubsandy?igshid=ZDdkNTZiNTM=' className='me-4 text-reset' target="_blank" rel="noreferrer" >
            <MDBIcon fab icon="instagram" />
          </a>
          <a href='https://linkedin.com/in/hubsandy' className='me-4 text-reset' target="_blank" rel="noreferrer">
            <MDBIcon fab icon="linkedin" />
          </a>
          <a href="whatsapp://send?text=Hi hubSandy, I'd love to order some product, I thought of reaching out first!&phone=+2349070953512" className='me-4 text-reset' target="_blank" rel="noreferrer">
            <MDBIcon fab icon="whatsapp" />
          </a>
          <a href='https://www.youtube.com/@sandyhub-Collections' className='me-4 text-reset' target="_blank" rel="noreferrer">
            <MDBIcon fab icon="youtube" />
          </a>
       
        
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
                hubSandy Collection
              </h6>
              <p>We produce and deliver high quality products of various sizes that meet your need</p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
              <p><a href='#!' className='text-reset'> Native Outfits</a></p>
              <p><a href='#!' className='text-reset'>Western Outfits</a></p>
              <p><a href='#!' className='text-reset'>Gadgets</a></p>
              <p><a href='#!' className='text-reset'>Children's World</a></p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p><Link to='/register' className='text-reset'>Register</Link></p>
              <p><a href='#!' className='text-reset' onClick={toggleShow} >Contact</a></p>
              <p><a href="https://www.youtube.com/@sandyhub-Collections" className='text-reset'
              target="_blank"  rel="noreferrer">About</a></p>
              <p><a href='#!' className='text-reset' onClick={toggleShow} >Help</a></p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Warri, Delta 332213, Nigeria
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                info@hubsandy.com
              </p>
              <p><MDBIcon icon="phone" className="me-3" /> +234-907 095 3512</p>
              <p><MDBIcon icon="phone" className="me-3" /> +234-806 410 7055</p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
          {/* <!-- Modal --> */}
          <MDBModal
            animationDirection='right'
            show={topRightModal}
            tabIndex='-1'
            setShow={setTopRightModal}>
            <MDBModalDialog position='top-right' side>
              <MDBModalContent>
                <MDBModalHeader className='bg-info text-white'>
                  <MDBModalTitle>Send Your Enquiry</MDBModalTitle>
                  <MDBBtn
                    color='none'
                    className='btn-close btn-close-white'
                    onClick={toggleShow}
                  ></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                  <Contact />
                </MDBModalBody>
                <MDBModalFooter>
                  <MDBBtn outline color='info' onClick={toggleShow}>
                    Close
                  </MDBBtn>
                </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © {new Date().getFullYear()} Copyright:{" "}
        <a className='text-reset fw-bold' href='https://ajiozi.com/'>
          Powered by Ajiozi
        </a>
      </div>
    </MDBFooter>
  );
}