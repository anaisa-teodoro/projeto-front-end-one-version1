"use client";

import { useSearchParams } from 'next/navigation';
import { EditUserForm } from '@/components/Forms/EditUserForm';

export default function UserUpdatePage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');

  if (!userId) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="flex flex-col h-screen">
      <EditUserForm userId={userId} />
    </div>
  );
}
