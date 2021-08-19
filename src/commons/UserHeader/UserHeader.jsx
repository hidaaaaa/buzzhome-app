import { Dropdown, Image } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React from "react";
import SignOut from "../SignOut/SignOut";
import "./style/UserHeader.scss";

function UserHeader({ auth, firebase, user }) {
	return (
		<Dropdown overlay={<SignOut auth={auth} trigger={["click"]} />}>
			<div className="headerUser">
				<div className="headerUser__name">{user.displayName || user.email}</div>
				<Avatar
					src={
						user.photoURL ||
						"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
					}
				/>
			</div>
		</Dropdown>
	);
}

export default UserHeader;
