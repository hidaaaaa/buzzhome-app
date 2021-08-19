import { Button } from "antd";
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

function CustomChecked({ data, user, firestore }) {
	const productRef = firestore.collection("user");
	const query = productRef.limit(25);
	const [values, loading] = useCollectionData(query, { idField: "id" });

	if (!!!user) {
		return <></>;
	}

	const handleSubmit = () => {
		const index = values.findIndex(
			(item) => item.id === `${user.uid}${data.id}`
		);
		if (index >= 0) {
			firestore.collection("user").doc(`${user.uid}${data.id}`).set({
				isChecked: !values[index].isChecked,
			});
		} else {
			firestore.collection("user").doc(`${user.uid}${data.id}`).set({
				isChecked: true,
			});
		}
	};

	console.log(user.uid, data.id, values);

	return !loading ? (
		<div onClick={handleSubmit}>
			{values.findIndex((item) => item.id === `${user.uid}${data.id}`) >= 0 ? (
				values[values.findIndex((item) => item.id === `${user.uid}${data.id}`)]
					.isChecked ? (
					<Button type="primary" danger>
						Đã Quan Tâm
					</Button>
				) : (
					<Button type="primary">Quan Tâm</Button>
				)
			) : (
				<Button type="primary">Quan Tâm</Button>
			)}
		</div>
	) : (
		<></>
	);
}

export default CustomChecked;
