import React, { useEffect, useState, useCallback } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const [details, setDetails] = useState("")
  const id = useParams().id
  const [following, setFollowing] = useState(false)

  const getAuthor = useCallback(async () => {
    const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`)
    setDetails(data)
  }, [id])

  useEffect(() => {
    getAuthor()
  }, [getAuthor])

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>
        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {details ? (
                        <img src={details.authorImage} alt="" />
                      ) : (
                        <Skeleton
                          width="150px"
                          height="150px"
                          borderRadius="50%"
                        />
                      )}

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                      {details ? (
                        <h4>
                          {details.authorName}
                          <span className="profile_username">@{details.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {details.address}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      ) : (
                        <h4>
                          <Skeleton width="200px"/>
                          <span className="profile__username">
                            <Skeleton width="100px"/>
                          </span>
                          <span id="wallet" className="profile_wallet">
                              <Skeleton width="250px" />
                          </span>
                        </h4>
                      )}
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {details ? (
                        <>
                          <div className="profile_follower">
                            {details.followers + (following ? 1 : 0)}{"  "}
                            followers
                          </div>
                          {following ? (
                            <Link
                              to="#"
                              className="btn-main"
                              onClick={() => setFollowing(!following)}
                              >
                                Unfollow
                            </Link>
                          ) : (
                            <Link 
                              to="#" 
                              className="btn-main"
                              onClick={() => setFollowing(!following)}
                              >
                              Follow
                            </Link>
                          )}
                        </>
                      ) : (

                          <div className="profile__follower">
                            <Skeleton width="150px" height="42px" borderRadius="10px"/>
                          </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems details={details} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
