import { Box, Typography } from '@mui/material';

export default function HeaderUI() {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                px: { xs: 2, md: 3 },
                py: { xs: 0, md: 0 },
                borderRadius: 0,
                background: 'transparent',
                color: '#0f172a',
                boxShadow: 'none',
                position: 'relative',
                marginBottom: 0,
            }}
        >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography
                    variant="overline"
                    sx={{
                        display: 'block',
                        letterSpacing: '0.24em',
                        opacity: 0.8,
                        mb: 0.5,
                        color: '#475569',
                        fontWeight: 600,
                    }}
                >
                    Monitoreo en tiempo real
                </Typography>
                <Typography
                    variant="h2"
                    component="h1"
                    sx={{
                        fontWeight: 700,
                        lineHeight: 1.1,
                        color: '#1e293b',
                        letterSpacing: '-0.02em',
                        fontSize: { xs: '2rem', sm: '2.6rem', md: '3.2rem' },
                    }}
                >
                    Dashboard del Clima
                </Typography>
                
            </Box>

        </Box>
    );
}