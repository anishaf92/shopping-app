import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import ProductCard from './ProductCard';
import Pagination from './Pagination';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBackward, faForward} from '@fortawesome/free-solid-svg-icons';

const Category = () => {
  const [loading, setLoading] = useState (false);
  const [productData, setProductData] = useState ([]);
  const [refresh, setRefresh] = useState (false);
  const {occasion} = useParams ();
  const api = process.env.REACT_APP_API_URL;
  const cardsPerPage = 3;

  // State to manage the current page
  const [currentPage, setCurrentPage] = useState (1);

  // Calculate the total number of pages based on the number of recipes
  const totalPages = Math.ceil (
    productData && productData.length / cardsPerPage
  );

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = currentPage * cardsPerPage;

  // Get the subset of recipes for the current page
  const currentProducts =
    productData && productData.slice (startIndex, endIndex);
  useEffect (
    () => {
      fetchDataByOccasion ();
    },
     // eslint-disable-next-line
    [refresh, occasion]
  );
  const getRefresh = () => {
    setRefresh (!refresh);
  };
  const fetchDataByOccasion = async () => {
    setLoading (true);
    try {
      const response = await fetch (
        `${api}/occasion/${occasion}`,
        {
          method: 'GET',
          mode: 'cors',
        }
      );

      if (!response.ok) {
        throw new Error (`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json ();
      setProductData (data.products);
    } catch (error) {
      console.error ('Fetch error:', error);
    } finally {
      setLoading (false);
    }
  };
  const handlePageChange = newPage => {
    setCurrentPage (newPage);
  };
  const handleNextPage = () => {
    setCurrentPage (currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage (currentPage - 1);
  };

  return (
    <div>
      {loading
        ? <div className="center">
            Fetching gifts...
          </div>
        : <div className="card-container">
            <button
              className="invisible__btn page__btn"
              onClick={handlePrevPage}
              disabled={currentPage === 1 || currentProducts.length === 0}
            >
              <FontAwesomeIcon icon={faBackward} />
            </button>

            {currentProducts.map ((product, index) => (
              <ProductCard
                key={index}
                productId={product._id}
                productName={product.name}
                productPrice={product.price}
                productOccasion={product.occasion}
                productImage={product.image_url}
                getRefresh={getRefresh}
              />
            ))}
            <button
              className="invisible__btn page__btn"
              onClick={handleNextPage}
              disabled={
                currentPage === totalPages || currentProducts.length === 0
              }
            >
              <FontAwesomeIcon icon={faForward} />
            </button>
          </div>}

      {currentProducts.length === 0
        ? null
        : <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />}

    </div>
  );
};

export default Category;
