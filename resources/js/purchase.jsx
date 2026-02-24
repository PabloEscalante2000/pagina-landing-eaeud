import './bootstrap';
import '../css/app.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import PurchasePage from './components/PurchasePage';

const root = document.getElementById('purchase-app');
if (root) {
    const storeUrl = root.dataset.storeUrl;
    const landingUrl = root.dataset.landingUrl;
    createRoot(root).render(<PurchasePage storeUrl={storeUrl} landingUrl={landingUrl} />);
}
