import type { Metadata } from 'next';
import AdminClient from './client';

export const metadata: Metadata = {
  title: 'Admin - WAVE Media',
  description: 'Portfolio Photo Manager',
  robots: 'noindex, nofollow',
};

export default function AdminPage() {
  return <AdminClient />;
}
