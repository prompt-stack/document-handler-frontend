interface buttonProps {
  type?: "submit" | "button";
  label: string;
  onClickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

const ReusableButton = ({type, label, onClickHandler, className} : buttonProps) => {
    return (
    <div>
        <button
        type={type}
        className={`${className} px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer transition-colors duration-300`}
        onClick={onClickHandler}
        >
        {label}
        </button>
    </div>
  )
}

export default ReusableButton
