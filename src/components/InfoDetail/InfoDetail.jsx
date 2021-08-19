import { Avatar } from "antd";
import React from "react";
import DollarIcon from "../../assets/icons/dollar.svg";
import HomeIcon from "../../assets/icons/home-2.svg";
import LocationIcon from "../../assets/icons/place-marker.svg";
import CustomChecked from "../../commons/CustomChecked/CustomChecked";
import CustomCarousel from "./components/CustomCarousel/CustomCarousel";
import "./InfoDetail.scss";

const InfoDetail = (props) => {
	const { data, user, firestore } = props;

	// const [postedDate, setPostedDate] = useState()
	// useEffect (()=>{
	//     setPostedDate(getDateFromTimestamp(data.postedTimestamp))
	// }, [data.postedTimestamp])

	return (
		<div className="info-detail">
			<CustomCarousel data={data.postImg} />
			{/* <div className="title">
                <Link to="/">{data.title}</Link>
            </div> */}
			{/* <div className="date">{postedDate}</div> */}
			<div className="date">{data.timeStamp}</div>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<div className="info-detail-with-icon">
					<div className="info-detail-icon-item">
						<span className="icon u-icon">
							<img src={LocationIcon} alt="icon" />
						</span>
						<span className="content">{data.district}</span>
					</div>
					<div className="info-detail-icon-item">
						<span className="icon u-icon">
							<img src={DollarIcon} alt="icon" />
						</span>
						<span className="content">{data.price}</span>
					</div>
					<div className="info-detail-icon-item">
						<span className="icon u-icon">
							<img src={HomeIcon} alt="icon" />
						</span>
						<span className="content">{data.room}</span>
					</div>
				</div>
				<CustomChecked data={data} firestore={firestore} user={user} />
			</div>
			<div className="description">{data.content}</div>
			<div className="info-detail-footer">
				<div className="author">
					{/* <span>Posted on Jul 10</span> */}
					<div className="author-info">
						<div className="author-avatar">
							<Avatar src={data.userAvatar} alt={data.username} />
						</div>
						<p className="author-name">{data.username}</p>
					</div>
				</div>
				<div className="resource">
					<a
						href={(data.postLink || "").replace(
							"m.facebook.com",
							"facebook.com"
						)}
						target="_blank"
						rel="noopener noreferrer"
					>
						Link To Post
					</a>
				</div>
			</div>
		</div>
	);
};

export default InfoDetail;
