import { Form, notification } from "antd";
import React from "react";

function SignUpForm({ auth, firebase }) {
	const SignInWithGoogle = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		auth.signInWithPopup(provider);
	};

	const signUp = (email, password) => {
		auth
			.createUserWithEmailAndPassword(email, password)
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
		signUp(values.email, values.password);
	};

	return (
		<div className="form">
			<Form className="form__form" onFinish={onFinish}>
				<div className="form__label">Email</div>
				<Form.Item
					name="email"
					rules={[
						{
							required: true,
							type: "email",
							message: "Please input your email!",
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

				<div className="form__label">Password</div>
				<Form.Item
					name="confirm"
					dependencies={["password"]}
					hasFeedback
					rules={[
						{
							required: true,
							message: "Please confirm your password!",
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue("password") === value) {
									return Promise.resolve();
								}
								return Promise.reject(
									new Error("The two passwords that you entered do not match!")
								);
							},
						}),
					]}
				>
					<input type="password" className="form__input" />
				</Form.Item>

				<Form.Item>
					<button className="form__button primary" htmlType="submit">
						Đăng ký
					</button>
				</Form.Item>
			</Form>

			<button onClick={SignInWithGoogle} className="form__button google">
				Đăng Nhập với Google
			</button>
		</div>
	);
}

export default SignUpForm;
