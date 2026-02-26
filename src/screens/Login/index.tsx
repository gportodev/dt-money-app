import { DismissKeyboardView } from '@/components/DismissKeyboardView';
import { PublicStackParamList } from '@/routes';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { LoginForm } from './LoginForm';

function Login() {
  return (
    <DismissKeyboardView>
      <View className="flex-1 w-[82%] self-center">
        <LoginForm />
      </View>
    </DismissKeyboardView>
  );
}

export { Login };
