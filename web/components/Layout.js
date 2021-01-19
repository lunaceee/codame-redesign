import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

const Layout = (props) => {
  return (
    <>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
      </Head>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </>
  );
};

export default Layout;
