import Filter from '../components/icons/Filter';
import ListingLoading from '../components/loading/ListingLoading';
import NotebookPaper from '../components/NotebookPaper';
import styles from './page.module.css';

const Loading = () => {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <main className={`grid grid-cols-[auto_2fr_3fr] ${styles['main-content']}`}>
      <div></div>
      <div className="shadow-2xl">
        <div className="h-full px-6 py-4 h-full overflow-y-scroll z-0 relative">
          <div className="flex no-wrap items-center gap-1.5 rounded-full bg-columbia-blue hover:bg-jordy-blue px-6 py-2 font-josefin">
            <Filter size={20} />
            <span className="align-text-bottom">Filters</span>
          </div>
          <ListingLoading />
          <ListingLoading />
          <ListingLoading />
          <ListingLoading />
        </div>
      </div>
      <div className="bg-slate-500 flex align-center justify-center">
        <div>Map is loading...</div>
      </div>
    </main>
  );
};

export default Loading;
