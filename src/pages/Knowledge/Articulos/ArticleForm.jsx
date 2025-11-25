import React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    TextField,
    Button,
    Box,
    Typography,
    Divider,
    Stack
} from "@mui/material";
import { CategorySearch } from "../Categorias/CategorySearch";

export const ArticleForm = ({ article, onChange, onSave, saving, mode = "edit" }) => {
    return (
        <Card elevation={1} sx={{ backgroundColor: "#fff" }}>
            <CardHeader
                title={mode === "create" ? "Crear artículo" : "Editar artículo"}
                sx={{ backgroundColor: "#f9f9f9", pb: 1 }}
            />
            <Divider />
            <CardContent>
                <Stack spacing={3}>
                    <TextField
                        label="Título"
                        fullWidth
                        value={article.titulo || ""}
                        onChange={(e) => onChange("titulo", e.target.value)}
                    />

                    <CategorySearch
                        value={article.categoryId}                 // 👈 ahora es solo el id
                        onChange={(id) => onChange("categoriaId", id)} // 👈 guardamos el id
                    />



                    <TextField
                        label="Contenido"
                        fullWidth
                        multiline
                        minRows={6}
                        value={article.contenido || ""}
                        onChange={(e) => onChange("contenido", e.target.value)}
                    />

                    {mode === "edit" && (
                        <Box display="flex" gap={4}>
                            <Typography variant="body2">
                                <strong>Creado:</strong> {article.fechaCreacion}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Modificado:</strong> {article.fechaTransaccion}
                            </Typography>
                        </Box>
                    )}

                    <Box display="flex" justifyContent="flex-end" gap={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onSave}
                            disabled={saving}
                        >
                            {saving ? "Guardando..." : "Guardar cambios"}
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => window.history.back()}
                        >
                            Cancelar
                        </Button>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
};