import Image from 'next/image';
import React from 'react';

// Header Component
const Header: React.FC = () => {
  return (
    <header className="flex flex-wrap gap-5 justify-between px-10 py-5 w-full text-xl bg-white shadow-sm tracking-[10px] max-md:px-5 max-md:max-w-full">
      <input className="object-contain justify-start rounded-xl bg-gray aspect-[12.82] w-[562px]" placeholder="Search" />
      <nav className="flex gap-10 my-auto">
        <a href="/login" className="focus:outline-none focus:ring-2 focus:ring-blue-500">Login</a>
        <a href="/signup" className="basis-auto focus:outline-none focus:ring-2 focus:ring-blue-500">Sign Up</a>
      </nav>
    </header>
  );
};

// Footer Component
type FooterProps = {
  links: Array<{ text: string; href: string }>;
};

const Footer: React.FC<FooterProps> = ({ links }) => {
  return (
        <footer className="flex gap-5 self-end max-w-full mt-[593px] w-[241px] max-md:mt-10 mx-auto">
          {links.map((link, index) => (
            <a key={index} href={link.href} className="text-xs tracking-wider focus:outline-none focus:ring-2 focus:ring-blue-500">
              {link.text}
            </a>
          ))}
        </footer>
      );
};

// Main Content Component
type MainContentProps = {
  imageSrc: string;
};

const MainContent: React.FC<MainContentProps> = ({ imageSrc }) => {
  const footerLinks = [
    { text: 'Help', href: '/help' },
    { text: 'About Us', href: '/about' },
    { text: 'Contact', href: '/contact' },
  ];

  return (
    <main className="flex flex-col items-center mt-10 max-w-full text-xs tracking-wider">
      <Image loading="lazy" src={imageSrc} alt="Main content" className="object-contain max-w-full aspect-[1.91] w-[507px]" width={507} height={100}/>
      <Footer links={footerLinks} />
    </main>
  );
};

// InputField Component
interface InputFieldProps {
  label: string;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, type = 'text' }) => {
  return (
    <>
      <label htmlFor={label.toLowerCase()} className="mt-3 text-xs text-stone-400">
        {label}
      </label>
      <input
        type={type}
        id={label.toLowerCase()}
        className="mt-2.5 border-2 border-rose-400 border-dashed"
        aria-label={label}
      />
    </>
  );
};

// Image 
interface ImageComponentProps {
  src: string;
  alt: string;
  className: string;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ src, alt, className }) => {
  return <Image loading="lazy" src={src} alt={alt} className={className} />;
};

// Page (includes Header and MainContent)
const Page: React.FC = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-white text-zinc-800">
      <Header/>
      <MainContent
        imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/23426d6753aabde6b0bcafb61b6cadacda3463f2a92cc82b508010e50c3413d8?placeholderIfAbsent=true&apiKey=dae5425d3b3c4cdc84ccb32ea9568225"
      />
    </div>
  );
};

export default Page;
