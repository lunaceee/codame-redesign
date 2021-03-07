const classNames = require("classnames");
const imageUrl = require("./imageUrl");

const serializers = {
  types: {
    contentImage: ({ node }) => {
      return <img src={`${imageUrl(node).url()}`} alt={node.alt} />;
    },
  },
  marks: {
    externalLink: ({ children, mark }) => {
      const { blank, href } = mark;
      return blank ? (
        <a
          href={href}
          target="_blank"
          rel="noopener"
          className="text-secondary500 underline"
        >
          {children}
        </a>
      ) : (
        <a href={href}>{children}</a>
      );
    },
    internalLinkArticle: ({ children, mark }) => (
      <a href={mark.href} className="underline">
        {children}
      </a>
    ),
    button: ({ children, mark }) => {
      const { blank, href, center, left, right } = mark;
      const btnClass = classNames({
        "py-2 px-4 my-2 bg-primary600 rounded lg:max-w-xs w-full justify-self-center": true,
        "justify-self-center": center,
        "justify-self-end": right,
        "justify-self-start": left,
      });
      return (
        <button
          className={btnClass}
          onClick={(e) => {
            console.log("clicked");
            e.preventDefault();
            window.location.href = `${href}`;
          }}
        >
          {children}
        </button>
      );
    },
    highlight: ({ children }) => (
      <span className="bg-secondary500 text-white">{children}</span>
    ),
  },
};

export default serializers;
