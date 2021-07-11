import { firestore } from "../../../firebase/utils";

export const handleAddProduct = (product) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .doc()
      .set(product)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const handleFetchProducts = () => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .orderBy("createdDate")
      .get()
      .then((snapshot) => {
        const productsArray = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            documentID: doc.id,
          };
        });
        resolve(productsArray);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const handleDeleteProducts = (documentID) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .doc(documentID)
      .delete()
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const handleDeleteProduct = (documentID) => {
	console.log("Helper", documentID);
	return new Promise((resolve, reject) => {
		firestore
			.collection("products")
			.doc(documentID.payload)
			.delete()
			.then(() => {
				resolve();
			})
			.catch((error) => {
				reject(error);
			});
	});
};
