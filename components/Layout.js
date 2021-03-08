import NavBar from "./NavBar";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

const Layout = (props) => {
  return (
    <div className="bg-white dark:bg-gray-900">
      <NavBar />
      <Header {...props} />
      <Content {...props} />
      <Footer />
    </div>
  );
};

export default Layout;
