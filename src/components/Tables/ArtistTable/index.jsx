import React, {useState} from "react";
import {useDispatch} from "react-redux";
import styles from "./styles.module.scss"
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    Paper,
    IconButton,
    CircularProgress,} from "@mui/material";
import {Link} from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {deleteArtist} from "../../../redux/artist/apiCalls";
import {MusicNote} from "@mui/icons-material";
const ArtistTable = ({artists}) => {

    const dispatch= useDispatch();
    const [loading, setLoading] = useState(true);

    const handleDelete = (id) => {
        deleteArtist(id, dispatch)
    }

    setTimeout(() => setLoading(false), 1000);

    return(
        <TableContainer component={Paper} className={styles.table_container}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Image</TableCell>
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                {loading && (
                    <TableBody>
                        <TableRow>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center">
                                <CircularProgress style={{color: '#1ed760', margin: '2rem 0'}}/>
                            </TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableBody>
                )}
                {!loading && (
                    <TableBody>
                        {artists.length !== 0 &&
                          artists.map((artist, index) => {
                              return(
                                  (
                                      <TableRow key={artist._id}>
                                          <TableCell align="center">
                                              <img src={artist.img} alt="" className={styles.song_img}/>
                                          </TableCell>
                                          <TableCell align="center">{artist._id}</TableCell>
                                          <TableCell align="center">{artist.name}</TableCell>
                                          <TableCell align="center">
                                              <Link to={`/artist/${artist._id}`}>
                                                  <IconButton className={styles.edit_btn}>
                                                      <EditIcon/>
                                                  </IconButton>
                                              </Link>
                                              <IconButton
                                                  className={styles.delete_btn}
                                                  onClick={( ) => handleDelete(artist._id)}
                                              >
                                                  <DeleteIcon/>
                                              </IconButton>
                                              <Link to={`/add-song/${artist._id}`}>
                                                  <IconButton className={styles.edit_btn}>
                                                      <MusicNote/>
                                                  </IconButton>
                                              </Link>
                                          </TableCell>
                                      </TableRow>
                                  )
                              )
                          })}
                        {artists.length === 0 &&(
                            <TableRow>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center">
                                    <img
                                        className={styles.no_data_img}
                                        src="./noData.svg"
                                        alt=""
                                    />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                )}
            </Table>
        </TableContainer>
    )
}

export default ArtistTable