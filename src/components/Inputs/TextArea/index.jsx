import Joi from "joi";
import ClearIcon from "@mui/icons-material/Clear";
import styles from "./styless.module.scss"

const TextArea = ({
                       label,
                       error,
                       handleInputState,
                       handleErrorState,
                       schema,
                       ...rest
                   }) => {

    const validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const inputSchema = Joi.object({ [name]: schema });
        const { error } = inputSchema.validate(obj);
        return error ? error.details[0].message : "";
    };

    const handleChange = ({ currentTarget: textarea }) => {
        if (schema) {
            const errorMessage = validateProperty(textarea);
            if (handleErrorState) handleErrorState(textarea.name, errorMessage);
        }
        handleInputState(textarea.name, textarea.value);
    };

    return (
        <div className={styles.container}>
            <p className={styles.label}>{label}</p>
            <textarea
                {...rest}
                onChange={handleChange}
                className={
                    error ? `${styles.textarea} ${styles.error}` : `${styles.textarea} `
                }
            />
            {error && (
                <p className={styles.error_msg}>
                    <ClearIcon /> {error}
                </p>
            )}
        </div>
    );
};

export default TextArea;
