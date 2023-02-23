import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { createProduct } from "../../Redux/Actions/ProductAction";
import { toast } from "react-toastify";
import { PRODUCT_CREATE_RESET } from "../../Redux/Constants/ProductConstants";
import Toast from '../LoadingError/Toast'


const ToastParams = {
        pauseOnFocusLoss : false,
        draggable: false,
        pauseOnHover:false,
        autoClose:2000
}

const AddProductMain = () => {

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);
  const {loading, product, error } = productCreate;

  useEffect(() => {
    if(product){
      toast.success("Product Added", ToastParams);
      dispatch({type: PRODUCT_CREATE_RESET});
      setName(" ");
      setDescription("");
      setStock(0);
      setImage("");
      setPrice(0);      
    }
  }, [dispatch,product])
  

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProduct(name, price, description, image, stock))
  }

  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];
    transformFile(file);
  }

  const transformFile = (file) => {
    const reader = new FileReader();
    if(file){ 
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result)
      }
    }else{}
  }

  return (
    <>
    <Toast />
    <div className="product-container">
      <section className="content-mainz" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Go to products
            </Link>
            <h4 className="content-title">Add product</h4>
            <div>
              <button type="submit" className="btn btn-primary">
                Publish now
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-12 col-lg-12">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {error && <Message variant={"alert-danger"}>{error}</Message>}
                  {loading && <Loading />}
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      Product title
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_title"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}/>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Count In Stock
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      required
                      value={stock}
                      onChange={(e) => setStock(e.target.value)} />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Description</label>
                    <textarea
                      placeholder="Type here"
                      className="form-control"
                      rows="7"
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Images</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Inter Image URL"
                      value={image}
                      onChange={(e) => setImage(e.target.value)} />
                    <input 
                      className="form-control mt-3" 
                      type="file"
                      accept="image/" 
                      onChange={handleProductImageUpload}/>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </form>
      </section>

      <div className="display-img">
         { image ? 
            (
              <>
                <img src={image} alt="preview" className="img"/>
              </> 
            ):(<><p>Image Preview</p></>)
         }
      </div>

    </div>
    {/* <section className='content-main' style={{ maxWidth: '1200px' }}>
        <form onSubmit={submitHandler}>
          <div className='content-header'>
            <Link to='/products' className='btn btn-danger text-white'>
              Go to products
            </Link>
            <h2 className='content-title'>Add product</h2>
            <div>
              <button type='submit' className='btn btn-primary'>
                Publish now
              </button>
            </div>
          </div>

          <div className='row mb-4'>
            <div className='col-xl-8 col-lg-8'>
              <div className='card mb-4 shadow-sm'>
                <div className='card-body'>
                  {error && <Message variant='alert-danger'>{error}</Message>}
                  {loading && <Loading />}
                  <div className='mb-4'>
                    <label htmlFor='product_title' className='form-label'>
                      Product title
                    </label>
                    <input
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      type='text'
                      placeholder='Type here'
                      className='form-control'
                      id='product_title'
                      required
                    />
                  </div>
                  <div className='mb-4'>
                    <label htmlFor='product_price' className='form-label'>
                      Price
                    </label>
                    <input
                      onChange={(e) => setPrice(e.target.value)}
                      value={price}
                      type='number'
                      placeholder='Type here'
                      className='form-control'
                      id='product_price'
                      required
                    />
                  </div>
                  <div className='mb-4'>
                    <label htmlFor='product_price' className='form-label'>
                      Count In Stock
                    </label>
                    <input
                      onChange={(e) => setStock(e.target.value)}
                      value={stock}
                      type='number'
                      placeholder='Type here'
                      className='form-control'
                      id='product_price'
                      required
                    />
                  </div>
                  <div className='mb-4'>
                    <label className='form-label'>Description</label>
                    <textarea
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                      placeholder='Type here'
                      className='form-control'
                      rows='7'
                      required
                    ></textarea>
                  </div>
                  <div className='mb-4'>
                    <label className='form-label'>Images</label>
                    <input
                      className='form-control'
                      type='text'
                      placeholder='Enter Image URL'
                      onChange={(e) => setImage(e.target.value)}
                      value={image}
                    />
                    <input className='form-control mt-3' type='file' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
    </section> */}
    </>
  );
};

export default AddProductMain;
