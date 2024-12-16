
import React from "react";
import { useLocation, Link } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./SearchResults.css";

const SearchResults = ({ sidebar }) => {
    const location = useLocation();
    const results = location.state?.results || [];

    console.log("Results from state:", results);

    return (
        <>
            <Sidebar sidebar={sidebar} />
            <div className={`container ${sidebar ? "" : "large-container"}`}>
                <div className="search-results">
                    {results.length > 0 ? (
                        results.map((result, index) => (
                            <Link
                                to={`/video/${result.category}/${result._id}`}
                                className="result-card"
                                key={index}
                            >
                                {result.thumbnailUrl ? (
                                    <img
                                        src={result.thumbnailUrl}
                                        alt={result.title || "No Title"}
                                    />
                                ) : (
                                    <p>No Thumbnail</p>
                                )}
                                <h2>{result.title || "No Title"}</h2>
                                <h3>{result.category || "No Category"}</h3>
                            </Link>
                        ))
                    ) : (
                        <div className="no-results">
                            <h2>No results found.</h2>
                            <p>Try searching for something else!</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default SearchResults;

