"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const SalesLog = () => {
  const router = useRouter();

  const handleDownloadSalesReport = () => {
  };

  const handleDownloadPendingLog = () => {
  };

  return (
    <div>
      <h1>Sales Log</h1>

      <button onClick={handleDownloadSalesReport}>Download Sales Report</button>
      <button onClick={handleDownloadPendingLog}>Download Pending Log</button>

      <button onClick={() => router.push('/system/sales/physical_store')}>Physical Store</button>
    </div>
  );
};

export default SalesLog;
