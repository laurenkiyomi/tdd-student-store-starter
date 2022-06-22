import * as React from "react"

export default function SubNavBar() {
    return (
        <div className="sub-navbar">
            <NavLinks />
        </div>
    )
}

export function NavLinks({ setSearch, setCategory }) {
    return (
        <ul className="nav-links"> 
            <NavLink category="All Categories" setCategory={setCategory} />
            <NavLink category="Clothing" setCategory={setCategory} />
            <NavLink category="Food" setCategory={setCategory} />
            <NavLink category="Accessories" setCategory={setCategory} />
            <NavLink category="Tech" setCategory={setCategory} />
        </ul>
    )
}

export function NavLink({ category, setCategory }) {
    const changeCategory = () => {
        setCategory({category})
    }

    return (
        <h3 onClick={changeCategory}>{category}</h3>
    )
}