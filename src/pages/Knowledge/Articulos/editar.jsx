import React, { useState, useEffect } from "react";
import { RestClient } from "../../../api/RestClient";
import { useParams, useNavigate } from "react-router-dom";
import { ArticleForm } from "./ArticleForm";

// MUI
import {
    Container,
} from "@mui/material";

function EditArticle() {
    const { id: articleId } = useParams();
    const navigate = useNavigate();

    const [article, setArticle] = useState(null);
    const [saving, setSaving] = useState(false);

    const fetchArticle = async (id) => {
        const response = await RestClient.get(`article/get-article/${id}`)
        setArticle(response)
    }

    useEffect(() => {
        fetchArticle(articleId);
    }, [articleId]);

    const handleChange = (field, value) => {
        setArticle(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        if (!article?.titulo?.trim() || !article?.contenido?.trim()) {

            return;
        }
        const request = {
            articulo: article
        }

        await RestClient.put(`article/update-article`, request);
    };

    return (
        <>
            <Container maxWidth="md" sx={{ py: 4 }}>
                <ArticleForm
                    article={article}
                    onChange={handleChange}
                    onSave={handleSave}
                    saving={saving}
                />
            </Container>
        </>
    );
}

export default EditArticle;