import { Button } from "antd";
import Layout from "antd/lib/layout/layout";
import React from "react";
import ContentAdmin from "./Components/ContentAdmin/ContentAdmin";
import SiderAdmin from "./Components/SiderAdmin/SiderAdmin";

function HomeAdmin({ auth, user, firebase, firestore }) {
	return (
		<Layout style={{ height: "100vh" }}>
			<SiderAdmin auth={auth} user={user} />

			<ContentAdmin firebase={firebase} firestore={firestore} />
		</Layout>
	);
}

export default HomeAdmin;
