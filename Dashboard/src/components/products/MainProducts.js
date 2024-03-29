import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../Redux/Actions/ProductAction";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import PushForm from "./PushForm";


const MainProducts = () => {

  const [topRightModal, setTopRightModal] = React.useState(false);
  const toggleShow = () => setTopRightModal(!topRightModal);
  
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const {products, error } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {loading: deleteLoading, error:deleteError, success:deleteSuccess} = productDelete;

  useEffect(() => {
      let isMounted = true;
      if(isMounted){
        dispatch(listProducts())
      }
      return () => isMounted = false;
  }, [dispatch, deleteSuccess])


  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title">Products</h2>
          <div>
            <Link to="/addproduct" className="btn btn-primary">
              Create new
            </Link>
          </div>
          <div className="btn btn-primary sep"  onClick={toggleShow}>Push Notify</div>
        </div>

        <div className="card mb-4 shadow-sm">
          <header className="card-header bg-white ">
            <div className="row gx-3 py-3">
              <div className="col-lg-4 col-md-6 me-auto ">
                <input
                  type="search"
                  placeholder="Search..."
                  className="form-control p-2"
                />
              </div>
              <div className="col-lg-2 col-6 col-md-3">
                <select className="form-select">
                  <option>All category</option>
                  <option>Electronics</option>
                  <option>Clothings</option>
                  <option>Something else</option>
                </select>
              </div>
              <div className="col-lg-2 col-6 col-md-3">
                <select className="form-select">
                  <option>Latest added</option>
                  <option>Cheap first</option>
                  <option>Most viewed</option>
                </select>
              </div>
            </div>
          </header>

          <div className="card-body">
            {deleteError && (<Message variant={"alert-danger"}>{deleteError}</Message>)}
            {deleteLoading ? (<Loading />) 
              : error ? (<Message variant={"alert-danger"}>{error}</Message>)
              :(
                  <div className="row">
                    {/* Products */}
                    {products.map((product) => (
                      <Product product={product} key={product._id} />
                    ))}
                  </div>
              )
            }
            <nav className="float-end mt-4" aria-label="Page navigation">
              <ul className="pagination">
                <li className="page-item disabled">
                  <Link className="page-link" to="#">
                    Previous
                  </Link>
                </li>
                <li className="page-item active">
                  <Link className="page-link" to="#">
                    1
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" to="#">
                    2
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" to="#">
                    3
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" to="#">
                    Next
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
      {/* <!-- Modal --> */}
      <MDBModal
        animationDirection='right'
        show={topRightModal}
        tabIndex='-1'
        setShow={setTopRightModal}>
        <MDBModalDialog position='top-right' side>
          <MDBModalContent>
            <MDBModalHeader className='bg-info text-white'>
              <MDBBtn
                color='none'
                className='btn-close btn-close-white'
                onClick={toggleShow}>
              </MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <PushForm />
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn outline color='info' onClick={toggleShow}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default MainProducts;
