 import Card from '@mui/material/Card';
 import CardContent from '@mui/material/CardContent';
 import Typography from '@mui/material/Typography';

 interface IndicatorUIProps {
     title?: string;
     description?: string;
 }

 export default function IndicatorUI(props: IndicatorUIProps) {
     return (
         <Card sx={{
                width: '100%',
                height: '100%',
                minHeight: 120,
                borderRadius: 3,
                boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
              <CardContent sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: 0.8, px: 2.2, py: 2.2 }}>
                <Typography variant="h5" component="div" sx={{ fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>
                    {props.description}
                </Typography>
                <Typography variant="body2" component="p" sx={{ color: '#64748b', fontWeight: 500, lineHeight: 1.4 }}>
                    {props.title}
                </Typography>
            </CardContent>
         </Card>
     )
 }