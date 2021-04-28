import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import SupportSVG from "../styles/illustrations/Support.svg";
import SpaceSVG from "../styles/illustrations/Virtual_reality_VR.svg";
import WelcomeSVG from "../styles/illustrations/Welcome_1.svg";
import DesignSVG from "../styles/illustrations/Design.svg";
import MessageSVG from "../styles/illustrations/Message.svg";
import PostDemo from "../components/BasicComponents/Demo/PostDemo";
import PostSection from "../components/BasicComponents/Demo/PostSection";
import QuickOverview from "../components/BasicComponents/Demo/QuickOverview";
import SpacesDemo from "../components/BasicComponents/Demo/SpacesDemo";

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
        <nav className="absolute top-0 left-0 w-full h-10 bg-base-gray flex-shrink-0 flex items-center px-4 flex-none z-10">
          <div>
            <b>Disqlos</b>
          </div>
        </nav>
        <section className="h-full w-full bg-custom-pink-300 overflow-hidden flex flex-col ">
    
          <div
            className="h-full flex flex-col "
            style={{ transform: `translateY(${offsetY * 0.5}px)` }}
          >
            <header className="w-full h-1/2 flex flex-col justify-end items-center  ">
              <h1 className="text-4xl xl:text-6xl font-bold mb-4">Disqlos</h1>
              <p className="text-2xl xl:text-3xl w-3/4 xl:w-1/2 text-center">
                is a new microblogging social platform. We empower users to tell
                great story while maintaining bite size information.
              </p>
            </header>
            <section className="w-full h-1/2  flex justify-around items-center ">
              <div
                className="h-full w-2/5 z-20 mb-20"
                style={{ transform: `translateY(${offsetY * 0.9}px)` }}
              >
                <SupportSVG />
              </div>
              <div
                className="h-full mr-24 flex justify-center items-center flex-col "
                style={{ transform: `translateX(${offsetY * 0.05}px)` }}
              >
                <div className="p-2 px-4 text-xl bg-custom-pink-1000 text-white rounded-md">
                  <Link href="/signup">
                    <a>Get Started</a>
                  </Link>
                </div>
                <div>
                  <Link href="/signin">
                    <a>Sign In</a>
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </section>

        <section  className="relative h-1/2 w-full py-20 bg-custom-pink-1000  overflow-hidden flex flex-col justify-around items-center ">

          <QuickOverview />
        </section>

        <section className="relative h-full w-full py-20 bg-custom-pink-300  overflow-hidden flex flex-col justify-around items-center ">
        <div style={{"background-image": "url(./people.png)"}}  className="bg-cover absolute w-full h-full opacity-30"></div>
          <PostSection offsetY={offsetY} />
        </section>

        <section className="h-full w-full bg-custom-pink-1000 text-white overflow-hidden flex flex-col justify-center items-center ">
          <header className=" my-10 text-center">
            <h1 className=" font-bold text-3xl xl:text-5xl">There is Space for Everybody</h1>
            <p>
              A primary feature at disqlos is that each post can be made into a
              private space
            </p>
          </header>
          <div className="flex items-center justify-around w-3/4 h-1/2">
            <div className="flex flex-col items-center h-full mx-4 ">
              <div className="h-32 w-32 xl:h-52 xl:w-52 rounded-full bg-gray-100 bg-opacity-90">
                <SpaceSVG />
              </div>
              <div className="w-44 xl:w-72 text-xs xl:text-sm text-center my-6">
                Within a space you are able to continue to post under its
                original post. We will organize its hierarchy. And unlike
                comments and replies, this space is private.
              </div>
            </div>
            <div className="flex flex-col items-center h-full mx-4">
              <div className="h-32 w-32 xl:h-52 xl:w-52 rounded-full bg-gray-100 ">
                <DesignSVG />
              </div>
              <div className="w-44 xl:w-72 text-xs xl:text-sm text-center my-6">
                Once you think you've written enough. We will bundle and
                published the thread of posts that you curated. and your space
                won't be deleted unless specified. So expand and republish as
                you like.
              </div>
            </div>
            <div className="flex flex-col items-center h-full mx-4">
              <div className="h-32 w-32 xl:h-52 xl:w-52 rounded-full bg-gray-100 ">
                <WelcomeSVG />
              </div>
              <div className="w-44 xl:w-72 text-xs xl:text-sm text-center my-6">
                Collaboration/Sharing might be important whether use the space
                to build a diary, a story, or documenting a challenge. With our
                follower and friends system, you have the control to include or
                exclude memberships.
              </div>
            </div>
          </div>
        </section>
        <section className="h-full w-full bg-custom-pink-300 overflow-hidden flex flex-col justify-center items-center ">
          <SpacesDemo/>
        </section>
        <section className="h-1/2 w-full text-white bg-custom-pink-1000 overflow-hidden flex flex-col justify-center items-center ">
          
        </section>
      </div>
    </div>
  );
}
