import {useEffect, useState} from "react";
import {axios} from "../global-imports";

const AuthService = () => {
    const [authed, setAuthed] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const run = async () => {
            let config: any = {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            };

            try {
                let response = await axios.post("/api/auth/check", {}, config);
                setAuthed(true);
                localStorage.token = response.data.new_token;
            } catch (err: any) {
                try {
                    if (err.response.data.message === "Token expired") {
                        localStorage.removeItem("token");
                        setAuthed(false);
                    }
                } catch (err) {
                    setAuthed(false);
                }
            }
            setLoading(false);
        };
        run();
    }, []);

    return {authed, authLoading: loading};
};

export {AuthService};
