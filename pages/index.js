import Head from "next/head";
import Link from "next/Link"
import Comment from "../components/Comment";
export default function Home() {
  return (
    <div>
      <Head>
        <title>Greatness</title>
      </Head>
      <nav className="h-10 w-screen bg-red-200">

      </nav>
      <main className=" container flex flex-col justify-center items-center border-solid border-4 border-light-blue-500 mx-auto ">
        <Link href="dashboard">
          <a>Sign In</a>
        </Link>
      </main>
    </div>
  );
}
