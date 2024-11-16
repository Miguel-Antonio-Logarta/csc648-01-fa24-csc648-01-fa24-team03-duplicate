'use client';

import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

const Page = () => {
  const { data: session, status } = useSession();

    const [count, setCount] = useState<number>(1);

  if (status == 'authenticated') {
    if (session.user.role == 'ADMIN') {
      return <div>Admin UI</div>;
    } else if (session.user.role == 'CUSTOMER') {
      return (
        <div>
          Customer stuff: You are customer {session.user.id} and your name is{' '}
          {session.user.username}
        </div>
      );
    } else {
      return <div>Uhhhh</div>;
    }
  }

  return (
    <ExampleComponent count={count} />
  )
};

const ExampleComponent = (props: any) => {
    return (
        <AnotherComponent count={props.count} />
    )
}

const AnotherComponent = (props: any) => {
    return (
        <div>Count: {props.count}</div>
    )
}

export default Page;
