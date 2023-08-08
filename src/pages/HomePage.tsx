import AuthForm from '../components/auth/AuthForm';
import { Navigate } from 'react-router-dom';
import { pocketbase } from '../lib/pocketbase';

export default function Home() {
  const currentUser = pocketbase.authStore.model;

  if (currentUser && currentUser.email) {
    return <Navigate to={'/users'} replace={true} />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-full bg-gray-100 py-8 sm:py-12 px-6 sm:px-8">
      <div>
        <img
          src={'/images/messenger-logo.png'}
          alt="logo"
          width="64"
          height="64"
          className="mx-auto w-16 h-16"
        />
        <h1 className="py-1 mt-4 sm:mt-6 text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-fuchsia-500  to-rose-500">
          Hang out anytime, anywhere
        </h1>
      </div>
      <AuthForm />
    </div>
  );
}
