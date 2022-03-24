import React, { useState, useEffect } from "react";
import "./Tablefilter.css";
import { ToastContainer, toast } from "react-toastify";
import { SideNav } from "../SideNav/SideNav";
import { onValue, ref, set, update } from "firebase/database";
import { db } from "../Config/fireBaseFile";
import MaterialTable from "material-table";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import AnimatedNumber from "react-animated-number";
import logo from "../StartTalent.gif";

export const TableFilter = () => {
	const [sidenavopen, setSidenavopen] = useState(false);
	const [tabledata, setTabledata] = useState([]);
	const [startDate, setStartDate] = useState(new Date());
	const [fake, setFake] = useState([2001, 2002, 2003, 2001, 2004, 2005, 2006]);
	const [fake1, setFake1] = useState();
	const [dynamicobj, setdynamicobj] = useState([]);
	const [dynamicobjcompname, setDynamicobjcompname] = useState([]);
	const [dynamicobjcall, setDynamicobjcall] = useState([]);
	const [dynamaicobjdepart, setDynamaicobjdepart] = useState([]);
	const [muiTableKey, setMuiTableKey] = useState(0);
	const [fulltimecount, setFulltimecount] = useState(0);
	const [parttimecount, setparttimecount] = useState(0);
	const [loaded, setLoaded] = useState(true);

	useEffect(() => {
		onValue(ref(db, "/finished"), (snapshot) => {
			setTabledata([]);
			if (snapshot.val() !== null && snapshot.val() !== undefined) {
				Object.values(snapshot.val()).map((child) => {
					setTabledata((oldval) => [...oldval, child]);
				});
			}
		});

		// setparttimecount(tabledata.filter((e) => {
		// 	return e.typeofjob == "Internship"
		// }));

		onValue(ref(db, "/yeardata"), (snapshot) => {
			if (snapshot.val() !== null && snapshot.val() !== undefined) {
				// setFake1(snapshot.val().year);
				var obj = snapshot.val().year.reduce(function (acc, cur, i) {
					acc[cur.slice(11)] = cur.slice(11);
					return acc;
				}, {});
				setdynamicobj(obj);
			}
		});

		onValue(ref(db, "/compnamedata"), (snapshot) => {
			if (snapshot.val() !== null && snapshot.val() !== undefined) {
				// setFake1(snapshot.val().year);
				var obj = snapshot.val().companylist.reduce(function (acc, cur, i) {
					acc[cur.slice(11)] = cur.slice(11);
					return acc;
				}, {});
				setDynamicobjcompname(obj);
			}
		});

		onValue(ref(db, "/calldata"), (snapshot) => {
			if (snapshot.val() !== null && snapshot.val() !== undefined) {
				// setFake1(snapshot.val().year);
				var obj = snapshot.val().calllist.reduce(function (acc, cur, i) {
					acc[cur.slice(11)] = cur.slice(11);
					return acc;
				}, {});
				setDynamicobjcall(obj);
			}
		});

		onValue(ref(db, "/departdata"), (snapshot) => {
			if (snapshot.val() !== null && snapshot.val() !== undefined) {
				// setFake1(snapshot.val().year);
				var obj = snapshot.val().depart.reduce(function (acc, cur, i) {
					acc[cur.slice(11)] = cur.slice(11);
					return acc;
				}, {});
				setDynamaicobjdepart(obj);
			}
		});
	}, []);

	const intern = tabledata.filter((e) => {
		return e.typeofjob == "Internship";
	}).length;

	const fulls = tabledata.filter((e) => {
		return e.typeofjob == "Fulltime";
	}).length;

	const sidenavmanager = () => {
		setSidenavopen(!sidenavopen);
	};

	const toastsucess = () => {
		toast.success("Data Created Sucessfully", {});
	};

	setTimeout(() => {
		setLoaded(false);
	}, 2300);

	const navigate = useNavigate();

	return (
		<div>
			{loaded ? (
				<div className="startupload">
					<img src={require("../StartTalent.gif")} alt="loading..." />
				</div>
			) : (
				<div>
					<div className="navbarforedit">
						<div className="editnavcontainer">
							<div className="titledivfornav">
								{/* <img className="logo" src={logo} alt="Logo" /> */}
								<h2 style={{ marginBottom: "0px" }}>StartTalent</h2>
							</div>
							<i
								class={
									sidenavopen
										? " fa-solid fa-arrow-left nope"
										: "fa-solid fa-bars nope"
								}
								onClick={() => {
									sidenavmanager();
								}}
							></i>
						</div>
					</div>
					<ToastContainer />
					<div style={{ height: "70px", width: "100vw" }}></div>
					<div className="tablepage">
						<div className="datepicker">
							<div style={{ width: "70%" }}></div>
						</div>
						<div className="innertabcont">
							<div className="infodivs">
								<div className="placementinfocard">
									<span className="titleinfo">FullTime Offers</span>
									<AnimatedNumber
										className="titlenumber"
										value={fulls}
										formatValue = {n => n.toFixed(0)}

									></AnimatedNumber>
								</div>
								<div className="placementinfocard">
									<span className="titleinfo">Internship Offers</span>
									<AnimatedNumber
										className="titlenumber"
										value={intern}
										formatValue = {n => n.toFixed(0)}
									></AnimatedNumber>
								</div>
							</div>
							<MaterialTable
								onRowClick={(event, rowData) => {
									navigate(`/finished/false/${rowData.uuid}`);
								}}
								columns={[
									{ title: "Name", field: "name" },
									{
										title: "Department",
										field: "department",
										lookup: dynamaicobjdepart,
									},
									{
										title: "Batch",
										field: "batch",
										lookup: dynamicobj,
									},
									{
										title: "Type of Job",
										field: "typeofjob",
										lookup: {
											Internship: "Internship",
											PartTime: "PartTime",
											Fulltime: "Fulltime",
										},
									},
									{
										title: "Skill",
										field: "interest",
										lookup: {
											Fullstack: "Fullstack",
											"Datascience&Analytics": "Datascience & Analytics",
											Dataengineering: "Dataengineering",
											DigitalMarketing: "DigitalMarketing",
											IOT: "IOT",
											Blockchain: "Block Chain",
										},
									},
									{
										title: "Calls",
										// filtering: false,
										// type: 'numeric',
										field: "phone",
										lookup: dynamicobjcall,
										customFilterAndSearch: (term, rowData) => {
											// console.log(phone)
											let callarray;
											if (
												rowData.phone !== null &&
												rowData.phone !== undefined
											) {
												callarray = Object.values(rowData.phone);
											}
											// console.log(callarray);
											let name1 = "";
											let name2;
											if (callarray !== undefined && callarray !== null) {
												callarray.map((e) => {
													// console.log(e.name.concat(e.name));
													name1 = name1 + e.name;
												});
											}
											// console.log(term.join(""));
											// console.log(name1.toString());
											if (
												name1
													.toLowerCase()
													.includes(term.join("").toLowerCase())
											) {
												return true;
											} else {
												return false;
											}
										},
										render: (phone) => {
											if (phone.phone === null || phone.phone === undefined) {
												return "No data";
											} else {
												const phonedata = Object.values(phone.phone);
												// console.log(phonedata);

												const list = phonedata.map((e) => {
													return e.name + ", ";
												});
												return list;
											}
										},
										export: false,
									},
									{
										title: "Company Placed",
										field: "placementCompany",
										lookup: dynamicobjcompname,
									},
									{ title: "Stipend", field: "Stipend" },
								]}
								options={{
									search: false,
									exportButton: {
										pdf: true,
										csv: true,
									},
									filtering: true,
									headerStyle: {
										zIndex: 0,
										backgroundColor: "#8a2be2",
										color: "white",
										fontFamily: "Rubik",
										fontSize: "14px",
									},
									rowStyle: {
										fontFamily: "Rubik",
									},
								}}
								data={tabledata}
								title={"Placement Data"}
								key={muiTableKey}
								actions={[
									{
										icon: () => <i class="fa-solid fa-filter-circle-xmark"></i>,
										tooltip: "clear all filters",
										isFreeAction: true,
										onClick: (event) => {
											setMuiTableKey(muiTableKey + 1); // set new key causing remount
										},
									},
								]}
							/>
						</div>
					</div>
					<div className="footerfortable">
								<span>Created By gSARC Team 2022</span>
					</div>
				</div>
			)}
		</div>
	);
};
