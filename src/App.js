import { useState } from "react";

import Search from "./Search";

function App() {
  const [address, setAddress] = useState({});

  const addressParts = address.results[0].address_components;

  console.log(address);

  return (
    <main>
      <Search setAddress={setAddress} />

      <div>
        {addressParts.map((item, index) => (
          <div key={index}>
            <p>Long name:: {item.long_name}</p>
            <p>Short name:: {item.short_name}</p>
            <p>Type of address component:: {item.types}</p>
            <hr />
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
