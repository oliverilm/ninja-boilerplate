import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../hooks/useAuth/useAuth';

export function GoogleButton() {
  const { googleAuth } = useAuth();
  const onSuccess = async (credentials: CredentialResponse) => {
    if (credentials && credentials.credential) {
      await googleAuth(credentials.credential);
    }
  };
  return (
    <GoogleLogin
      onSuccess={onSuccess}
      onError={() => {
        // TODO: add toasts
        console.log('Login Failed');
      }}
      useOneTap
      auto_select
    />
  );
}
