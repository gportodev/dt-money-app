import { PublicStackParamList } from '@/routes';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

function Login() {
  const navigation = useNavigation<StackNavigationProp<PublicStackParamList>>();

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Tela de login!</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
}

export { Login };
