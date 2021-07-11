import "./ProductResults.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsStart,
  selectProducts,
} from "../../redux/slices/productSlice";
import Product from "./Product/Product";
import { FormSelect } from "../Forms";
import { useHistory, useParams } from "react-router-dom";
const ProductResults = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const history = useHistory();
  const { filterType } = useParams();

  useEffect(() => {
    dispatch(fetchProductsStart({ filterType }));
  }, [dispatch,filterType]);

  if (!Array.isArray(products)) return null;
  if (products.length < 1) {
    return (
      <div className="products">
        <p>No Results Found</p>
      </div>
    );
  }
  const handleFilter = (e) => {
    const nextFilter = e.target.value;
    history.push(`/search/${nextFilter}`);
  };
  const configFilter = {
    defaultValue: filterType,
    options: [
      {
        name: "Show all",
        value: "",
      },
      {
        name: "Mens",
        value: "mens",
      },
      { name: "Womens", value: "womens" },
    ],
    handleChange: handleFilter,
  };
  return (
    <div className="products">
      <h1>Browse Products</h1>
      <FormSelect {...configFilter} />
      <div className="productResults">
        {products.map((product, i) => {
          const { productThumbnail, productName, productPrice } = product;
          if (
            !productThumbnail ||
            !productName ||
            typeof productPrice === "undefined"
          ) {
            return null;
          }
          const configProduct = {
            productThumbnail,
            productName,
            productPrice,
          };
          return <Product {...configProduct} />;
        })}
      </div>
    </div>
  );
};

export default ProductResults;
