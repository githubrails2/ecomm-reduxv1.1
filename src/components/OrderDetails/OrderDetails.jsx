import {
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
} from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setOrderDetails } from '../../redux/slices/orderSlice';
const columns = [
	{
		id: "productThumbnail",
		label: "",
	},
	{
		id: "productName",
		label: "Name",
	},
	{
		id: "productPrice",
		label: "Price",
	},
	{
		id: "quantity",
		label: "Quantity",
	},
];
const styles = {
	fontSize: "1.6rem",
	width: "10%",
};
const formatText = (columnName, columnValue) => {
    switch (columnName) {
        case 'productPrice':
            return `${columnValue}`
        case 'productThumbnail':
            return <img src={columnValue} alt={columnName} width="250px"/>
        default:
            return columnValue;
    }
    
}
const OrderDetails = ({ order }) => {

    
    const dispatch = useDispatch();
    const orderItems = order && order.orderItems;
    useEffect(() => {
        return () => {
            dispatch(setOrderDetails({}))
        }
    },[])
	return (
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow>
						{columns.map((col, pos) => {
							return (
								<TableCell key={pos} style={styles}>
									{col.label}
								</TableCell>
							);
						})}
					</TableRow>
				</TableHead>
				<TableBody>
					{Array.isArray(orderItems) &&
						orderItems.length > 0 &&
						orderItems.map((row, pos) => {
							return (
								<TableRow key={pos}>
                                    {columns.map((col, pos) => {
                                        const columnName = col.id;
                                        const columnValue = row[columnName];
                                        const formattedText  = formatText(columnName,columnValue)
										return (
											<TableCell key={pos} style={styles}>
												{formattedText}
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default OrderDetails;
