import { useState, useEffect } from "react";
import { RestClient } from "../../../api/RestClient";
import { useParams } from "react-router-dom";
import { ArticleForm } from "./ArticleForm";

// MUI
import {
    Container,
} from "@mui/material";
import { CoreUtils } from "../../../utils/CoreUtils";

function EditArticle() {
    const { id: articleId } = useParams();
    const [article, setArticle] = useState(null);

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
                {CoreUtils.isValidEntity(article) &&
                    <ArticleForm
                        article={article}
                        onChange={handleChange}
                        onSave={handleSave}
                    />}
            </Container>
        </>
    );
}

export default EditArticle;