import { Toaster } from "sonner";
import SalesList from './components/sales/SalesList';

export default function Home() {
  return (
    <div className="p-8 overflow-hidden">
      <SalesList />
      <Toaster />
    </div>
  );
}