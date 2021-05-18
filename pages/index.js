import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import SupportSVG from "../styles/illustrations/Support.svg";
import SpaceSVG from "../styles/illustrations/Virtual_reality_VR.svg";
import WelcomeSVG from "../styles/illustrations/Welcome_1.svg";
import DesignSVG from "../styles/illustrations/Design.svg";
import Logo from "../styles/svg/logo.svg";
import MessageSVG from "../styles/illustrations/Message.svg";
import PostDemo from "../components/BasicComponents/Demo/PostDemo";
import PostSection from "../components/BasicComponents/Demo/PostSection";
import QuickOverview from "../components/BasicComponents/Demo/QuickOverview";
import SpacesDemo from "../components/BasicComponents/Demo/SpacesDemo";
import SpaceDescriptions from "../components/BasicComponents/Demo/SpaceDescriptions";

export default function Home() {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <Head>
        <title>Greatness</title>
      </Head>
      <div className="relative h-screen ">
        <nav className="absolute top-0 left-0 w-full h-12 dark:bg-cb-2 bg-gray-100 flex  lg border-b dark:border-gray-500 dark:bg-cb-3  dark:text-white flex items-center px-4 flex justify-between items-center py-2 z-10">
          <div className="flex h-full py-1">
            <Logo className="h-full fill-current text-custom-pink-900  dark:text-gray-300" />
            <b>Disqlos</b>
          </div>
        </nav>
        <section className=" h-full w-full bg-custom-pink-300 overflow-hidden flex flex-col  ">
          <div
            className="h-full flex flex-col "
            style={{ transform: `translateY(${offsetY * 0.5}px)` }}
          >
            <header className="w-full h-1/2 flex flex-col justify-end items-center ">
              <Logo className="h-12 w-12 fill-current text-custom-pink-1000 dark:text-gray-300" />
              <h1 className="text-4xl xl:text-6xl font-bold mb-4 text-custom-pink-1000 ">
                Disqlos
              </h1>
              <p className="text-2xl xl:text-3xl w-3/4 xl:w-1/2 text-center text-custom-pink-1000">
                is a new microblogging social platform. We empower users to tell
                great story while maintaining bite size information.
              </p>
            </header>
            <section className="w-full h-1/2  flex flex-col justify-center items-center sm:hidden">
              <div className="p-2 px-4 text-xl bg-gradient-to-r  from-indigo-900 to-purple-900  text-white rounded-md font-bold">
                <Link href="/signup">
                  <a>Get Started</a>
                </Link>
              </div>
              <div>
                <Link href="/signin">
                  <a>or Login</a>
                </Link>
              </div>
            </section>
            <section className="w-full h-1/2  justify-around items-center hidden sm:flex">
              <div
                className="w-3/5 mt-44"
                style={{
                  transform: `translateY(${offsetY * 0.9}px)`,
                  zIndex: -1,
                }}
              >
                <SupportSVG />
              </div>
              <div
                className="h-full mr-10 flex justify-center items-center flex-col "
                style={{ transform: `translateX(${offsetY * 0.05}px)` }}
              >
                <div className="p-4 text-3xl bg-gradient-to-r from-indigo-900 to-purple-900  text-white rounded-md font-bold shadow-md hover:shadow-lg transition-all">
                  <Link className="h-ful w-full" href="/signup">
                    <a>Get Started</a>
                  </Link>
                </div>
                <div className="mt-4 hover:bg-gray-500 px-4 py-1 rounded-md hover:text-white transition cursor-pointer">
                  <Link href="/signin">
                    <a>or Login</a>
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </section>

        <section className="bg-custom-pink-1000 py-10 text-white overflow-hidden flex flex-col justify-center items-center">
          <SpaceDescriptions />
        </section>

        <section className=" test relative h-full w-full py-20 bg-custom-pink-300  overflow-hidden flex flex-col justify-around items-center ">
          <PostSection offsetY={offsetY} />
        </section>

        <section className="relative h-1/2 w-full py-20 bg-custom-pink-1000  overflow-hidden flex flex-col justify-around items-center ">
          <div
            // style={{ "background-image": "url(./people.png)" }}
            className="bg-cover absolute w-full h-full opacity-30 test "
          ></div>
          <QuickOverview />
        </section>

        <section className="h-full w-full bg-custom-pink-300 overflow-hidden flex flex-col justify-center items-center ">
          <SpacesDemo />
        </section>
        <section className="h-1/2 w-full text-white bg-custom-pink-1000 overflow-hidden flex flex-col justify-center items-center text-center ">
          Created by Brandon Lok <br />
          Support my project at
          <a className="border-b-2 "href="https://github.com/branlok/disqlos" target="_blank">
            Github
          </a>
        </section>
      </div>
    </div>
  );
}
