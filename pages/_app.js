import "../styles/globals.css";
import { Provider } from "react-redux";
import { ProvideAuth } from "../utils/auth";
import { useStore } from "../Store/store";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <QueryClientProvider client={queryClient}>
      <ProvideAuth>
        <Provider store={store}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </Provider>
      </ProvideAuth>
    </QueryClientProvider>
  );
  //clarifiy if htis affects ssg/ssr the  provideAuth
}

export default MyApp;
