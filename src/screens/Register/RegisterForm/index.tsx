import { AppButton } from '@/components/AppButton';
import { AppInput } from '@/components/AppInput';
import { PublicStackParamList } from '@/routes';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { View, Text, ActivityIndicator } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema';
import { useAuthContext } from '@/context/auth.context';
import { AxiosError } from 'axios';
import { useErrorHandler } from '@/shared/hooks/useErrorHandler';
import { colors } from '@/shared/colors';

export interface FormRegisterParams {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

function RegisterForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormRegisterParams>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
    },
    resolver: yupResolver(schema),
  });

  const { handleRegister } = useAuthContext();
  const { handleError } = useErrorHandler();

  const navigation = useNavigation<NavigationProp<PublicStackParamList>>();

  const onSubmit = async (userData: FormRegisterParams) => {
    try {
      await handleRegister(userData);
    } catch (error) {
      handleError(error, 'Falha ao cadastrar usuário');
    }
  };

  return (
    <>
      <AppInput
        control={control}
        name="name"
        label="NOME"
        placeholder="Seu nome"
        leftIconName="person"
      />

      <AppInput
        control={control}
        name="email"
        label="EMAIL"
        placeholder="mail@exemplo.br"
        leftIconName="mail-outline"
      />

      <AppInput
        control={control}
        name="password"
        label="SENHA"
        placeholder="Sua senha"
        leftIconName="lock-outline"
        secureTextEntry
      />

      <AppInput
        control={control}
        name="confirmPassword"
        label="senha"
        placeholder="Confirme sua senha"
        leftIconName="lock-outline"
        secureTextEntry
      />

      <View className="flex-1 justify-between mt-8 mb-6 min-h-[250px]">
        <AppButton onPress={handleSubmit(onSubmit)} iconName="arrow-forward">
          {isSubmitting ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            'Cadastrar'
          )}
        </AppButton>

        <View>
          <Text className="mb-6 text-gray-300 text-base">
            Já possui uma conta?
          </Text>
          <AppButton
            onPress={() => navigation.navigate('Login')}
            iconName="arrow-forward"
            mode="outline"
          >
            Acessar
          </AppButton>
        </View>
      </View>
    </>
  );
}

export { RegisterForm };
