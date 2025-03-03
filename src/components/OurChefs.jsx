// import "../css/our_chefs.css";
import { useEffect, useState } from "react";
import { GetChefsApi } from "../API Calls/Chefs/GetChefs.jsx";
import "../css/our_chefs.css";
export default function OurChefs() {
  const [chefs, setChefs] = useState([]);

  useEffect(() => {
    const fetchChefs = async () => {
      const response = await GetChefsApi();
      if (response) {
        setChefs(response.data);
      } else {
        console.error("Failed to fetch chefs");
      }
    };
    fetchChefs();
  }, []);

  return (
    <section className="OurChefs">
      <h2 className="SectionTitle">Our Brilliant Chefs</h2>
      <div className="ChefsGrid">
        {chefs.map((chef) => (
          <div key={chef.id} className="ChefCard">
            <img
              src={chef.profile_image_url}
              alt={`${chef.first_name}_${chef.last_name}`}
              className="ChefImage"
            />
            <div className="ChefInfo">
              <h3>
                {chef.first_name} {chef.last_name}
              </h3>
              <p className="ChefCategory">{chef.category_name}</p>
              <p className="ChefAge">{chef.age} years old</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
