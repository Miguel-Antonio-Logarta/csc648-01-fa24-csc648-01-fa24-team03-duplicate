import React from 'react'
import prisma from '../../db/prisma';

const DatabaseCheck = async () => {
    const user = await prisma.user.findUnique({
        where: {
          username: "test_user",
        },
    })

  return (
    <section>
        <h2 className="font-bold my-8 border-b-2 dark:border-slate-900 ">Other</h2>
        <p>Is MongoDB Atlas working?</p>
        {user ? <div>{`Yes! Here's the user -> id: ${user.id}, username: ${user?.username}`}</div> : <div>No. It couldn&apos;t fetch test_user</div>}
    </section>
  )
}

export default DatabaseCheck