import { Button, Form, Input } from "antd";
import React from "react";
import "./style/CustomInputComment.scss";

function CustomInputComment({ onSubmit, name = "message" }) {
	const [form] = Form.useForm();

	const onFinish = async (values) => {
		if (onSubmit) {
			await onSubmit(values);
			form.resetFields();
		}
	};

	return (
		<>
			<Form className="commentInput" form={form} onFinish={onFinish}>
				<Form.Item
					className="commentInput__form"
					name={name}
					rules={[
						{
							required: true,
							message: `Please input your ${name}!`,
						},
					]}
				>
					<input className="commentInput__input" />
				</Form.Item>

				<Form.Item>
					<button className="commentInput__button primary" htmlType="submit">
						Submit
					</button>
				</Form.Item>
			</Form>
		</>
	);
}

export default CustomInputComment;
