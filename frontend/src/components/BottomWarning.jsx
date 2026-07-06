import { Link } from "react-router-dom";

export const BottomWarning = ({ label, buttonText, to }) => {
  return (
    <div className="py-2 text-sm flex justify-center">
      <div>
        {label}
      </div>
      {/* In your actual app, you can replace this <a> tag with react-router-dom's <Link to={to}> component */}
      <Link to={ to } className="pointer underline pl-1 cursor-pointer hover:text-blue-600">
        {buttonText}
      </Link>
    </div>
  );
};

// export default BottomWarning;