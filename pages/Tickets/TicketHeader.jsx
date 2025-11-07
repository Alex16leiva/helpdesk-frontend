import { Paper, Typography, Box } from '@mui/material';

export const TicketHeader = ({ items }) => {
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, minmax(250px, 1fr))',
                gap: 2,
                width: '100%',
            }}
        >
            {items.map((item, index) => (
                <Paper
                    key={index}
                    elevation={3}
                    sx={{
                        width: '95%',
                        maxWidth: 240,
                        height: 120,
                        borderRadius: 2,
                        bgcolor: '#f9f9f9',
                        boxShadow: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        p: 2,
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {item.title}
                        </Typography>
                        <Box sx={{ fontSize: 32, color: '#1976d2' }}>
                            <item.icon />
                        </Box>
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {item.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {item.description}
                    </Typography>
                </Paper>
            ))}
        </Box>
    );
};