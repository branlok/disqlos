import Head from "next/head";
import Link from "next/link";
import Comment from "../components/Comment";
import { useAuth } from "../utils/auth";
export default function Home() {
  let { userId } = useAuth();
  return (
    <div>
      <Head>
        <title>Greatness</title>
      </Head>
      <div className="w-screen h-screen flex flex-col">
        <nav className="h-10 bg-base-gray flex-shrink-0 bg-base-gray flex items-center px-4 flex-none">
          <div>
            <b>Disqlos</b>
          </div>
        </nav>
        <main className=" h-full w-full bg-custom-pink-300">
          <header className="h-1/2 w-full flex flex-col justify-center items-center">
            <h1 className="text-6xl font-bold mb-4">Disqlos</h1>
            <p className="text-3xl w-1/2 text-center">
              is a new microblogging social platform. We empower users to relay
              thoughts and messages into organized and meaningful stories.
            </p>
          </header>
          <section className="h-1/2 w-full flex flex-col justify-center items-center">
            <div className="border p-2 bg-custom-pink-1000 text-white rounded-md">
              <Link href="/signup">
                <a>Get Started</a>
              </Link>
            </div>
            <div>
              <Link href="/signin">
                <a>Sign In</a>
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
