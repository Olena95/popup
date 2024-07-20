import React, { useState } from "react";
import { Button, Modal, Input, Typography } from "antd";
import { CloseOutlined, FileDoneOutlined } from "@ant-design/icons";
import CustomSelector from "../UI/Selector";
import CustomMultiSelector from "../UI/MultipleSelector";
import axios from "axios";
import "./popup.scss";
const Popup = () => {
    const documentType = [
        { value: "deposition", label: "Deposition" },
        {
            value: "employment-handbook",
            label: "Employment Handbook",
            comming: true,
        },
        { value: "medical-record", label: "Medical Record", comming: true },
        { value: "email", label: "Email", comming: true },
        {
            value: "perfomance-evaluation",
            label: "Perfomance Evaluation",
            comming: true,
        },
    ];
    const witnessType = [
        { value: "favorable-to-defence", label: "Favorable To Defence" },
        { value: "favorable-to-plaintiff", label: "Favorable To Plaintif" },
        { value: "neutral", label: "Neutral" },
    ];
    const [documentData, setDocumentData] = useState({
        type: documentType[0].label,
        witnessType: witnessType[0].label,
    });
    const [isDisabled, setIsDisabled] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const isReqFieldsFill = (obj) => {
        return (
            "type" in obj &&
            "witnessType" in obj &&
            "name" in obj &&
            "witnesses" in obj
        );
    };
    const handleData = (field, text) => {
        const changed = {
            ...documentData,
            [field]: text,
        };

        setDocumentData(changed);
        setIsDisabled(!isReqFieldsFill(changed));
    };

    const handleSubmit = async () => {
        const requestBody = {
            ...documentData,
            fileName: "FileName.pdf",
            key: "sadsadasd42dwd",
            fileSize: 1024,
            contentType: "application/pdf",
        };
        try {
            const response = await axios.post(
                "https://example.com/api/documents",
                requestBody
            );
            setErrorMessage(``);
            console.log("Response:", response.data);
        } catch (error) {
            if (error.response) {
                setErrorMessage(`Status:${error.response.status}`);
                console.error("Error response data:", error.response.data);
                console.error("Error response status:", error.response.status);
                console.error(
                    "Error response headers:",
                    error.response.headers
                );
            } else if (error.request) {
                setErrorMessage(`Error request data:${error.request}`);
                console.error("Error request data:", error.request);
            } else {
                setErrorMessage(`Error message:${error.message}`);
                console.error("Error message:", error.message);
            }

            console.error("Error config:", error.config);
        }
    };

    return (
        <>
            <Modal
                title={
                    <span style={{ fontSize: "24px" }}>Upload Document</span>
                }
                open={true}
                footer={
                    <Button
                        style={{
                            backgroundColor: isDisabled ? "#575757" : "#000000",
                            color: "#ffffff",
                        }}
                        type="primary"
                        onClick={handleSubmit}
                        disabled={isDisabled}
                    >
                        Add Document
                    </Button>
                }
                closeIcon={
                    <CloseOutlined
                        style={{
                            color: "#000000",
                        }}
                    />
                }
            >
                <div className="popup">
                    <div className="popup__sub-title">Duong v. ITT</div>
                    <div className="popup__file-block">
                        <div className="popup__file">
                            <div>
                                <FileDoneOutlined
                                    style={{
                                        fontSize: "38px",
                                    }}
                                />
                            </div>
                            <div>
                                <div className="popup__file_name">
                                    File Name
                                </div>
                                <div className="popup__file_size">9 MB</div>
                            </div>
                        </div>
                        <div>
                            <CloseOutlined
                                style={{
                                    color: "#000000",
                                    cursor: "pointer",
                                }}
                            />
                        </div>
                    </div>
                    <div>
                        <Typography.Title level={5}>
                            Document Name
                        </Typography.Title>
                        <Input
                            placeholder="Document Name"
                            className="custom-input"
                            onChange={(e) => handleData("name", e.target.value)}
                        />
                    </div>
                    <div>
                        <Typography.Title level={5}>
                            Document Type
                        </Typography.Title>
                        <CustomSelector
                            options={documentType}
                            onSelect={(option) =>
                                handleData("type", option.value)
                            }
                        />
                    </div>
                    <div>
                        <Typography.Title level={5}>
                            Witness Name
                        </Typography.Title>
                        <CustomMultiSelector
                            placeholder="Witness Name"
                            onSelect={(options) =>
                                handleData("witnesses", options)
                            }
                        />
                    </div>
                    <div>
                        <Typography.Title level={5}>
                            Witness Type
                        </Typography.Title>
                        <CustomSelector
                            options={witnessType}
                            onSelect={(option) =>
                                handleData("witnessType", option.value)
                            }
                        />
                    </div>
                </div>
                {errorMessage && (
                    <div className="popup__error-message">{errorMessage}</div>
                )}
            </Modal>
        </>
    );
};

export default Popup;
