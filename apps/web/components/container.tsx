type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

function Container({ className = "", children, ...props }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-5xl ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

export default Container;
