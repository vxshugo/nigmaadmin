import React, {useEffect, useState} from "react";
import styles from "./styles.module.scss";
import {Paper} from "@mui/material";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import TextField from "../../../Inputs/TextField";
import Joi from "joi";
import {useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addArtistSong} from "../../../../redux/artist/apiCalls";
import {toast} from "react-toastify";
import Button from "../../../Button";

const AddSong = () => {
    const [data, setData] = useState({
        songId: ''
    })
    const [errors, setErrors] = useState({songId: ''});
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const {artists, addArtistSongProgress} = (useSelector(
        (state) => state.artist));

    useEffect(() => {

    })


    const schema = {
        songId: Joi.string().required().label("SongId"),
    }
    const handleInputState = (name, value) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleErrorState = (name, value) => {
        setErrors((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {error} = Joi.object(schema).validate(data);
        if (!error){
            const res = await addArtistSong(id, data, dispatch);
            res && history.push("/artist");
        } else{
            toast.error(error.message);
        }
    }

    return(
        <div className={styles.container}>
            <Paper className={styles.form_container}>
                <h1 className={styles.heading}>
                    Add Song in Artist <LibraryMusicIcon/>
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles.input_container}>
                        <TextField
                            name="songId"
                            label="Enter song id"
                            handleInputState={handleInputState}
                            handleErrorState={handleErrorState}
                            schema={schema.songId}
                            error={errors.songId}
                            value={data.songId}
                            required = {true}
                        />
                    </div>
                    <Button
                        type='submit'
                        label="Add song"
                        idFetching={addArtistSongProgress}
                        style={{marginLeft: "auto"}}
                    />
                </form>
            </Paper>
        </div>
    )
}

export default AddSong