import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";
import * as actions from './index';

export const createArtist = async (artist, dispatch) => {
    dispatch(actions.createArtistStart());
    try {
        const {data} = await axiosInstance.post('/artist', artist);
        dispatch(actions.createArtistSuccess(data.data));
        toast.success(data.message);
        return true;
    }catch (error) {
        dispatch(actions.createArtistFailure());
        return false;
    }
}

export const getAllArtists = async (dispatch) => {
    dispatch(actions.getAllArtistStart());
    try {
        const { data } = await axiosInstance.get("/artist");
        dispatch(actions.getAllArtistSuccess(data.data));
        return true;
    }catch (error) {
        dispatch(actions.getAllArtistFailure());
        return false;
    }
}

export const updateArtist = async (id,artist, dispatch) => {
    dispatch(actions.updateArtistStart());
    try {
        const {data} = await axiosInstance.put(`/artist/${id}`, artist);
        dispatch(actions.updateArtistSuccess(data.data));
        toast.success(data.message);
        return true
    }catch (error) {
        dispatch(actions.updateArtistFailure());
        return false;
    }
}

export const deleteArtist = async (id, dispatch) => {
    dispatch(actions.deleteArtistStart());
    try {
        const { data } = await axiosInstance.delete(`/artist/${id}`);
        dispatch(actions.deleteArtistSuccess(id));
        toast.success(data.message);
        return true;
    }catch (error) {
        dispatch(actions.deleteArtistFailure());
        return false;
    }
}

export const addArtistSong = async (id, musicId, dispatch) => {
    dispatch(actions.addArtistSongStart());
    try {
        const {data} = await axiosInstance.put(`/artist/add/${id}`, musicId);
        dispatch(actions.addArtistSongSuccess(data.data));
        toast.success(data.message);
        return true;
    }catch (e) {
        dispatch(actions.addArtistSongFailure());
        return false;
    }
}