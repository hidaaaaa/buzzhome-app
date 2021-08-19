import { Button, Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";

function SignOut({ auth }) {
	return (
		<Menu>
			<Menu.Item>
				<Button type="link">
					<Link to="/me">Hồ sơ</Link>
				</Button>
			</Menu.Item>
			<Menu.Item>
				<Button danger onClick={() => auth.signOut()} type="text">
					Đăng Xuất
				</Button>
			</Menu.Item>
		</Menu>
	);
}

export default SignOut;
