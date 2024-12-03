import React, { useState, useEffect } from "react";
export default function Contact() {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setter: (value: string) => void
  ) => {
    const value = event.target.value as string;
    setter(value);
  };

  useEffect(() => {
    chrome.storage.local.get("profile").then((profileData) => {
      if (profileData) {
        setPhoneNumber(profileData.profile?.content?.phoneNumber || "");
        setEmail(profileData.profile?.content?.email || "");
        setLocation(profileData.profile?.content?.location || "");
      }
      return true;
    });
  }, []);
  useEffect(() => {
    chrome.runtime.sendMessage({
      action: "update-profile",
      profile: {
        content: {
          phoneNumber,
          email,
          location,
        },
      },
    });
  }, [phoneNumber, email, location]);

  return (
    <div>
      <h3 className="my-1">Contact</h3>
      <div className="my-1">
        <input
          type="text"
          name="phoneNumber"
          className="mr-1"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(event) => handleChange(event, setPhoneNumber)}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(event) => handleChange(event, setEmail)}
        />
      </div>
      <input
        type="text"
        className="my-1"
        name="location"
        placeholder="Location"
        value={location}
        onChange={(event) => handleChange(event, setLocation)}
      />
    </div>
  );
}
