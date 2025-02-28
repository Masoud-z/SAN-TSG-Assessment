import { Outlet } from "react-router-dom";

interface CardProps {
  className?: string;
}

const Card = ({ className }: CardProps) => {
  return (
    <div className={`rounded-sm shadow dark:shadow-amber-50 ${className}`}>
      <Outlet />
    </div>
  );
};

export default Card;
