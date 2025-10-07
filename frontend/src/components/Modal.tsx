import { useEffect, type ReactNode } from "react";

interface IModalTypes {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  children?: ReactNode;
}

function Modal(props: IModalTypes) {
  const { isModalOpen, setIsModalOpen, children } = props;

  useEffect(() => {
    if (!isModalOpen) {
      setIsModalOpen(isModalOpen);
    }
  }, [isModalOpen]);

  return (
    <>
      {isModalOpen && (
        <div className="fixed flex justify-center w-full h-full left-0 bottom-0 bg-black/80">
          <div className="bg-white w-1/3 min-h-60 absolute top-32 border border-neutral-600 px-10 py-10">
            <div>{children}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
