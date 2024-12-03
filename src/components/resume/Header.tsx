export default function Header() {
  return (
    <div className="flex flex-col ">
      {/* Border under the name */}
      <h1 className="border-b border-gray-300 pb-2">Tim</h1>

      {/* Dividers between spans */}
      <div className="flex space-x-4 mt-2 justify-center">
        <span className="after:content-[''] after:border-r after:border-gray-300 after:mx-2">
          tim@gmail.com
        </span>
        <span className="after:content-[''] after:border-r after:border-gray-300 after:mx-2">
          (342) 342 - 2343
        </span>
        <span>San Jose, CA</span>
      </div>
      <p>
        Summary Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Praesentium iure voluptatum, nulla accusantium quisquam doloribus ex
        dolorum quos, culpa commodi mollitia. In, alias animi? Nihil quod
        praesentium accusamus aliquam facilis?
      </p>
    </div>
  );
}
