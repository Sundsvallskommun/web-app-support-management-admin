import { useAppContext } from '@contexts/app.context';
import { useUserStore } from '@services/user-service/user-service';
import { appURL } from '@utils/app-url';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Logout() {
  const { setDefaults } = useAppContext();
  const router = useRouter();

  const resetUser = useUserStore((s) => s.reset);

  useEffect(() => {
    setDefaults();
    resetUser();
    localStorage.clear();
    router.push({
      pathname: `${process.env.NEXT_PUBLIC_API_URL}/saml/logout`,
      query: {
        successRedirect: `${appURL()}/login?loggedout`,
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
}
