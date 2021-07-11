import "./ProductResults.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsStart,
  selectProducts,
} from "../../redux/slices/productSlice";
import Product from "./Product/Product";
const ProductResults = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, [dispatch]);

  if (!Array.isArray(products)) return null;
  if (products.length < 1) {
    return (
      <div className="products">
        <p>No Results Found</p>
      </div>
    );
  }

  return (
    <div className="products">
      <h1>Browse Products</h1>
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
