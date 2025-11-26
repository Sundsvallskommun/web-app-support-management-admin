import { useUserStore } from '@services/user-service/user-service';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import DefaultLayout from '@layouts/default-layout/default-layout.component';

export const Startpage: React.FC = () => {
  return (
    <DefaultLayout title={'SMAUG'} />
  );
};

export const getServerSideProps = async (context) => {
  const locale = context?.locale || 'sv'; // fallback to 'sv' if locale is undefined
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'layout'])),
    },
  };
};

export default Startpage;
