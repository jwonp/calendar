import Header from "../Header/Header";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Header />
      <div>{children}</div>
    </main>
  );
};

export default MainLayout;
