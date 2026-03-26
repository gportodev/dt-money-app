import { AppHeader } from '@/components/AppHeader';
import { useAuthContext } from '@/context/auth.context';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function Home() {
  const { handleLogout } = useAuthContext();

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <AppHeader />
      <Text>HomeScreen!</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export { Home };
