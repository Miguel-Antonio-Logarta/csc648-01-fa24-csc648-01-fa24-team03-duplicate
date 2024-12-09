import X from "./icons/X";

type Props = {
  visible: boolean;
  children?: React.ReactNode;
  close: (e: React.SyntheticEvent) => void;
  onConfirm?: (e: React.SyntheticEvent) => void;
  onCancel?: (e: React.SyntheticEvent) => void;
};

const Modal = ({ visible, children, close, onConfirm, onCancel }: Props) => {
  if (!visible) {
    return null;
  } else {
    return (
      <div className="fixed w-screen h-screen flex items-center justify-center top-0 left-0">
        <div className="w-96 rounded-md bg-white shadow-lg">
          <div className="relative">
            <div className="absolute top-0 right-0 pt-4 pr-4 ">
              <button onClick={close} className="p-2">
                <X className="text-red-300" size={24} fill="rgb(115 115 115)" />
              </button>
            </div>
          </div>

          <div className="p-12">
            {children ? (
              children
            ) : (
              <>
                <h2 className="mt-0">Modal Component</h2>
                <p>
                  Here is your modal. You have not put any react elements inside
                  yet.
                </p>
                <div className="flex flex-row no-wrap gap-3 justify-end">
                <button
                    className="rounded-md border-2 py-1 px-4 hover:bg-black hover:text-white hover:border-black"
                    onClick={onCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className="rounded-md py-1 px-4 bg-[#C6E2FF] hover:bg-blue-400"
                    onClick={onConfirm}
                  >
                    Action
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default Modal;
