import { useState } from "react";
import { RestClient } from "../../../api/RestClient";
import { ArticleForm } from "./ArticleForm";
import { Container } from "@mui/material";

export const CreateArticle = () => {
    const [article, setArticle] = useState({
        titulo: "",
        contenido: "",
        categoriaId: null,
        tags: "",
    });

    const handleChange = (field, value) => {
        setArticle(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        if (!article?.titulo?.trim() || !article?.contenido?.trim()) {
            return;
        }
        const request = { articulo: article };
        await RestClient.post(`article/create-article`, request);
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <ArticleForm
                article={article}
                onChange={handleChange}
                onSave={handleSave}
                mode="create"
            />
        </Container>
    );
}
