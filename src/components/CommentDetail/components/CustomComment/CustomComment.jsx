import { Button } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import CustomInputComment from "../../../../commons/CustomInputComment/CustomInputComment";
import CommentItem from "../CommentItem/CommentItem";

const CustomComment = ({ data, productCommentRef, firebase, user }) => {
	const [isReply, setIsReply] = useState(false);

	const replyComment = productCommentRef
		.doc(data.id)
		.collection("replyComment");
	const [values, loading] = useCollectionData(replyComment, { idField: "id" });

	const handleClick = () => {
		setIsReply(!isReply);
	};

	const handleSubmit = async (values) => {
		await replyComment.add({
			avatar: user.photoURL || "",
			displayName: user.displayName || user.email,
			createAt: firebase.firestore.FieldValue.serverTimestamp(),
			idUser: user.uid,
			message: values.message,
		});
		setIsReply(false);
	};

	return (
		<CommentItem {...data}>
			{(values || []).map((item, index) => (
				<CommentItem key={index} {...item} />
			))}
			{!!user ? (
				!isReply ? (
					<Button type="link" onClick={handleClick}>
						Trả lời...
					</Button>
				) : (
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<CustomInputComment onSubmit={handleSubmit} />
						<Button danger type="text" onClick={handleClick}>
							Cancel
						</Button>
					</div>
				)
			) : (
				<></>
			)}
		</CommentItem>
	);
};

CustomComment.propTypes = {
	data: PropTypes.object,
};

export default CustomComment;
