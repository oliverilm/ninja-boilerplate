import { GoogleButton } from '../../components/GoogleButton/GoogleButton';
import { useUserStore } from '../../store';

export function MainPage() {
  const { user } = useUserStore();

  return (
    <div>
      {JSON.stringify(user, null, 2)}

      <GoogleButton.Link />
      <GoogleButton.Unlink />
    </div>
  );
}
