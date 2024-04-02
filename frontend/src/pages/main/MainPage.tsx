import { useUserStore } from '../../store';

export function MainPage() {
  const { user } = useUserStore();

  return (
    <div>
      {JSON.stringify(user, null, 2)}
    </div>
  );
}
