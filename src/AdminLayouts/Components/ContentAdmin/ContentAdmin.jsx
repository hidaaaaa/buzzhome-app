import { Button, Layout, Space, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { getAllData } from "../../../api/house.api";
import { formatTime } from "../../../utils/function.utils";

const { Content } = Layout;

function ContentAdmin({ firebase, firestore }) {
	const columns = [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
		},
		{
			title: "Vị trí",
			dataIndex: "district",
			key: "district",
			render: (district) => <>{district === "" ? "Hồ Chí Minh" : district}</>,
		},
		{
			title: "Giá",
			dataIndex: "price",
			key: "price",
		},
		{
			title: "Nội dung",
			dataIndex: "content",
			key: "content",
			ellipsis: {
				showTitle: false,
			},
			render: (content) => <Tooltip placement="topLeft">{content}</Tooltip>,
		},
		{
			title: "Ngày tạo",
			dataIndex: "createdAt",
			key: "createdAt",
			render: (createdAt) => <>{formatTime(createdAt)} </>,
		},
		{
			title: "Người đăng",
			dataIndex: "username",
			key: "username",
		},
		{
			title: "Action",
			dataIndex: "MaVeXe",
			key: "MaVeXe",
			render: (id) => (
				<Space size="middle">
					<Button type="text" danger onClick={() => handleDeletePost(id)}>
						Delete
					</Button>
				</Space>
			),
		},
	];

	const [allPost, setAllPost] = useState([]);

	console.log(allPost);

	useEffect(() => {
		(async () => {
			try {
				const result = await getAllData();

				setAllPost(result.rows);
			} catch (error) {
				console.log("false to fetch :", error);
			}
		})();
	}, []);

	const handleDeletePost = async (MaVeXe) => {};

	return (
		<Layout style={{ padding: "0 24px 24px" }}>
			<Content
				className="site-layout-background"
				style={{
					padding: 24,
					margin: 0,
					minHeight: 280,
				}}
			>
				<Table
					dataSource={allPost}
					style={{
						overflowX: "auto",
						backgroundColor: "#ffffff",
						borderRadius: "10px",
						padding: "1rem",
					}}
					pagination={{
						pageSize: 8,
					}}
					columns={columns}
				/>
			</Content>
		</Layout>
	);
}

export default ContentAdmin;
