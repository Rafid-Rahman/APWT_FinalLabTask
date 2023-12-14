"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SalesPage = () => {
  const router = useRouter();
  const [physicalStoreCount, setPhysicalStoreCount] = useState<number>(0);
  const [socialMediaCount, setSocialMediaCount] = useState<number>(0);
  const [ecommerceCount, setEcommerceCount] = useState<number>(0);

  const fetchProductCounts = async () => {
    try {
      const physicalStoreResponse = await fetch('/system/sales/physical_store');
      const socialMediaResponse = await fetch('/system/sales/social_media');
      const ecommerceResponse = await fetch('/system/sales/ecommerce');

      const physicalStoreData = await physicalStoreResponse.json();
      const socialMediaData = await socialMediaResponse.json();
      const ecommerceData = await ecommerceResponse.json();

      setPhysicalStoreCount(physicalStoreData.count);
      setSocialMediaCount(socialMediaData.count);
      setEcommerceCount(ecommerceData.count);
    } catch (error) {
      console.error('Error fetching product counts:', error);
    }
  };

  useEffect(() => {
    fetchProductCounts();
  }, []);

  return (
    <div>
      <h1>Sales Dashboard</h1>
      <div>
        <h2>Physical Store</h2>
        <p>Products Sold Today: {physicalStoreCount}</p>
        {/* Add logic to display last seven days count */}

        {/* Button to navigate to the Physical Store channel */}
        <button onClick={() => router.push('/system/sales/physical_store')}>Go to Physical Store</button>
      </div>

      <div>
        <h2>Social Media</h2>
        <p>Products Sold Today: {socialMediaCount}</p>
        {/* Add logic to display last seven days count */}

        {/* Button to navigate to the Social Media channel */}
        <button onClick={() => router.push('/system/sales/social_media')}>Go to Social Media</button>
      </div>

      <div>
        <h2>Ecommerce Web App</h2>
        <p>Products Sold Today: {ecommerceCount}</p>
        {/* Add logic to display last seven days count */}

        {/* Button to navigate to the Ecommerce channel */}
        <button onClick={() => router.push('/system/sales/ecommerce')}>Go to Ecommerce</button>
      </div>
    </div>
  );
};

export default SalesPage;
