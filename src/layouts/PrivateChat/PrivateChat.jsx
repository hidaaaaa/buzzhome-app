import { Menu } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Layout, { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import React, { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useHistory, useRouteMatch } from "react-router-dom";
import "./PrivateChat.scss";
import PrivateChatContent from "./PrivateChatContent/PrivateChatContent";

function PrivateChat({ user, firebase, firestore }) {
	const privateChatRef = firestore.collection("PrivateChat");
	const query = privateChatRef.orderBy("createAt").limit(25);
	const { params } = useRouteMatch();
	const history = useHistory();
	const [openedChat, setOpenedChat] = useState("12313");

	const [privateChats, loading] = useCollectionData(query, { idField: "id" });

	useEffect(() => {
		if (!loading) {
			const index = privateChats.findIndex((item) => item.idChat === params.id);
			setOpenedChat(privateChats[index].id);
		}
	}, [loading, params.id, privateChats]);

	if (loading) {
		return <>Loading ... </>;
	}

	const handleChangeGroupChat = (values) => {
		console.log(values);
		history.push(`/message/${values}`);
	};

	return (
		<Layout className="privateChat">
			<Sider
				className="privateChat__sider"
				width={320}
				breakpoint="lg"
				collapsedWidth="0"
			>
				<Menu className="privateChat__menu" mode="inline">
					{privateChats &&
						privateChats.map((privateChat, index) => {
							const friend =
								privateChat.user1.uid !== user.uid
									? privateChat.user1
									: privateChat.user2;
							if (privateChat.idChat.search(user.uid) > -1) {
								return (
									<Menu.Item
										key={index}
										onClick={() => handleChangeGroupChat(privateChat.idChat)}
									>
										<div className="listChat">
											<Avatar
												size="large"
												src={
													friend.photoURL ||
													"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
												}
												className="listChat__photo"
											/>
											<div className="listChat__name">{friend.name}</div>
										</div>
									</Menu.Item>
								);
							}
						})}
				</Menu>
			</Sider>

			<Layout className="privateChat__main">
				<Content className="profile__content">
					<PrivateChatContent
						firestore={firestore}
						idChat={openedChat}
						user={user}
						firebase={firebase}
					/>
				</Content>
			</Layout>
		</Layout>
	);
}

export default PrivateChat;
