import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import Skeleton from "../UI/Skeleton";


const TopSellers = () => {
  const [details, setDetails] = useState([])
  const [loading, setLoading] = useState(true)

  async function getSellers(){
    setLoading(true)
    const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`)
    setLoading(false)
    setDetails(data)
  }
  useEffect(() => {
    getSellers()
  }, [])
  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {new Array(1).fill(0).map((_, index) => (
                (details.map(detail => (
                  <>
                    {loading ? (
                      <Skeleton
                      width="260px"
                      height="45px"
                      borderRadius="10px"
                      />
                    ) : (
                      <li key={index}>
                        <div className="author_list_pp">
                          <Link to={`/author/${detail.authorId}`}>
                            <img
                              className="lazy pp-author"
                              src={detail.authorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${detail.authorId}`}>{detail.authorName}</Link>
                          <span>{detail.price} ETH</span>
                        </div>
                      </li>
                    )}
                  </>
                )))
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
