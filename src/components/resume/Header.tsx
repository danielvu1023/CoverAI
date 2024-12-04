export default function Header({
  name,
  email,
  location,
  phoneNumber,
}: {
  name: string;
  email: string;
  location: string;
  phoneNumber: string;
}) {
  return (
    <div className="flex flex-col ">
      {/* Border under the name */}
      <h1 className="border-b border-gray-300 pb-2">{name}</h1>

      {/* Dividers between spans */}
      <div className="flex space-x-4 mt-2 justify-center">
        <span className="after:content-[''] after:border-r after:border-gray-300 after:mx-2">
          {email}
        </span>
        <span className="after:content-[''] after:border-r after:border-gray-300 after:mx-2">
          {phoneNumber}
        </span>
        <span>{location}</span>
      </div>
    </div>
  );
}
