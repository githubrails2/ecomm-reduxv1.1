import createSagaMiddleware from "@redux-saga/core";
//import logger from "redux-logger";

export const sagaMiddleware = createSagaMiddleware();
const addedmiddleware = [sagaMiddleware];

export default addedmiddleware;
