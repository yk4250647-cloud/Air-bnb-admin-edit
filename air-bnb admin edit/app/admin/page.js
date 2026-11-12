import AdminDashboard from '../../components/AdminDashboard';
export const metadata = { title: 'Admin | Modern Hospitality', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';
export default function AdminPage() {
  return <main className="inner-page"><AdminDashboard /></main>;
}
