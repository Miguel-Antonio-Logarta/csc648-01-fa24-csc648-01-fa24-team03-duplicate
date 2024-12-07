type ButtonStyles = "rectangular" | "rounded" | "pill"

type ButtonProps = {
  // bgColor: string;
  style: `${Exclude<sizes, "xs" | "xl">}/${ButtonStyles}`;
  className?: string;
  children: React.ReactNode;
  onClick: (e: unknown) => void; 
}

const Button = (props: ButtonProps) => {
  if (props.style === "md/pill") {
    return (
      <button
      className="bg-[#D1DAAF] border-[#D1DAAF] border-2 font-josefin px-4 py-2 shadow-md rounded-full hover:bg-white"
        onClick={props.onClick}
      >
      {props.children}
    </button>
    )
  }
  return (
    <button className={props.className}>

    </button>
  );
};

export default Button;