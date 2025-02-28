interface CardProps {
  className?: string;
  children?: React.ReactNode;
}

const Card = ({ className, children }: CardProps) => {
  return (
    <div
      className={`rounded-sm shadow-md inset-shadow-sm dark:shadow-amber-50 dark:inset-shadow-amber-50 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
