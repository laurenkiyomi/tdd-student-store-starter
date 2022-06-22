import * as React from "react"

export default function SubNavBar( {setSearch, setCategory, search} ) {
    const handleOnSearchChange = (event) => {
        setSearch(event.target.value)
    }

    return (
        <div className="sub-navbar">
            <div className="sub-navbar-content">
                <SearchBar className="search-bar" value={search} handleOnSearchChange={handleOnSearchChange}/>
                <NavLinks setSearch={setSearch} setCategory={setCategory}/>
            </div>
        </div>
    )
}

export function NavLinks({ setSearch, setCategory }) {
    return (
        <ul className="nav-links"> 
            <NavLink category="all" title="All Categories" setCategory={setCategory} />
            <NavLink category="clothing" title="Clothing" setCategory={setCategory} />
            <NavLink category="food" title="Food" setCategory={setCategory} />
            <NavLink category="accessories" title="Accessories" setCategory={setCategory} />
            <NavLink category="tech" title="Technology" setCategory={setCategory} />
        </ul>
    )
}

export function NavLink({ category, title, setCategory }) {
    const changeCategory = () => {
        if (category === "all") {
            setCategory("all")
        }

        else {
            setCategory(category)
        }
    }

    return (
        <button onClick={changeCategory}>{title}</button>
    )
}

export function SearchBar({ value, handleOnSearchChange }) {
    return (
        <input 
            name="product-search-input"
            type="text"
            placeholder="Search for a product"
            value={value}
            onChange={handleOnSearchChange}>
        </input>
    )
}