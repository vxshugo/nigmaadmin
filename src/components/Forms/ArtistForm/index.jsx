import React, {useEffect, useState} from "react";
import styles from './styles.module.scss'
import {Paper} from "@mui/material";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import Joi from "joi";
import {createArtist, updateArtist} from "../../../redux/artist/apiCalls";
import {toast} from "react-toastify";
import TextField from "../../Inputs/TextField";
import FileInput from "../../Inputs/FileInput";
import ImageIcon from "@mui/icons-material/Image";
import Button from "../../Button";

const ArtistForm = () => {
    const [data, setData] = useState({
        name: '',
        verify: false,
        img: null,
        songs:[],
        albums:[],
    })
    const [cat,setCat] = useState([]);
    const [arr,setArr] = useState([]);
    const [errors, setErrors] = useState({name: ''});
    const {artists, createArtistProgress, updateArtistProgress} = (useSelector(
        (state) => state.artist));
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const artist = artists?.filter((artist) => artist._id === id);
        if (id !== "new" && artist[0]) {
            setData({
                name: artist[0].name,
                verify: true,
                img: artist[0].img,
                songs: artist[0].songs[0],
                albums:artist[0].albums[0]
            });
        }
    }, [id, artists]);

    const schema = {
        name: Joi.string().required().label("Name"),
        verify: Joi.bool().required().label("Verify"),
        img: Joi.string().required().label("Image"),
        songs: Joi.array().required().label("Songs"),
        albums: Joi.array().required().label("Albums"),
    }

    const handleInputState = (name, value) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleErrorState = (name, value) => {
        setErrors((prev) => ({ ...prev, [name]: value }));
    };

    const handleCat = (e, name) => {
        setCat(e.target.value.split(','));
        setData((prev) => ({...prev, ['songs']: cat}))
    }
    const handleArr = (e, name) => {
        setArr(e.target.value.split(','));
        setData((prev) => ({...prev, ["albums"]: arr}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = Joi.object(schema).validate(data);
        if (!error){
            if (id === "new"){
                const res = await createArtist(data, dispatch);
                res && history.push("/artist");
            } else {
                const res = await updateArtist(id, data, dispatch);
                res && history.push("/artist");
            }
        } else {
            toast.error(error.message);
        }
    }

    return(
        <div className={styles.container}>
            <Paper className={styles.form_container}>
                <h1 className={styles.heading}>
                    {id === "new"? "Add New Artist" : "Edit Song"} <LibraryMusicIcon/>
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles.input_container}>
                        <TextField
                            name="name"
                            label="Enter artist name"
                            handleInputState={handleInputState}
                            handleErrorState={handleErrorState}
                            schema={schema.name}
                            error={errors.name}
                            value={data.name}
                            required={true}
                        />
                    </div>
                    <div className={styles.input_container}>
                        <FileInput
                            label="Choose image"
                            icon={<ImageIcon />}
                            type="image"
                            name="img"
                            value={data.img}
                            handleInputState={handleInputState}
                        />
                    </div>
                    {/*<div className={styles.input_container}>*/}
                    {/*    <label style={{fontSize: 16}}>Songs</label>*/}
                    {/*    <input name="songs" type="text" onChange={handleCat} className={styles.input}/>*/}
                    {/*</div>*/}
                    {/*<div className={styles.input_container}>*/}
                    {/*    <label style={{fontSize: 16}}>Songs</label>*/}
                    {/*    <input name="albums" type="text" onChange={handleArr} className={styles.input}/>*/}
                    {/*</div>*/}
                    <Button
                        type="submit"
                        label={id === "new" ? "Submit" : "Update"}
                        idFetching={id === "new" ? createArtistProgress : updateArtistProgress}
                        style={{ marginLeft: "auto" }}
                    />
                </form>
            </Paper>
        </div>
    )
}

export default ArtistForm