import "../styles/globals.css";
import { Provider } from "react-redux";
import { ProvideAuth } from "../utils/auth";
import { useStore } from "../Store/store";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ProvideUser } from "../components/Queries/USERS/firestoreUserSelf";

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
        {/* <ProvideUser> */}
          <Provider store={store}>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
          </Provider>
        {/* </ProvideUser> */}
      </ProvideAuth>
    </QueryClientProvider>
  );
  //clarifiy if htis affects ssg/ssr the  provideAuth
}

export default MyApp;
