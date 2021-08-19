import { Button, Col, Form, Input, notification, Row } from "antd";
import React from "react";
import "./style/SignInForm.scss";

function form({ auth, firebase }) {
	const SignInWithGoogle = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		auth.signInWithPopup(provider);
	};

	const signIn = (email, password) => {
		auth
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				return notification.success({
					message: "Sign up sucess",
					description: "",
				});
			})
			.catch((error) => {
				let errorCode = "Fail";
				let errorMessage = error.message;

				return notification.error({
					message: errorCode,
					description: errorMessage,
				});
			});
	};

	const onFinish = (values) => {
		signIn(values.email, values.password);
	};

	return (
		<div className="form">
			<Form
				initialValues={{
					remember: true,
				}}
				onFinish={onFinish}
				className="form__form"
			>
				<div className="form__label">Email</div>

				<Form.Item
					name="email"
					rules={[
						{
							type: "email",
							message: "Please input your username!",
						},
					]}
				>
					<input className="form__input" />
				</Form.Item>

				<div className="form__label">Password</div>
				<Form.Item
					name="password"
					rules={[
						{
							required: true,
							message: "Please input your password!",
						},
					]}
				>
					<input type="password" className="form__input" />
				</Form.Item>

				<Form.Item>
					<button htmlType="submit" className="form__button  primary">
						Đăng nhập
					</button>
				</Form.Item>
			</Form>

			<button onClick={SignInWithGoogle} className="form__button google">
				Đăng Nhập với Google
			</button>
		</div>
	);
}

export default form;
