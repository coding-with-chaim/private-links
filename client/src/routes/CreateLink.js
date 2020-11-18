import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { baseUrl } from "../App";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    height: 300px;
    width: 50%;
    align-items: flex-end;
`;

const TextBox = styled.textarea`
    width: 100%;
    height: 85%;
    border-radius: 10px;
    padding-left: 10px;
    font-size: 18px;
`;

const Button = styled.button`
    width: 25%;
    height: 100%;
    border: none;
    border-radius: 15px;
    background-color: teal;
    color: white;
    margin-top: 5px;
    font-size: 18px;
`;

const BottomContainer = styled.div`
    display: flex;
    height: 15%;
    width: 100%;
    justify-content: space-between;
    align-items: center;
`;

const Message = styled.span`
    font-size: 18px;
    font-weight: bold;
`;

function CreateLink(props) {
    const [contents, setContents] = useState("");
    const [message, setMessage] = useState("");

    async function saveSecret() {
        try {
            setMessage("Saving...");
            const res = await axios({
                method: "post",
                url: `${baseUrl}/link`,
                data: {
                    contents
                }
            });
            setMessage(res.data.link);
            setContents("");
        } catch(e) {
            setMessage("Whoops... this is embarrassing, but seems something went wrong");
            setContents("");
            setTimeout(() => {
                setMessage("");
            }, 1500);
        }
    }

    return (
        <Form>
            <TextBox
                onChange={e => setContents(e.target.value)}
                value={contents}
                placeholder="Enter some secret message here..."
            />
            <BottomContainer>
                <Message>{message}</Message>
                <Button onClick={saveSecret} type="button">Save</Button>
            </BottomContainer>
        </Form>
    );
};

export default CreateLink;
