interface HeaderProps {
  title: string;
  rightSlot?: React.ReactNode; // nếu bạn muốn thêm nút hoặc icon bên phải
}

const Header = ({ title, rightSlot }: HeaderProps) => {
  return (
    <div className="mb-5 flex w-full items-center justify-between">
      <h1 className="text-2xl font-bold">{title}</h1>
      {rightSlot}
    </div>
  );
};

export default Header;
