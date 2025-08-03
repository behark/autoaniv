import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export default function VehicleDetailPage() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Vehicle Details - AutoAni</title>
      </Helmet>
      
      <div className="container-custom section-padding">
        <h1 className="text-3xl font-bold mb-4">Vehicle Details</h1>
        <p>Vehicle detail page will be implemented here.</p>
      </div>
    </>
  );
}
