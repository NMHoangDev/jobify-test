import React from "react";

function FormRowSelect() {
  return (
    <div>
      <select className="form-select" aria-label="Default select example">
        <option selected>{}</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </div>
  );
}

export default FormRowSelect;
