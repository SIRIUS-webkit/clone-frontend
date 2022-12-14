/* eslint-disable */
import React, { useEffect, useState } from "react";
import Head from "next/head";
import callService from "../function/callService";

export default function Home() {
  const [postMsgs, setPostMsgs] = useState([]);
  const [inputData, setInputData] = useState({
    title: "",
    message: "",
    author: "",
  });
  const [errormsg, setErrormsg] = useState("");
  const [isUpdate, setIsUpdate] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setErrormsg("");
    }, 1000);
  }, [errormsg]);

  useEffect(() => {
    async function getPosts() {
      const posts = await callService(
        "GET",
        `${process.env.domainAPI}/posts/`,
        null,
        { token: null }
      );
      if (posts.status === 200) {
        setPostMsgs(posts.data);
      }
    }
    getPosts();
  }, []);

  const savePost = async (e) => {
    e.preventDefault();
    const { title, message, author } = inputData;
    if (!title && !message && !author) {
      setErrormsg("Please filled all the inputs!");
    } else {
      const createposts = await callService(
        "POST",
        `${process.env.domainAPI}/posts/`,
        inputData,
        {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxhbW90ZTFAZ21haWwuY29tIiwiaWQiOiI2MzNkMDE1OWE3MmQwMWM3YzA5OGFhM2QiLCJpYXQiOjE2NjQ5NDI3MzIsImV4cCI6MTY2NDk0NjMzMn0.H77SFXK89TAiMmj5y01u-7XDecqAoS-p2f19-YsogZ0",
        }
      );
      if (createposts.status === 201) {
        const posts = await callService(
          "GET",
          `${process.env.domainAPI}/posts/`,
          null,
          { token: null }
        );
        if (posts.status === 200) {
          setPostMsgs(posts.data);
        }

        setInputData({
          title: "",
          message: "",
          author: "",
        });
      }
    }
  };

  const handleChange = (event) => {
    setInputData({
      ...inputData,
      [event.target.name]: event.target.value,
    });
  };

  const deletePost = async (id) => {
    const posts = await callService(
      "DELETE",
      `${process.env.domainAPI}/posts/`,
      { id },
      { token: null }
    );
    if (posts.status === 200) {
      const filtered = postMsgs.filter((data) => data._id !== id);
      setPostMsgs(filtered);
    }
  };

  const updatePost = async (id) => {
    const post = postMsgs.find((data) => data._id === id);
    const { title, message, author } = post;
    setInputData({ title, message, author });
    setIsUpdate(id);
  };

  const updatePostToDB = async (e) => {
    e.preventDefault();
    const { title, message, author } = inputData;
    const jsonData = {
      id: isUpdate,
      title,
      message,
      author,
    };

    if (!title && !message && !author) {
      setErrormsg("Please filled all the inputs!");
    } else {
      const updateposts = await callService(
        "POST",
        `${process.env.domainAPI}/posts/update/`,
        jsonData,
        { token: null }
      );
      if (updateposts.status === 200) {
        console.log(updateposts.data);
        const updatedPost = updateposts.data;

        setPostMsgs((prevState) => {
          const newState = prevState.map((obj) => {
            // ??????? if id equals 2, update country property
            if (obj._id === updatedPost._id) {
              return {
                title: updatedPost.title,
                message: updatedPost.message,
                author: updatedPost.author,
              };
            }

            // ??????? otherwise return object as is
            return obj;
          });

          return newState;
        });
        setInputData({
          title: "",
          message: "",
          author: "",
        });
      }
    }
  };

  const cancelData = () => {
    setInputData({
      title: "",
      message: "",
      author: "",
    });
    setIsUpdate("");
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="middle">
        <h1>Testing and Fetching Data</h1>
      </div>
      <div className="wrapper">
        <div>
          {postMsgs.length === 0 ? (
            <h3>No Post</h3>
          ) : (
            <div className="wrapper-outer">
              {" "}
              {postMsgs.map((data, idx) => (
                <div key={idx} className="wrapper-box">
                  <div style={{ marginBottom: "20px" }}>
                    <h5>Title:</h5>
                    <p>{data.title}</p>
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <h5>Message:</h5>
                    <p>{data.message}</p>
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <h5>Author:</h5>
                    <p>{data.author}</p>
                  </div>
                  {isUpdate !== data._id && (
                    <div>
                      <button
                        type="button"
                        style={{ marginRight: "20px" }}
                        onClick={() => deletePost(data._id)}
                      >
                        Delete
                      </button>

                      <button
                        type="button"
                        onClick={() => updatePost(data._id)}
                      >
                        Update
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <h1 style={{ marginBottom: "30px" }}>Type the message!</h1>
          <div className="wrapper-form">
            <form>
              <label htmlFor="title">Title</label>
              <br />
              <input
                type="text"
                id="title"
                name="title"
                value={inputData.title}
                onChange={handleChange}
                style={{ width: "100%", height: "30px", marginBottom: "10px" }}
              />
              <br />
              <label htmlFor="message">Message</label>
              <br />
              <textarea
                rows={4}
                cols={40}
                id="message"
                name="message"
                value={inputData.message}
                onChange={handleChange}
              />{" "}
              <br />
              <label htmlFor="author">Author</label>
              <br />
              <input
                type="text"
                id="author"
                name="author"
                value={inputData.author}
                onChange={handleChange}
                style={{ width: "100%", height: "30px", marginBottom: "10px" }}
              />{" "}
              <br />
              {isUpdate ? (
                <>
                  <button
                    type="button"
                    style={{ marginRight: "20px" }}
                    onClick={(e) => cancelData(e)}
                  >
                    Cancel
                  </button>
                  <button type="button" onClick={(e) => updatePostToDB(e)}>
                    Update
                  </button>
                </>
              ) : (
                <button type="button" onClick={(e) => savePost(e)}>
                  Submit
                </button>
              )}
              <p>{errormsg}</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
