import "../styles/index.css";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./api/client";

export default function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
