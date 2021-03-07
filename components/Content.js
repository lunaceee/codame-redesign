const Content = (props) => {
  return (
    <main className="w-full max-w-7xl mx-auto bg-gray-900 container">
      {props.children}
    </main>
  );
};

export default Content;
