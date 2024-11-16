type ButtonStyles = "rectangular" | "rounded" | "pill"

type ButtonProps = {
  bgColor: string;
  style: `${Exclude<sizes, "xs" | "xl">}/${ButtonStyles}`;
}

const Button = (props: ButtonProps) => {
  return (
    <div>CONTENT</div>
  );
};

const Component = () => {
  return(
    <Button bgColor="red" style="md/rectangular">
      
    </Button>
  )
}

export default Button;