import { useAuthContext } from '@/context/auth.context';
import { View, Text, TouchableOpacity } from 'react-native';

function Home() {
  const { handleLogout } = useAuthContext();

  return (
    <View className="flex-1 items-center justify-center">
      <Text>HomeScreen!</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

export { Home };
