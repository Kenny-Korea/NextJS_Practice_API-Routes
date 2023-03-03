import Link from "next/link";

function HomePage(props) {
  return (
    <div>
      <h1>Home Page</h1>
      <Link href="/menu">View All Menu</Link>
      <br />
      <hr />
      <br />
      <span>Breakfast Menu</span>
      {/* {props} */}
    </div>
  );
}

// export async function getStaticProps() {}

export default HomePage;
