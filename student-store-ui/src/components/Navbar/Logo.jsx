import * as React from "react"
import { Link } from "react-router-dom";

export default function Logo(props) {
    return (
        <div className="logo">
            <Link to="/"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/HiHowAreYouGame_wiki.png/220px-HiHowAreYouGame_wiki.png"/></Link>
        </div>
    )
}