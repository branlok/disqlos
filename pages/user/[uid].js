function Page({ uid }) {
  return (
    <div className="flex flex-col h-screen w-screen">
      <nav className="h-10 bg-base-gray flex-shrink-0 bg-base-gray flex items-center px-4">
        <div>
          <b>Disqlos</b>
        </div>
      </nav>
      <div className="w-full h-full  flex flex-initial overflow-hidden bg-custom-gray-500">
          {uid}
      </div>
    </div>
  );
}

// This gets called on every request
export async function getServerSideProps({params}) {
  // Fetch data from external API

  //   const res = await fetch(``);
  const {uid} = params;
  console.log(uid);

  // Pass data to the page via props
  return { props: { uid } };
}

export default Page;
