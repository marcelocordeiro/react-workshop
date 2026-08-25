import { Box, Typography, Divider } from '@mui/material';
import I18nDemo from '../components/17-i18n/I18nDemo';

const I18nPage = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        17. Internationalisation (i18n)
      </Typography>
      <Typography paragraph>
        Every user-facing string comes from a translation file, looked up by
        key. In a dashboard shipped to many markets, a literal string in JSX is
        a review comment — it cannot be translated, and it breaks the moment
        another language needs different word order or plural rules.
      </Typography>
      <Divider sx={{ my: 2 }} />
      <I18nDemo />
    </Box>
  );
};

export default I18nPage;
