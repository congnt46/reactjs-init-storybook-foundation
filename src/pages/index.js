import React from "react";

export default function Default() {
  return (
    <main className="d-flex flex-column justify-content-center align-items-center vh-100">
      <div>The repository is for demonstrating Foundation Components via Storybook</div>
      <div>Run <code style={{backgroundColor: 'lightgrey'}}>npm storybook</code> and go to <a href="http://localhost:6006">http://localhost:6006</a> to have a try</div>
      <div>Or Start a new page with the existing core components</div>
    </main>
  )
}