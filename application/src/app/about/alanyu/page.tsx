import Image from 'next/image';
import pfp from './pfp.png';

const Page = () => {
    return (
        <div style={{ textAlign: 'center', padding: '20px', backgroundColor: 'white', height: '100vh', color: 'black' }}>
            <h1>Hello, my name is Alan Yu</h1>
            <h2>Team Role: Scrum Master</h2>
            <Image 
                src="https://9otnordlgmffpjra.public.blob.vercel-storage.com/alanyu-vvmolpSMgXBtVF9uFRqJuV0zQBlp6I.png"
                alt="Profile" 
                width={150} 
                height={150}
                style={{ borderRadius: '50%', marginTop: '20px', display: 'block', margin: '0 auto' }}
            />
            <p style={{ marginTop: '20px', fontSize: '16px', lineHeight: '1.5' }}>
                I am your friendly neighborhood Scrum Master, ready to make everyone <strong>document</strong>, 
                schedule endless <strong>meetings</strong>, and just be an overall <strong>pain</strong> to the dev teams.
                When I&apos;m not terrorizing developers with meetings, I&apos;m probably plotting the next retrospective. 
            </p>
            <p style={{ marginTop: '20px', fontSize: '16px', lineHeight: '1.5' }}>
                Don&apos;t worry, I come with coffee… and maybe some donuts, if you&apos;re lucky. 
                My special skills include creating meeting invites faster than you can say “deploy”.
            </p>
        </div>
    );
};

export default Page;