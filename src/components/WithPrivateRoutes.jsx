import React from 'react';
import Router from 'next/router';
import { getSession } from 'next-auth/client';


const login = '/login?redirected=true';

const checkUserAuthentication = async (context) => {
    const session = await getSession(context)
    if(session){
      return {auth:true};
    }

    return{auth: null};
};

export default function privateRoutes(WrappedComponent){
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;
  
  hocComponent.getInitialProps = async (context) => {
    const userAuth = await checkUserAuthentication(context);
    if (!userAuth?.auth) {
      if (context.res) {
        context.res?.writeHead(302, {
          Location: login,
        });
        context.res?.end();
      } else {
        Router.replace(login);
      }
    } else if (WrappedComponent.getInitialProps) {
      const wrappedProps = await WrappedComponent.getInitialProps({...context, auth: userAuth});
      return { ...wrappedProps, userAuth };
    }

    return { userAuth };
  };

  return hocComponent;
};