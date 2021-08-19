import { Button } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useHistory } from "react-router-dom";
import "./ChatMessage.scss";

function ChatMessage({ message, user, firestore, firebase }) {
	const { text, uid, photoURL, displayName } = message;
	const privateChatRef = firestore.collection("PrivateChat");
	const query = privateChatRef.orderBy("createAt").limit(25);

	const [privateChat] = useCollectionData(query, { idField: "id" });
	const history = useHistory();

	const [isModalVisible, setIsModalVisible] = useState(false);

	const showModal = () => {
		if (user !== "123") {
			setIsModalVisible(true);
		}
	};

	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const messageClass = user.uid === uid ? "sent" : "received";

	const changeToPrivateChat = async () => {
		const index = privateChat.findIndex((item) => {
			return item.idChat.search(uid) > -1 && item.idChat.search(user.uid) > -1;
		});

		if (index > -1) {
			history.push(`/message/${privateChat[index].idChat}`);
		} else {
			await privateChatRef.add({
				createAt: firebase.firestore.FieldValue.serverTimestamp(),
				idChat: `${uid}${user.uid}`,
				user1: {
					uid: user.uid,
					name: user.displayName || user.email,
					photoURL: user.photoURL,
				},
				user2: {
					uid: uid,
					name: displayName,
					photoURL: photoURL,
				},
			});

			history.push(`message/${uid}${user.uid}`);
		}
	};

	return messageClass === "sent" ? (
		<div className={`chatMessage ${messageClass}`}>
			<div className="chatMessage__content">
				<p className={`chatMessage__text ${messageClass}`}>{text}</p>
			</div>
		</div>
	) : (
		<div className={`chatMessage ${messageClass}`}>
			<Avatar
				size="large"
				src={
					photoURL ||
					"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
				}
				className="chatMessage__photo"
				onClick={showModal}
			/>
			<div className="chatMessage__content">
				<p className={`chatMessage__name ${messageClass}`}>{displayName}</p>
				<p className={`chatMessage__text ${messageClass}`}>{text}</p>
			</div>

			<Modal
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={false}
				className="modalBox"
			>
				<Avatar
					size="large"
					src={
						photoURL ||
						"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
					}
					className="chatMessage__photo"
				/>
				<div className="modalBox__title">{displayName}</div>

				<Button onClick={changeToPrivateChat}>Trò chuyện riêng</Button>
			</Modal>
		</div>
	);
}

export default ChatMessage;
