"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const PhysicalStoreSalesPage = () => {
  const router = useRouter();
  const [salesCountToday, setSalesCountToday] = useState<number>(0);
  const [salesCountLastSevenDays, setSalesCountLastSevenDays] = useState<number>(0);
  const [mostSoldItem, setMostSoldItem] = useState<string>('');
  const [averageSalesAmount, setAverageSalesAmount] = useState<number>(0);

  const [formData, setFormData] = useState<{
    customerName: string;
    address: string;
    phone: string;
    productId: string;
    productName: string;
    unitPrice: number;
    quantity: number;
    totalPrice: number;
    paymentType: string;
    [key: string]: string | number; // Index signature
  }>({
    customerName: '',
    address: '',
    phone: '',
    productId: '',
    productName: '',
    unitPrice: 0,
    quantity: 0,
    totalPrice: 0,
    paymentType: 'cash',
  });

  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  useEffect(() => {
    fetchSalesData();
  }, []);

  const fetchSalesData = async () => {
    try {
      const salesDataResponse = await fetch('/api/sales/physical_store/dashboard');
      const salesData = await salesDataResponse.json();

      setSalesCountToday(salesData.countToday);
      setSalesCountLastSevenDays(salesData.countLastSevenDays);
      setMostSoldItem(salesData.mostSoldItem);
      setAverageSalesAmount(salesData.averageSalesAmount);
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = validateForm();

    if (validation.isValid) {
      try {
        await fetch('/system/sales/physical_store/sell', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        router.push('/system/sales/physical_store');
      } catch (error) {
        console.error('Error storing sales data:', error);
      
      }
    } else {
      setValidationErrors(validation.errors);
    }
  };

  const validateForm = () => {
    const errors = [];
  
    // Validate required fields
    const requiredFields = ['customerName', 'address', 'phone', 'productId', 'productName', 'unitPrice', 'quantity', 'totalPrice'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        errors.push(`${field} cannot be empty.`);
      }
    }
  
    // Additional validations for specific field types
    if (!/^[a-zA-Z\s]+$/.test(formData.customerName) || formData.customerName.length < 3 || formData.customerName.length > 30) {
      errors.push('Invalid customer name. It must be alphabetic and between 3 to 30 characters.');
    }
  
    if (formData.address.length < 3 || formData.address.length > 50) {
      errors.push('Invalid address. It must be between 3 to 50 characters.');
    }
  
    if (isNaN(Number(formData.phone)) || formData.phone.length < 11 || formData.phone.length > 15) {
      errors.push('Invalid phone number. It must be a numeric value with a length between 11 to 15 digits.');
    }
  
    if (isNaN(Number(formData.unitPrice)) || formData.unitPrice <= 0) {
      errors.push('Invalid unit price. It must be a numeric value greater than zero.');
    }
  
    if (isNaN(Number(formData.quantity)) || formData.quantity <= 0 || formData.quantity > 20) {
      errors.push('Invalid quantity. It must be a numeric value between 1 and 20.');
    }
  
    if (isNaN(Number(formData.totalPrice)) || formData.totalPrice <= 0) {
      errors.push('Invalid total price. It must be a numeric value greater than zero.');
    }
  
  
    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  };
  

  return (
    <div>
      <h1>Physical Store Sales Dashboard</h1>
      <div>
        <h2>Sales Dashboard</h2>
        <p>Products Sold Today: {salesCountToday}</p>
        <p>Products Sold Last Seven Days: {salesCountLastSevenDays}</p>
        <p>Most Sold Item: {mostSoldItem}</p>
        <p>Average Sales Amount (Current Month): {averageSalesAmount}</p>
      </div>
  
      <div>
        <h2>Sell Products</h2>
        <form onSubmit={handleFormSubmit}>
          {/* Display validation errors */}
          {validationErrors.length > 0 && (
            <div>
              <p>Validation Errors:</p>
              <ul>
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
  
          
          <label>
            Customer Name:
            <input
              type="text"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
            />
          </label>
  <br></br>
  <br></br>
          <label>
            Address:
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </label>
          <br></br>
            <br></br>
          <label>
            Phone:
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </label>
          <br></br>
            <br></br>
          <label>
            Product Name:
            <input
              type="text"
              value={formData.productName}
              onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
            />
          </label>
          <br></br>
         <br></br>
          <label>
            Unit Price:
            <input
                type="number"
                value={formData.unitPrice}
                onChange={(e) => setFormData({ ...formData, unitPrice: +e.target.value })}
            />
            </label>
            <br></br>
            <br></br>
            <label>
            Quantity:
            <input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: +e.target.value })}
            />
            </label>
            <br></br>
            <br></br>
            <label>
            Total Price:
            <input
                type="number"
                value={formData.totalPrice}
                onChange={(e) => setFormData({ ...formData, totalPrice: +e.target.value })}
            />
            </label>
            <br></br>
            <br></br>
  
          <button type="submit">Sell Product</button>
        </form>
      </div>
  
      <div>
        <button onClick={() => router.push('/system/sales/physical_store/sales_log')}>View Sales Log</button>
      </div>
    </div>
  );
  };

export default PhysicalStoreSalesPage;
