// index.js
import Link from "next/link";
import groq from "groq";
import client from "../client";
import Layout from "../components/Layout";

const Index = (props) => {
  const { posts = [] } = props;
  return (
    <Layout
      title={props.title}
      description={props.description}
      className="container mx-auto"
    >
      {posts.map(
        ({ _id, title = "", slug = "", _updatedAt = "" }) =>
          slug && (
            <li key={_id}>
              <Link href="/post/[slug]" as={`/post/${slug.current}`}>
                <a>{title}</a>
              </Link>{" "}
              ({new Date(_updatedAt).toDateString()})
            </li>
          )
      )}
    </Layout>
  );
};

Index.getInitialProps = async () => ({
  posts: await client.fetch(groq`
      *[_type == "post" && publishedAt < now()]|order(publishedAt desc)
    `),
});

export default Index;
