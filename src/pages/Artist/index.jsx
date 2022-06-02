import React from "react";
import {Link} from 'react-router-dom';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import styles from './styles.module.scss';
import Button from "../../components/Button";
import AddIcon from "@mui/icons-material/Add";
import ArtistTable from "../../components/Tables/ArtistTable";
import {useSelector} from "react-redux";

const Artist = () =>{
    const {artists} = (useSelector((state) => state.artist));
   return(
       <div className={styles.container}>
           <div className={styles.head}>
               <h1>
                   artist <LibraryMusicIcon/>
               </h1>
               <Link to="/artist/new">
                   <Button startIcon={<AddIcon/>} label="Add New Artist"/>
               </Link>
           </div>
           <ArtistTable artists={artists}/>
       </div>
   )
}

export default Artist