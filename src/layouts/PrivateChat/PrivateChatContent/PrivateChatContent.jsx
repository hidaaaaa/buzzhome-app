import { Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatMessage from "../../../commons/ChatMessage/ChatMessage";
import CustomInputComment from "../../../commons/CustomInputComment/CustomInputComment";
import SignInForm from "../../../commons/SignInForm/SignInForm";
import SignUpForm from "../../../commons/SignUpForm/SignUpForm";

function PrivateChatContent({ firestore, idChat, user, firebase }) {
	const isLoggedIn = !!user;

	const [status, setStatus] = useState(true); //true = sign in || false = sign up
	const [isModalVisible, setIsModalVisible] = useState(false);
	const messageRef = firestore
		.collection("PrivateChat")
		.doc(idChat)
		.collection("Chat");
	const query = messageRef.orderBy("createAt").limit(25);

	const [messages] = useCollectionData(query, { idField: "id" });

	const dummy = useRef();

	useEffect(() => {
		dummy.current.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const handleSwitchAuth = () => {
		setStatus(!status);
	};

	const handleSendMessage = async (values) => {
		await messageRef.add({
			text: values.text,
			createAt: firebase.firestore.FieldValue.serverTimestamp(),
			uid: user.uid,
			photoURL: user.photoURL,
			displayName: user.displayName || user.email,
		});
	};

	return (
		<div className="globalChat">
			<div className="globalChat__content">
				<div>
					{messages &&
						messages.map((msg) => (
							<ChatMessage
								key={msg.id}
								message={msg}
								user={isLoggedIn ? user : "123"}
								firestore={firestore}
								firebase={firebase}
							/>
						))}
					<div ref={dummy}></div>
				</div>
			</div>

			<div className="globalChat__form">
				{isLoggedIn ? (
					<CustomInputComment onSubmit={handleSendMessage} name="text" />
				) : (
					<Button
						type="primary"
						onClick={showModal}
						style={{ width: "100%", marginBottom: "2rem" }}
					>
						Đăng nhập để bình luận
					</Button>
				)}
			</div>

			<Modal
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={false}
				className="modalBox"
			>
				{status ? (
					<>
						<div>Sign In</div>
						<SignInForm auth={firebase.auth()} firebase={firebase} />
						<span>
							Đã có tài khoản ?{" "}
							<Button type="link" onClick={handleSwitchAuth}>
								Đăng Ký
							</Button>
						</span>
					</>
				) : (
					<>
						<div>Sign Up</div>
						<SignUpForm auth={firebase.auth()} firebase={firebase} />
						<span>
							Đã có tài khoản ?{" "}
							<Button type="link" onClick={handleSwitchAuth}>
								Đăng nhập
							</Button>
						</span>
					</>
				)}
			</Modal>
		</div>
	);
}

export default PrivateChatContent;
