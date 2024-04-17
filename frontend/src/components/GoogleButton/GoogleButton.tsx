import {
  CredentialResponse, GoogleLogin,
} from '@react-oauth/google';
import { Button } from '@mantine/core';
import { useAuth } from '../../hooks/useAuth/useAuth';
import { useUserStore } from '../../store';
import { linkGoogleToAccount, unlinkGoogleToAccount } from '../../api/auth';

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
    />
  );
}

export function UnlinkGoogleButton() {
  const { user } = useUserStore();

  if (user?.google_profile === null) return null;

  const onClick = async () => {
    await unlinkGoogleToAccount();
  };

  return (
    <Button onClick={onClick}>unlink account from google</Button>
  );
}

export function LinkGoogleButton() {
  const { user } = useUserStore();

  const onSuccess = async (credentials: CredentialResponse) => {
    if (credentials && credentials.credential) {
      await linkGoogleToAccount(credentials.credential);
    }
  };
  if (user?.google_profile !== null) return null;

  return (
    <GoogleLogin
      onSuccess={onSuccess}
      onError={() => {
        // TODO: add toasts
        console.log('Login Failed');
      }}
    />
  );
}

GoogleButton.Link = LinkGoogleButton;
GoogleButton.Unlink = UnlinkGoogleButton;
