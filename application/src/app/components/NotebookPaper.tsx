import styles from './components.module.css';

type props = {
  className?: string;
  children?: React.ReactNode;
};

const NotebookPaper = ({ children, className }: props) => {
  return (
    <div className={`${styles['notebook-paper']} ${className}`}>
      {/* <div className={`${styles['red-line']}`}>yuh</div> */}
      {children}
    </div>);
};

export default NotebookPaper;
