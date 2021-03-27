import "../styles/globals.css";
import { Provider } from "react-redux";
import { ProvideAuth } from "../utils/auth";
import { useStore } from "../Store/store";
import { QueryClient, QueryClientProvider } from 'react-query'
 
const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <QueryClientProvider client={queryClient}>
    <ProvideAuth>

      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>

    </ProvideAuth>
    </QueryClientProvider>
  );
  //clarifiy if htis affects ssg/ssr the  provideAuth
}

export default MyApp;
