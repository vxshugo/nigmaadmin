import {useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import UserTable from "../../components/Tables/UserTable";
import Button from "../../components/Button";
import AddIcon from "@mui/icons-material/Add";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import styles from "./styles.module.scss";
import styled from "styled-components";
import React, {useState} from "react";
import {deleteSong} from "../../redux/songsSlice/apiCalls";
import {IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Users = () => {
	const dispatch = useDispatch();
	const { users } = useSelector((state) => state.users);
	const [value, setValue] = useState('');

	const filteredProducts = users.filter(product => {
		return product.name.includes(value)
	})
	const handleDelete = (id) => {
		deleteSong(id, dispatch);
	};


	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<h1>
					users <PeopleAltIcon />
				</h1>
				<ContainerS>
					<SearchContainer>
						<Input
							placeholder="Search"
							value={value}
							onChange={(e) => setValue(e.target.value)}
						/>
					</SearchContainer>
					<Auto>
						{
							value ?
								filteredProducts.map((user,index) => {
									return(
										<AutoItem key={index}>
											<div style={{display: "flex",alignItems: 'center'}}>
												{user.name}
											</div>
											<div>
												<Link to={`/users/${user._id}`}>
													<IconButton className={styles.edit_btn}>
														<EditIcon />
													</IconButton>
												</Link>
												<IconButton
													className={styles.delete_btn}
													onClick={() => handleDelete(user._id)}
												>
													<DeleteIcon />
												</IconButton>
											</div>
										</AutoItem>
									)
								})
								: null
						}
					</Auto>
				</ContainerS>
				<Link to="/users/new">
					<Button startIcon={<AddIcon />} label="Add New User" />
				</Link>
			</div>
			<UserTable users={users} />
		</div>
	);
};

const ContainerS = styled.div`
    position: relative;
`
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
	width: 400px;
	height: 30px;
`
const AutoItem = styled.li`
  padding: 10px;
  font-size: 14px;
	display: flex;
	justify-content: space-between;
	
 
`
const Input = styled.input`
	width: 400px;
	height: 30px;
  border: none;
`
const Auto = styled.ul`
  position: absolute;
  left: 25px;
  top: 40px;
  width: 100%;
  background-color: white;
  z-index: 99999;
  list-style: none;
  margin: 0;
  padding: 0;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.15);
  max-height: 240px;
  height: auto;
  overflow: auto;
`

export default Users;
