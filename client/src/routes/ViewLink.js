import axios from "axios";
import { useState, useEffect } from "react";
import { baseUrl } from "../App";

function ViewLink(props) {
    const [contents, setContents] = useState("");

    useEffect(() => {
        async function getLinkData() {
            try {
                const res = await axios({
                    url: `${baseUrl}/link/${props.match.params.linkId}`,
                });
                setContents(res.data.contents)
            } catch(e) {
                setContents(e.response.data.message)
            }
        };
        getLinkData();
    }, [props.match.params.linkId]);

    return (
        <h1>{contents}</h1>
    );
};

export default ViewLink;
