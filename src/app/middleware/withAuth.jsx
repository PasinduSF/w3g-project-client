
"use-client"

// withAuth.js
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const Router = useRouter();

    useEffect(() => {
      const accessToken = localStorage.getItem('token1');
      
      if (!accessToken) {
        Router.replace('/');
      }
    });

    return <WrappedComponent {...props} />;
  };
};

withAuth.displayName = 'withAuth';
export default withAuth;
