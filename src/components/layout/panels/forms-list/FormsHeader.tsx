import { Box, Typography, useTheme } from '@mui/material';
import logo from '@/assets/logo.svg';
import { HEADER_HEIGHT } from '@/constants';

export const FormsHeader = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: HEADER_HEIGHT,
        minHeight: HEADER_HEIGHT,
        display: 'flex',
        alignItems: 'center',
        px: 2,
        borderBottom: 1,
        borderColor: 'divider',
        boxShadow: 4,
        background: `linear-gradient(135deg, ${theme.palette.error.light}20 0%, #fff 100%)`,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: 1,
        }}
      >
        <Typography
          variant="h3"
          component="div"
          fontWeight={700}
          color="textPrimary"
          fontSize={17}
        >
          Form
        </Typography>{' '}
        <img
          src={logo}
          alt="FormFlow Logo"
          style={{ height: '68px', marginRight: '-6px' }}
        />
        <Typography
          variant="h3"
          component="div"
          fontWeight={700}
          color="textPrimary"
          fontSize={17}
        >
          Flow
        </Typography>{' '}
      </Box>
    </Box>
  );
};
