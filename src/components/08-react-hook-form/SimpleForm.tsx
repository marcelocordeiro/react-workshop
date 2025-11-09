import { useForm, Controller } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { TextField, Button, Box, Typography, Checkbox, FormControlLabel } from '@mui/material';

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  subscribe: boolean;
}

function SimpleForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      subscribe: false,
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}
    >
      <Typography variant="h6">Simple Form</Typography>
      
      <Controller
        name="firstName"
        control={control}
        rules={{ required: 'First name is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="First Name"
            variant="outlined"
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
        )}
      />

      <Controller
        name="lastName"
        control={control}
        rules={{ required: 'Last name is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Last Name"
            variant="outlined"
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^\S+@\S+$/i,
            message: 'Invalid email address',
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            variant="outlined"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        )}
      />

      <Controller
        name="subscribe"
        control={control}
        render={({ field }) => (
            <FormControlLabel
            control={<Checkbox {...field} checked={field.value} />}
            label="Subscribe to newsletter"
            />
        )}
        />

      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Box>
  );
}

export default SimpleForm;
