import { useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { i18n, LANGUAGES } from './i18n';

const TranslatedPanel = () => {
  // `t` looks up a key; `i18n` is the instance, used to change language.
  const { t, i18n: instance } = useTranslation();
  const [orders, setOrders] = useState(1);

  return (
    <Stack spacing={2}>
      <TextField
        select
        size="small"
        label={t('demo.switch')}
        value={instance.language}
        onChange={(event) => instance.changeLanguage(event.target.value)}
        sx={{ maxWidth: 220 }}
      >
        {LANGUAGES.map((language) => (
          <MenuItem key={language.code} value={language.code}>
            {language.label}
          </MenuItem>
        ))}
      </TextField>

      {/* A plain key */}
      <Typography variant="h6">{t('demo.title')}</Typography>

      {/* Interpolation: the placeholder is filled at render time, never by
          concatenating strings — word order differs between languages. */}
      <Typography>{t('demo.greeting', { name: 'Ada' })}</Typography>

      {/* Pluralisation: `count` selects the right form for the language. */}
      <Typography>{t('demo.orders', { count: orders })}</Typography>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button variant="outlined" onClick={() => setOrders(1)}>
          1 order
        </Button>
        <Button variant="outlined" onClick={() => setOrders(4)}>
          4 orders
        </Button>
      </Box>

      <Typography variant="body2" color="text.secondary">
        Switch to Português and look at the dropdown label: that key is missing
        from the Portuguese file, so i18next falls back to English rather than
        rendering the raw key.
      </Typography>
    </Stack>
  );
};

const I18nDemo = () => (
  // Same provider pattern as chapter 5 — one instance made available to the
  // subtree, consumed with a hook.
  <I18nextProvider i18n={i18n}>
    <Box sx={{ border: '1px solid lightgray', p: 2, borderRadius: 1 }}>
      <TranslatedPanel />
    </Box>
  </I18nextProvider>
);

export default I18nDemo;
