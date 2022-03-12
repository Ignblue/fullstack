import React from "react";

const Nation = ({ nation }) =>
{
    return (
        <div>
            <h1>{nation.name.official}</h1>
        </div>
    )
}
export default Nation;