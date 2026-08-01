export const BottomTabBar = ({
  title,
  onClose,
  BottomTabBarContent,
}: {
  title: string;
  onClose: () => void;
  BottomTabBarContent: React.ReactNode;
}) => {
  return (
    <div className="fixed inset-0 z-200 flex items-end justify-center">
      <div className="bg-gray-80/50 absolute inset-0" onClick={onClose} />

      <section className="bg-gray-0 animate-slide-up relative flex w-full max-w-[450px] flex-col gap-6 rounded-t-[16px] px-4 pt-6">
        <h1 className="typo-l-strong text-gray-80">{title}</h1>
        <div>{BottomTabBarContent}</div>
      </section>
    </div>
  );
};
