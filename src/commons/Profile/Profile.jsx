import { Menu } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import ChangePassword from "./Component/ChangePassword/ChangePassword";
import LikePost from "./Component/LikePost/LikePost";
import Information from "./Component/Profile/Information";
import "./style/profile.scss";

function Profile({ user, firebase, storage }) {
	return (
		<Layout className="profile">
			<Sider
				className="profile__sider"
				width={320}
				breakpoint="lg"
				collapsedWidth="0"
			>
				<Menu
					className="profile__menu"
					mode="inline"
					defaultSelectedKeys={["1"]}
				>
					<Menu.Item key="1">
						<Link to="/me/information">Hồ sơ</Link>
					</Menu.Item>
					<Menu.Item key="2">
						<Link to="/me/forgot">Đổi mật khẩu</Link>
					</Menu.Item>
					<Menu.Item key="3">
						<Link to="/me/like-post">Các bài viết đã quan tâm</Link>
					</Menu.Item>
				</Menu>
			</Sider>
			<Layout>
				<Content className="profile__content">
					<Switch>
						<Route path="/me/information">
							<Information user={user} firebase={firebase} storage={storage} />
						</Route>
						<Route path="/me/forgot">
							<ChangePassword user={user} firebase={firebase} />
						</Route>
						<Route path="/me/like-post">
							<LikePost user={user} firebase={firebase} />
						</Route>
					</Switch>
				</Content>
			</Layout>
		</Layout>
	);
}

export default Profile;
