import DefaultLayout from '@layouts/default-layout/default-layout.component';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

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
