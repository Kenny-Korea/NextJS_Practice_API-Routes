import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const imageSize = { width: "150px", height: "100px" };

const AllMenuPage = () => {
  const [menuItem, setMenuItem] = useState([]);
  const formRef = useRef();

  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => {
        setMenuItem(data.menu);
        console.log(data.menu);
      })
      .catch((err) => console.log("failed"));
  }, []);

  const addNewMenu = (e) => {
    e.preventDefault();
    const data = {
      menuIdx: formRef.current[0].value,
      menuTitle: formRef.current[1].value,
      menuContent: formRef.current[2].value,
      menuPrice: formRef.current[3].value,
      menuAvailability: formRef.current[4].value,
      menuImage: formRef.current[5].value,
    };
    fetch("/api/menu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).catch((err) => console.log(err));
  };

  return (
    <>
      <h1>All Menu</h1>
      <hr />
      <span>Add new menu</span>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={addNewMenu}
        ref={formRef}
      >
        <input type="text" placeholder="menuIdx" />
        <input type="text" placeholder="menuTitle" />
        <input type="text" placeholder="menuContent" />
        <input type="text" placeholder="menuPrice" />
        <input type="text" placeholder="menuAvailability" />
        <input type="text" placeholder="menuImage" />
        <button>Submit</button>
      </form>
      <hr />
      {menuItem.map((item) => {
        return (
          <div key={item.menuIdx}>
            {/* <Image src={item.menuImage} width={150} height={100} /> */}
            <img src={item.menuImage} style={imageSize} />
            <p>이름: {item.menuTitle}</p>
            <p>재료: {item.menuContent}</p>
            <p>시간: {item.menuAvailability}</p>
            <p>가격: {item.menuPrice}</p>
          </div>
        );
      })}
    </>
  );
};

export default AllMenuPage;
