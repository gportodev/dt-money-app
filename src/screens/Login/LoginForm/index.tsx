import { AppButton } from '@/components/AppButton';
import { AppInput } from '@/components/AppInput';
import { useForm } from 'react-hook-form';
import { Text } from 'react-native';

export interface FormLoginParams {
  email: string;
  password: string;
}

function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormLoginParams>();

  return (
    <>
      <AppInput
        control={control}
        name="email"
        label="email"
        placeholder="mail@exemplo.com.br"
        leftIconName="mail-outline"
      />

      <AppInput
        control={control}
        name="password"
        label="senha"
        placeholder="Sua senha"
        leftIconName="lock-outline"
        secureTextEntry
      />

      <AppButton iconName="arrow-forward">Login</AppButton>
    </>
  );
}

export { LoginForm };
