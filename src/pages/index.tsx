import Image from "next/image";
import { parse } from "node-html-parser";
import { RichTextEditor } from "@/../components/RichTextEditor/RichTextEditor";
import React, { SetStateAction, useEffect, useState } from "react";
import { Select } from "@chakra-ui/react";
import Axios from "axios";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Box,
} from "@chakra-ui/react";

import {
  AiOutlineCalendar,
  AiOutlineCheckCircle,
  AiOutlinePhone,
  AiOutlineSend,
} from "react-icons/ai";

import { GrAddCircle } from "react-icons/gr";

import { FaTasks } from "react-icons/fa";

import { BsFillTrashFill, BsPencil, BsTrash2 } from "react-icons/bs";
import { BiSave } from "react-icons/bi";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { headers } from "next/dist/client/components/headers";

async function fetchToDoData() {
  return await Axios.get("http://127.0.0.1:8000/show_json/");
}

async function fetchCategoryData() {
  return await Axios.get("http://127.0.0.1:8000/category_json/");
}

export default function Home() {
  var randomColor = require("randomColor");
  const [openStatus, setOpenStatus] = useState(false);
  const [message, setMessage] = useState("");
  const [date, setDate] = useState<Date | null>();
  const [isEditing, setIsEditing] = useState(false);
  const urlString = "http://127.0.0.1:8000/post_json/";
  const [currentPK, setCurrentPK] = useState(0);
  const [editMessage, setEditMessage] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showInputCategory, setShowInputCategory] = useState(false);
  const [postCategoryData, setPostCategoryData] = useState("");
  const [category, setCategory] = useState<string | null | undefined>();

  const { data: categoryData, refetch: refetch2 } = useQuery(["categoryData"], fetchCategoryData);
  const { data, isLoading, refetch } = useQuery(["allData"], fetchToDoData);

  const handleEdit = (data: SetStateAction<number>) => {
    setCurrentPK(data);
    setIsEditing(!isEditing);
  };

  const handleDeleteButtonEnter = () => {
    setShowDelete(true);
  };

  const handleDeleteButtonLeave = () => {
    setShowDelete(false);
  };

  const handleEditButtonEnter = () => {
    setShowEdit(true);
  };

  const handleEditButtonLeave = () => {
    setShowEdit(false);
  };

  const handleEditPost = (data: SetStateAction<number>) => {
    const urlDelete = "http://127.0.0.1:8000/edit_data/";
    Axios.post(
      urlDelete,
      {
        pk: data,
        newMessageData: editMessage,
      },
      { headers: { "Content-Type": "application/json" } }
    )
      .then(() => setIsEditing(false))
      .finally(refetch);
  };

  const handleIsFinished = (data: SetStateAction<number>) => {
    const urlSetFinished = "http://127.0.0.1:8000/edit_finished/";
    Axios.post(
      urlSetFinished,
      {
        pk: data,
      },
      { headers: { "Content-Type": "application/json" } }
    ).finally(refetch);
  };

  const handleDelete = (data: SetStateAction<number>) => {
    const urlDelete = "http://127.0.0.1:8000/delete_data/";
    Axios.post(
      urlDelete,
      { pk: data },
      { headers: { "Content-Type": "application/json" } }
    ).finally(refetch);
  };

  const handleSubmitPost = async () => {
    Axios.post(
      urlString,
      {
        message_data: message,
        date_data: date,
        category: category,
      },
      { headers: { "Content-Type": "application/json" } }
    )
      .catch((err) => {
        console.log("error in request", err);
      })
      .then(() => setMessage(""))
      .then(() => setDate(null))
      .finally(refetch);
  };

  const handleAddCategory = (data: SetStateAction<String>) => {
    const colorUse = randomColor();
    const urlCategory = "http://127.0.0.1:8000/post_category/";
    Axios.post(
      urlCategory,
      {
        color: colorUse,
        category_data: data,
      },
      { headers: { "Content-Type": "application/json" } }
    )
      .then(() => setPostCategoryData(""))
      .finally(refetch2);
  };

  // console.log("test: " + showDelete);
  // console.log("halo: " + isEditing);
  // console.log("random: " + randomColor())
  // console.log(categoryData.data)
  // {{categoryColorArr.push(catData?.fields?.color)}}
  console.log("ini kan " + category);

  return (
    <>
      <div className="bg-[#A18AFF] h-screen w-full flex justify-center items-center ">
        <div className="bg-[white] w-[95%] h-[95%] rounded-xl shadow-xl  flex">
          <div className="w-[20%] m-3 mr-0">
            <div className="flex flex-col pt-6">
              <div className="mx-1 h-20 flex justify-start  items-center">
                <div className="h-full w-20 rounded-full bg-slate-300 m-3"></div>
                <div className="">
                  <p className="font-poppins ">You Can Do It!</p>
                  <p className="font-poppins text-[#A18AFF]">
                    Valencius Apriady Primayudha
                  </p>
                </div>
              </div>
              <div className="bg-[#A18AFF] w-10/12 h-[2px] mt-4 mx-auto rounded-xl"></div>
              <div className=" w-5/6 mx-auto">
                <div className="pt-6 pb-3 flex gap-5 items-center">
                  <FaTasks size={30} color="#A18AFF" />
                  <p className="font-poppins text-2xl"> Today Task</p>
                </div>

                <div className="flex flex-col gap-3 pl-5">
                  {categoryData ? (
                    categoryData?.data.map((catData: any, index: any) => (
                      <div className="flex items-center gap-2" key={index}>
                        <div
                          className={`w-5 h-5 rounded-full`}
                          style={{
                            backgroundColor: catData?.fields?.color ?? "gray",
                          }}
                        ></div>
                        <p className="font-sans">
                          {catData.fields.category_data}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p>gada cok lemes aku</p>
                  )}
                </div>
                <button
                  className=" pb-3 pl-5 flex items-center gap-2 opacity-50"
                  onClick={() => {
                    setShowInputCategory(!showInputCategory);
                  }}
                >
                  <GrAddCircle color="gray" />
                  <input
                    className="font-poppins border-none p-1 placeholder-opacity-100 placeholder-black"
                    placeholder="Add Category"
                    color="gray"
                    value={postCategoryData}
                    onChange={(event) => {
                      setPostCategoryData(event.target.value);
                    }}
                    onSubmit={() => handleAddCategory(postCategoryData)}
                  />
                  {showInputCategory && (
                    <AiOutlineSend
                      color="gray.300"
                      onClick={() => {
                        handleAddCategory(postCategoryData);
                      }}
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center  m-3 py-10 px-14 ml-0 rounded-tr-2xl rounded-br-2xl gap-10 w-[80%] bg-[#A18AFF] overflow-auto scrollbar-hide">
            <p className="font-poppinsBold  text-4xl">To Do List</p>

            <InputGroup className="bg-white rounded-xl flex">
              <div className="w-1/6">
                <Select
                  placeholder="Pick Category"
                  className="truncate"
                  onChange={(event) => {
                    setCategory(event.target.value);
                  }}
                >
                  {categoryData ? (
                    categoryData?.data.map((catData: any, index: any) => (
                      <option key={catData.pk} value={catData.pk} className="">
                        {catData.fields.category_data}
                      </option>
                    ))
                  ) : (
                    <option value=""></option>
                  )}
                </Select>
              </div>
              <InputRightElement
                pointerEvents="auto"
                onClick={() => setOpenStatus(!openStatus)}
                marginRight={8}
                zIndex={10}
              >
                <AiOutlineCalendar
                  color="gray.300"
                  className="hover:scale-110 hover:ease-in-out hover:cursor-pointer"
                />
                {openStatus && (
                  <Box className="absolute" zIndex={20}>
                    <DatePicker
                      selected={date}
                      onChange={(date) => setDate(date)}
                      inline
                    />
                  </Box>
                )}
              </InputRightElement>

              <InputRightElement
                pointerEvents="auto"
                children={<AiOutlineSend color="gray.300" />}
                onClick={handleSubmitPost}
                marginRight={0}
                className="hover:scale-110 hover:ease-in-out hover:cursor-pointer"
              />

              <Input
                type="tel"
                placeholder="What is yout next task?"
                className="font-poppins"
                value={message}
                onChange={(event) => {
                  setMessage(event.target.value);
                }}
              />
            </InputGroup>

            {isLoading ? (
              <p>loading brader</p>
            ) : data ? (
              // <p>{data?.data[0].fields.message_data}</p>
              <div className="flex flex-col w-full  gap-5 px-3">
                {data?.data.map((_event: any) => (
                  <div className="flex gap-2">
                    <div className="flex relative group w-full">
                      <div
                        className={`w-full bg-[#8873dd] ${
                          _event.fields.is_finished ? `opacity-0` : ``
                        } duration-700 transition-all font-poppins rounded-2xl py-auto  h-12  pl-4 flex items-center  justify-start gap-3`}
                      >
                        {isEditing && currentPK === _event.pk ? (
                          <button
                            className=" flex items-center gap-1 border-2 px-1 rounded-lg"
                            onClick={() => handleEditPost(_event.pk)}
                          >
                            <BiSave />
                            <p className="font-poppins"> Save </p>
                          </button>
                        ) : (
                          <>
                            <button
                              className={`hover:scale-110 hover:ease-in-out ${
                                showEdit ? `hidden` : `block`
                              } hover:cursor-pointer gap-1 flex rounded-lg items-center`}
                              onClick={() => handleDelete(_event.pk)}
                              onMouseEnter={handleDeleteButtonEnter}
                              onMouseLeave={handleDeleteButtonLeave}
                            >
                              <BsFillTrashFill color="red" />
                              {showDelete && (
                                <p className="font-poppins"> Delete </p>
                              )}
                            </button>
                            <button
                              className={`hover:scale-110 hover:ease-in-out ${
                                showDelete ? `hidden` : `block`
                              } hover:cursor-pointer gap-1 flex rounded-lg items-center`}
                              onClick={() => handleEdit(_event.pk)}
                              onMouseEnter={handleEditButtonEnter}
                              onMouseLeave={handleEditButtonLeave}
                            >
                              <BsPencil color="blue" />
                              {showEdit && (
                                <p className="font-poppins"> Edit </p>
                              )}
                            </button>
                          </>
                        )}
                      </div>

                      <div
                        className={`h-12 w-full bg-white border-2 absolute z-10 ${
                          _event.fields.is_finished ? `opacity-25` : ``
                        } ${
                          isEditing && currentPK === _event.pk
                            ? `group-hover:w-[88%]`
                            : `group-hover:w-[90%]`
                        } ${
                          showDelete
                            ? `group-hover:w-[88%]`
                            : `group-hover:w-[90%]`
                        }
                        ${console.log(
                          "hasil: " + showDelete && currentPK === _event.pk
                        )}
                        ${
                          isEditing && currentPK === _event.pk
                            ? `group-hover:translate-x-[12%]`
                            : `group-hover:translate-x-[10%]`
                        } ${
                          showDelete
                            ? `group-hover:translate-x-[12%]`
                            : `group-hover:translate-x-[10%]`
                        } flex duration-500 transition-all items-center px-5 justify-between rounded-2xl`}
                      >
                        <div className="text-center flex-1 align-middle flex font-poppins text-lg text-black ">
                          {isEditing && currentPK === _event.pk ? (
                            <input
                              type="text"
                              defaultValue={_event.fields.message_data}
                              onChange={(event) =>
                                setEditMessage(event.target.value)
                              }
                              className={` w-full bg-transparent px-2 py-1 rounded focus:outline-none ${
                                _event.fields.is_finished ? `opacity-40` : ``
                              }`}
                            />
                          ) : (
                            <div className="flex gap-2 items-center">
                              <div
                                className="w-4 h-4 rounded-full"
                                style={{
                                  backgroundColor:
                                    _event.fields.category !== undefined &&
                                    categoryData?.data[
                                      _event.fields.category - 1
                                    ]?.fields.color
                                      ? (console.log(
                                          categoryData?.data[
                                            _event.fields.category - 1
                                          ]
                                        ),
                                        categoryData?.data[
                                          _event.fields.category - 1
                                        ]?.fields.color)
                                      : (console.log(
                                          categoryData?.data[
                                            _event.fields.category - 1
                                          ]
                                        ),
                                        "white"),
                                }}
                              ></div>
                              <p>{_event.fields.message_data}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <AiOutlineCheckCircle
                      color={_event.fields.is_finished ? "lime" : "gray"}
                      className="hover:scale-110 hover:ease-in-out hover:cursor-pointer m-auto "
                      onClick={() => handleIsFinished(_event.pk)}
                      size={35}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p>belom ada bang</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
