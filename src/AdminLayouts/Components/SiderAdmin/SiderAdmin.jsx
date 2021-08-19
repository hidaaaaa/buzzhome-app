import { Button, Menu } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Sider from "antd/lib/layout/Sider";
import React from "react";

const { SubMenu } = Menu;

function SiderAdmin({ auth, user }) {
	return (
		<Sider>
			<Menu mode="inline" theme="dark" defaultSelectedKeys={["1"]}>
				<Menu.Item
					key="1"
					style={{
						fontSize: "2.5rem",
						fontWeight: "bold",
						backgroundColor: "#ffffff",
						color: "#001529",
						width: "calc(100% - 2rem)",
						margin: "1rem 1rem 4rem 1rem",
						borderRadius: "10px",
					}}
				>
					Buzzhome
				</Menu.Item>

				<SubMenu
					key="sub1"
					title={
						<>
							<Avatar
								src={
									user.photoURL ||
									"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
								}
								size="small"
								style={{ marginRight: "10px" }}
							/>
							{user.displayName || user.email}
						</>
					}
				>
					<Menu.Item key="2">
						<Button danger onClick={() => auth.signOut()} type="text">
							Đăng Xuất
						</Button>
					</Menu.Item>
				</SubMenu>

				<Menu.Item key="1">Xóa bài viết</Menu.Item>
			</Menu>
		</Sider>
	);
}

export default SiderAdmin;
