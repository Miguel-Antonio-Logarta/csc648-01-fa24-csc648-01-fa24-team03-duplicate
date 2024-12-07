type Props = {
  busynessStatus: number;
};

const BusynessIndicator = ({ busynessStatus }: Props) => {
  // Define a mapping of busynessStatus to background color and text
  const statusMapping = [
    { threshold: 2.5, color: 'bg-green-500', text: 'Not Busy' },
    { threshold: 3.5, color: 'bg-yellow-500', text: 'Moderate' },
    { threshold: Infinity, color: 'bg-red-500', text: 'Usually Busy' },
  ];

  // Find the matching status
  const { color, text } = statusMapping.find(({ threshold }) => busynessStatus < threshold) || { color: '', text: '' };

  return (
    <div className="flex flex-row items-center">
      <div className={`rounded-full h-6 w-6 ${color}`}></div>
      <span className="text-lg font-bold ml-3">{text}</span>
    </div>
  );
};

export default BusynessIndicator;
