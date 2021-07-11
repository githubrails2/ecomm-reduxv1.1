import "./Products.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsStart,
  selectProducts,
} from "../../redux/slices/productSlice";
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
      {products.map((product, i) => {
        const { productThumbnail, productName, productPrice } = product;
        if (
          !productThumbnail ||
          !productName ||
          typeof productPrice === "undefined"
        )
          return null;
        return (
          <div key={i}>
            {productName}
            {productPrice}
          </div>
        );
      })}
    </div>
  );
};

export default ProductResults;
