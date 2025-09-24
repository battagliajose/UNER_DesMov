import { Text } from 'react-native';
import { MockUserService } from '@shared/models/mock-user.service'

function Settings() {
  const usuario = MockUserService.obtenerUsuario();

  return (
    <Text>Settings Screen</Text>
  );
}

export default Settings;
