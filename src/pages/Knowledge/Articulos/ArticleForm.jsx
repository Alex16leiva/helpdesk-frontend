import React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    Grid,
    TextField,
    Button,
    Box,
    Typography,
    Divider
} from "@mui/material";
import CategorySelect from "../Categorias/CategorySelect";

export const ArticleForm = ({ article, onChange, onSave, saving, mode = "edit" }) => {
    return (
        <Card elevation={1} sx={{ backgroundColor: "#fff" }}>
            <CardHeader
                title={mode === "create" ? "Crear artículo" : "Editar artículo"}
                sx={{ backgroundColor: "#f9f9f9", pb: 1 }}
            />
            <Divider />
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            label="Título"
                            fullWidth
                            value={article.titulo || ""}
                            onChange={(e) => onChange("titulo", e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <CategorySelect
                            value={article.categoryId}
                            onChange={(val) => onChange("categoryId", val)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="Contenido"
                            fullWidth
                            multiline
                            minRows={6}
                            value={article.contenido || ""}
                            onChange={(e) => onChange("contenido", e.target.value)}
                        />
                    </Grid>

                    {mode === "edit" && (
                        <Grid item xs={12}>
                            <Box display="flex" gap={4}>
                                <Typography variant="body2">
                                    <strong>Creado:</strong> {article.fechaCreacion}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Modificado:</strong> {article.fechaTransaccion}
                                </Typography>
                            </Box>
                        </Grid>
                    )}

                    <Grid item xs={12}>
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
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
