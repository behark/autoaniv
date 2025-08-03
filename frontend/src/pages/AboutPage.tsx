import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('nav.about')} - AutoAni</title>
      </Helmet>
      
      <div className="container-custom section-padding">
        <h1 className="text-3xl font-bold mb-4">{t('about.title')}</h1>
        <p>{t('about.subtitle')}</p>
      </div>
    </>
  );
}
