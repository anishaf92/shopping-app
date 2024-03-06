import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faForward } from "@fortawesome/free-solid-svg-icons";
import "../css/home.css";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term

  const cardsPerPage = 3;

  // State to manage the current page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages based on the number of recipes
  const totalPages = Math.ceil(
    (productData && productData.length) / cardsPerPage
  );

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = currentPage * cardsPerPage;

  // Get the subset of recipes for the current page
  const currentProducts =
    productData && productData.slice(startIndex, endIndex);

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = async (term) => {
    const searchTerm = term;
    // Call API or perform search logic with the search term
    try {
      const response = await fetch(
        `http://localhost:3001/product/getProductBySearch/${searchTerm}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Add any other headers if needed
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setProductData(result.result);
      console.log(result.result);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRefresh = () => {
    setRefresh(!refresh);
  };

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/product/getProducts", {
        method: "GET",
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setProductData(data.result);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {loading ? (
        <div className="center">Fetching gifts...</div>
      ) : (
        <div className="card-container">
          <button
            className="invisible__btn page__btn"
            onClick={handlePrevPage}
            disabled={currentPage === 1 || currentProducts.length === 0}
          >
            <FontAwesomeIcon icon={faBackward} />
          </button>

          {currentProducts.length === 0 ? (
            <div>No items found</div>
          ) : (
            currentProducts.map((product, index) => (
              <ProductCard
                key={index}
                productId={product._id}
                productName={product.name}
                productPrice={product.price}
                productOccasion={product.occasion}
                productImage={product.image_url}
                getRefresh={getRefresh}
              />
            ))
          )}

          <button
            className="invisible__btn page__btn"
            onClick={handleNextPage}
            disabled={
              currentPage === totalPages || currentProducts.length === 0
            }
          >
            <FontAwesomeIcon icon={faForward} />
          </button>
        </div>
      )}

      {currentProducts.length === 0 ? null : (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Home;
