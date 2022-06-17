import React, {useState} from "react";
import {Link} from 'react-router-dom';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import styles from './styles.module.scss';
import Button from "../../components/Button";
import AddIcon from "@mui/icons-material/Add";
import ArtistTable from "../../components/Tables/ArtistTable";
import {useDispatch, useSelector} from "react-redux";
import {deleteSong} from "../../redux/songsSlice/apiCalls";
import styled from "styled-components";
import {IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {MusicNote} from "@mui/icons-material";

const Artist = () =>{
    const dispatch = useDispatch();
    const {artists} = (useSelector((state) => state.artist));

    const [value, setValue] = useState('');

    const filteredProducts = artists.filter(product => {
        return product.name.includes(value)
    })
    const handleDelete = (id) => {
        deleteSong(id, dispatch);
    };

    return(
       <div className={styles.container}>
           <div className={styles.head}>
               <h1>
                   artist <LibraryMusicIcon/>
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
                               filteredProducts.map((artist,index) => {
                                   return(
                                       <AutoItem key={index}>
                                           <div style={{display: "flex",alignItems: 'center'}}>
                                               <img style={{width: 50, height:50,borderRadius: 50, marginRight: 10}} src={artist.img} alt={artist.name}/>
                                               {artist.name}
                                           </div>
                                           <div>
                                               <Link to={`/artist/${artist._id}`}>
                                                   <IconButton className={styles.edit_btn}>
                                                       <EditIcon />
                                                   </IconButton>
                                               </Link>
                                               <IconButton
                                                   className={styles.delete_btn}
                                                   onClick={() => handleDelete(artist._id)}
                                               >
                                                   <DeleteIcon />
                                               </IconButton>
                                               <Link to={`/add-song/${artist._id}`}>
                                                   <IconButton className={styles.edit_btn}>
                                                       <MusicNote/>
                                                   </IconButton>
                                               </Link>
                                           </div>
                                       </AutoItem>
                                   )
                               })
                               : null
                       }
                   </Auto>
               </ContainerS>
               <Link to="/artist/new">
                   <Button startIcon={<AddIcon/>} label="Add New Artist"/>
               </Link>
           </div>
           <ArtistTable artists={artists}/>
       </div>
   )
}

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

export default Artist