import React, { useState } from "react";
import ArtsFetch from "../components/ArtsFetch";
import useHttp from "../hooks/useHttp";
import Error from "./Error";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import vlog from "../assets/icons/Vlog Button 2.svg";

const requestConfig = {};

const FineArtsPrints = () => {
  const [startIndex, setStartIndex] = useState(0); 
  const [selectedArt, setSelectedArt] = useState(null); 
  const [showVideoModal, setShowVideoModal] = useState(false);

  const columns = ["TITLE", "AUTHOR", "PUBLISHED DATE"]; // Column headers for books
  
  const handleNext = () => {
    if (startIndex + 4 < loadedArts.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleArtClick = (art) => {
    setSelectedArt(art); 
  };

  const handleVlogClick = () => {
    setShowVideoModal(true); 
  };

  const handleCloseModal = () => {
    setShowVideoModal(false); 
  };

  // Google Books API call
  const {
    data: loadedArts,
    isLoading,
    error,
  } = useHttp(
    "https://www.googleapis.com/books/v1/volumes?q=fine+art+prints&key=AIzaSyDy41hvNfXdmifdq-pncx8fNCWpoPlxlg8", 
    requestConfig, 
    []
  );

  if (isLoading) {
    return <p className="text-center">Fetching books from Google...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch books" message={error} />;
  }

  const visibleArts = loadedArts.items ? loadedArts.items.slice(startIndex, startIndex + 9) : [];

  return (
    <div className="flex flex-col flex-grow  min-w-[340px] overflow-x-hidden font-jost bg-[#000000] ">
      <div className="overflow-y-auto">
        <div className=" mt-[-3px] ml-[50px] md:ml-[100px] mr-[50px] md:mr-[100px] mb-[7px] rounded-[5px] py-[53px] px-[20px] lg:px-[50px] xl:px-[50px] max-w-full md:max-w-[2200px] w-auto mx-auto">
          <div className="font-jost text-[#FFF2CC] pt-[px]">
            <p className=" text-[16px] md:text-[20px] font-medium leading-[28.9px] tracking-[0.03em] text-justify">
              Welcome to Fine Book Collection – Explore a World of Knowledge and Imagination.
            </p>
            <div className="space-y-4 text-[#FFF2CC] mt-6 text-justify">
              {[
                "Our prints are available in the following sizes: Small ~13x19, Medium ~24x36, & Large ~36x54",
                "Books are printed on demand and are carefully inspected, signed, dated, and numbered by the author.",
                "A certificate of authenticity is provided with each book.",
                "Select the ideal format and cover to match your style.",
                "For questions, email rmiyuranga97@gmail.com or call 071-8886363",
              ].map((text, index) => (
                <div key={index} className="flex items-start text-sm md:text-base pl-3">
                  <span className="w-1 h-1 bg-[#FFF2CC] rounded-full flex-shrink-0 mt-1.5 mr-3 "></span>
                  <span className="leading-tight tracking-wide">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex lg:justify-end justify-center mt-10 lg:mt-[-48px] lg:mb-[-20px] mb-[-40px] ">
            <button className="w-[117px] h-[49px] border border-[#FFF2CC] rounded-[5px] p-2 text-[#FFF2CC] text-[20px] font-jost font-semibold leading-[28.9px]" style={{
              background: 'linear-gradient(270deg, #C21F3A 0%, #720B0B 100%)',
            }}>Read...</button>
          </div>

          <div className="flex mt-[-20px] mb-[20px] text-white justify-between">
            <button className="text-[#d4d4d4] disabled:opacity-50 mt-12" onClick={handlePrevious} disabled={startIndex === 0}>
              <IoIosArrowBack className="w-[25px] h-[38px]" />
            </button>

            <ul className="flex cursor-pointer">
              {visibleArts.map((art) => (
                <ArtsFetch key={art.id} art={art} isSelected={selectedArt?.id === art.id} onClick={() => handleArtClick(art)} />
              ))}
            </ul>

            <button className="text-[#D4D4D4] disabled:opacity-50 mt-12 ml-[px] xl:ml-[20px]" onClick={handleNext} disabled={startIndex + 9 >= loadedArts.items?.length}>
              <IoIosArrowForward style={{ width: "25px", height: "28px" }} />
            </button>
          </div>

          {selectedArt && (
            <div className="border-b border-l border-r border-[#686868] w-full p-[20px] sm:p-[45px] relative shadow-[inset_0px_10px_11px_4px_#3D3D3D] blur-[px]" style={{ backgroundColor: "rgba(71, 71, 71, 0.22) " }}>
              {selectedArt.volumeInfo.imageLinks?.thumbnail ? (
                <img src={selectedArt.volumeInfo.imageLinks.thumbnail} alt={selectedArt.volumeInfo.title} className="rounded-[px] w-full max-h-[442px] sm:w-[1150px] xl:w-[2200px] object-cover blur-[px]" />
              ) : (
                <p className="text-white">No image available for this art</p>
              )}
            </div>
          )}

          <div>
            <span className="font-jost font-bold md:text-[22px] text-[18px] leading-[31.79px] tracking-[-0.02em] mt-[30px] text-[#FFFFFF] flex justify-center">A TABLE OF TIME</span>
          </div>

          {selectedArt && (
            <div className="flex justify-start mt-[30px] text-white font-jost md:ml-[50px] ml-0 sm:text-[16px] md:text-[20px] lg:text-[22px] text-[12px]">
              <div className="overflow-x-auto w-full">
                <table className="table-auto border-collapse w-full lg:w-[620px]">
                  <thead>
                    <tr>
                      {columns.map((col, index) => (
                        <th key={index} className="pr-2 pb-5 text-left underline decoration-solid font-medium leading-[31.79px] tracking-[-0.02em] text-[#FFF2CC]">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="pr-2 py-5 font-medium leading-[31.79px] tracking-[-0.02em]">{selectedArt.volumeInfo.title}</td>
                      <td className="pr-2 py-5 font-medium leading-[31.79px] tracking-[-0.02em]">{selectedArt.volumeInfo.authors?.join(', ')}</td>
                      <td className="pr-2 py-5 font-medium leading-[31.79px] tracking-[-0.02em]">{selectedArt.volumeInfo.publishedDate}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {showVideoModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white rounded-lg p-4 shadow-lg relative">
                <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={handleCloseModal}>
                  ✖
                </button>
                <div className="mt-4">
                  <video controls autoPlay className="max-w-full max-h-[500px]">
                    <source src={`http://localhost:3002/${selectedArt.vedio}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 text-[#FFF2CC] text-justify">
            <p className="txst-justify text-[18px] font-jost font-normal leading-10 tracking-[0.02em]">
              Explore the beauty and knowledge that these books have to offer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FineArtsPrints;
