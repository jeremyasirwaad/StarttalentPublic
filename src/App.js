import { useState, useEffect } from "react";
import "./App.css";
import { Navbar } from "./Components/Navbar/Navbar";
import { SideNav } from "./Components/SideNav/SideNav";
import { Search } from "./Components/Search/Search";
import { LandingDash } from "./Components/LandingDash/LandingDash";
import { ToastContainer, toast } from "react-toastify";
import { onValue, ref } from "firebase/database";
import { db } from "./Components/Config/fireBaseFile";
import ScaleLoader from "react-spinners/ScaleLoader";
import { Edit_Showmodal } from "./Components/Edit_showmodal/Edit_Showmodal";
import { FinishedDetails } from "./Components/finisheddetails/FinishedDetails";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Landing from "./Landing";

import { TableFilter } from "./Components/Tablefilter/TableFilter";
import "react-toastify/dist/ReactToastify.css";

function App() {
	const [students, setStudents] = useState([]);
	const [sidenavopen, setSidenavopen] = useState(false);
	const [studentsawaiting, setStudentsawaiting] = useState([]);
	const [loaded, setLoaded] = useState(true);

	useEffect(() => {
		onValue(ref(db, "/completed"), (snapshot) => {
			setStudentsawaiting([]);
			const data = snapshot.val();
			if (data !== null) {
				Object.values(data).map((student) => {
					setStudentsawaiting((oldArray) => [...oldArray, student]);
				});
			}
		});
	}, []);
	const sidenavmanager = () => {
		setSidenavopen(!sidenavopen);
	};

	const toastsucess = () => {
		toast.success("Data Created Sucessfully");
	};

	setTimeout(() => {
		setLoaded(false);
	}, 3200);

	return (
		<div className="App">
			{/* <ToastContainer />
			<Navbar sidenavopenfun={sidenavmanager} sidenavstatus={sidenavopen} />
			<SideNav sidenavstatus={sidenavopen} toastmanager={toastsucess} />
			{studentsawaiting.length !== 0 ? (
				<LandingDash
					data={studentsawaiting}
					sidenavopenfun={sidenavmanager}
					sidenavstatus={sidenavopen}
				/>
			) : (
				<div className="loading">
					<ScaleLoader color={"blueviolet"} loading={true} size={70} />
				</div>
			)} */}
			{/* {loaded ? (
				<div className="startupload" >
					<img src={loadinglogo} alt="" />
					</div>
			) : ( */}
				<BrowserRouter>
					<Routes>
						{/* <Route path="/" element={<Landing />}></Route>
						<Route
							exact
							path="/student/:type/:id"
							element={<Edit_Showmodal />}
						></Route> */}
						<Route
							exact
							path="/finished/:type/:id"
							element={<FinishedDetails />}
						></Route>
						{/* <Route path="/search" element={<Search />}></Route> */}
						<Route path="/" element={<TableFilter />}></Route>
					</Routes>
				</BrowserRouter>
			{/* ) */}
			{/* } */}
		</div>
	);
}

export default App;
