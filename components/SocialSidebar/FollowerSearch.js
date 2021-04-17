import { Field, Form, Formik } from "formik";
import React from "react";
import useSearchFollowers from "./utils/useSearchFollowers";
import * as yup from "yup";
import UserCard from "./UserCard";
import ReturnSVG from "../../styles/svg/return.svg";
import { useQueryClient } from "react-query";

function FollowerSearch({ navigation, setNavigation }) {
  let { setSearch, searchFollowerQuery } = useSearchFollowers();
    let queryClient = useQueryClient();
  const initialData = {
    searchQuery: "",
  };

  const validationSchema = yup.object({
    searchQuery: yup.string().min(1).required(),
  });

  return (
    <div className="h-full w-64 flex-none z-10 bg-custom-pink-500 dark:bg-cb-2  flex flex-col">
      <header className="relative h-16 p-2 w-full border-b flex-none dark:border-cb-3 ">
        <h3 className="font-bold text-custom-pink-950  dark:text-white text-center rounded-md w-full h-full rounded-md flex justify-center items-center">
          Search
        </h3>
        <div
          className="absolute top-4 left-2 w-10 h-8 p-2 flex items-start rounded-md  bg-gray-200 hover:bg-gray-300 dark:bg-cb-4"
          onClick={() => {queryClient.refetchQueries("followerData");  setNavigation("main")}}
        >
          <ReturnSVG className="h-full w-full current-fill dark:text-cb-3 " />
        </div>
      </header>
      <div className="h-12 flex-none">
        <div className="h-full w-full bg-custom-pink-500 dark:bg-cb-3">
          <Formik
            initialValues={initialData}
            validationSchema={validationSchema}
            onSubmit={(values, formik) => {
              setSearch(values.searchQuery);
              formik.resetForm();
            }}
          >
            <Form className="w-full h-12 p-2">
              <div className="flex">
                <Field
                  name="searchQuery"
                  className="pl-2 h-8 w-full rounded-md text-sm border dark:bg-cb-2 dark:border-cb-2 dark:text-white"
                  placeholder="Search User"
                ></Field>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
      <div className="h-full w-full flex-initial bg-custom-pink-550 dark:bg-cb-3 p-2.5 overflow-y-scroll no-scrollbar ">
        {searchFollowerQuery.isSuccess
          && searchFollowerQuery.data.map((item) => {
              return (
                <UserCard
                  key={item.uid}
                  name={item.displayName}
                  caption={item.profileDescrFiption}
                  imageURL={item.primaryProfileImage}
                  followButton={true}
                  targetId={item.uid}
                />
              );
            })
          }
      </div>
      <footer className="h-16 lex items-center justify-center border-t dark:border-cb-3 ">
        {/* <div className=" rounded-md px-2 py-1 hover:bg-gray-300 cursor-pointer flex justify-center items-center ">
          <AddFollowerSvg
            className="fill-current text-gray-600"
            onClick={() => setShowSearch(true)}
          />
        </div> */}
      </footer>
    </div>
  );
}

export default FollowerSearch;
